import './App.css'
import Button from '@mui/material/Button';
import {useEffect, useRef, useState} from 'react'
import Peer from "peerjs";

function App() {

  const [localId, setLocalId] = useState()
  const [remoteId, setRemoteId] = useState()

  const localVideo = useRef()
  const remoteVideo = useRef()

  const peer = useRef()

  const currentConnect = useRef()
  const currentCall = useRef()

  useEffect(() => {
      createPeer()

    return () => {
      stopCall()
    }}

  , [])

  // create local peer
  const createPeer = () => {
    peer.current = new Peer()

    peer.current.on('open', id => {
      setLocalId(id)
    })

    // 数据传输
    peer.current.on('connection', connection => {
      connection.on('data', data => {
        console.log('data transfer from remote: ', data)
      })

      // 记录当前 connection
      currentConnect.current = connection
    })

    // 媒体数据传输
    peer.current.on('call', async (call) => {
      if (window.confirm(`是否接收 ${call.peer} ?`)) {
        // 获取本地流
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })

        // 响应
        call.answer(localStream)

        // 接收到 remote stream
        call.on('stream', stream => {
          remoteVideo.current.srcObject = stream
          // remoteVideo.current.play()
        })

        currentCall.current = call
      } else {
        call.close()
      }

    })

  }

  // 开始通话
  const startCall = async () => {
    console.log('call start ', remoteId)

    // 作为呼叫方，首先开启本地音/视频流
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })

    // update local video dom
    localVideo.current.srcObject = stream
    // localVideo.current.play()

    // 数据传输
    const connect = peer.current.connect(remoteId)
    connect.on('open', () => {
      console.log('connect opened')
    })
    currentConnect.current = connect

    // 多媒体传输
    const call = peer.current.call(remoteId, stream)
    call.on('stream', stream => {
      remoteVideo.current.srcObject = stream
      // remoteVideo.current.play()

    })

    call.on('error', err => {
      console.log(err)
    })

    call.on('close', () => {
      stopCall()
    })
    currentCall.current = call
  }

  // 结束通话
  const stopCall = () => {
    console.log('call stop')
    if (currentCall && currentCall.current) {
      currentCall.current.close()
    }
  }

  return (
    <div className="App p-2 space-y-2">
      <div>
        <h1 className={'text-center text-3xl'}>Local ID: {localId}</h1>
      </div>

      <div className={'flex justify-center items-center'}>
        <input type={'text'} className={'bg-gray-100 outline-none p-1 focus:ring focus:ring-2'} placeholder={'Input remoteId here'}
               value={remoteId || ''} onChange={evt => setRemoteId(evt.target.value)} />
      </div>

      <div className={'flex justify-center items-center space-x-2'}>
        <Button variant="contained" onClick={startCall} >Call</Button>
        <Button variant="contained" color={'error'} onClick={stopCall} >Hang Up</Button>
      </div>

      <div className={'w-full flex'}>

        <div className={'flex-1 flex flex-col justify-center items-center'}>
          <h2 className={'text-2xl'}>Local Video Stream</h2>
          <video className={'w-1/2'} controls autoPlay muted ref={localVideo} />
        </div>

        <div className={'flex-1 flex flex-col justify-center items-center'}>
          <h2 className={'text-2xl'}>Remote Video Stream</h2>
          <video className={'w-1/2'} controls autoPlay ref={remoteVideo} />
        </div>

      </div>

    </div>
  )
}

export default App
