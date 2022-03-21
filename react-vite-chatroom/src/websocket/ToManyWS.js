import { onOpen, onClose, onError, onMessage } from './WSUtils'

const ToManyWS = new WebSocket('ws://192.168.137.1:8888/chat/oneToMany')

const emitter_event = 'toMany'

// OneToMany

ToManyWS.onopen = () => {
  onOpen('toManyWS')
}

ToManyWS.onclose = (evt) => {
  onClose('toManyWS', evt)
}

ToManyWS.onerror = (evt) => {
  ToManyWS.close()
  onError('toOneWS', evt)
}

ToManyWS.onmessage = res => {
  if (res.data) {
    const msg = JSON.parse(res.data)
    onMessage(emitter_event, msg)
  }
}

export default ToManyWS