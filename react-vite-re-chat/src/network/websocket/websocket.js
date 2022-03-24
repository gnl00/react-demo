const urlPrefix = 'ws://localhost:8888/chat/'

let ws = null
const openWebsocket = (uid) => {
  const url = urlPrefix + uid

  // console.log(url)

  ws = new WebSocket(url)

  if (ws) {
    websocketInitial(ws)
    return true
  }

}

const websocketInitial = (ws) => {
  ws.onopen = () => {
    console.log('ws opened')
  }

  ws.onclose = () => {
    // do some cleanup works
    console.log('ws closed')
  }
}

export {
  openWebsocket,
  ws
}