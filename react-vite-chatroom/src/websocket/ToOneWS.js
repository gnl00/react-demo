import { onOpen, onClose, onError, onMessage } from './WSUtils'

const ToOneWS = new WebSocket('ws://192.168.137.1:8888/chat/oneToOne')

const emitter_event = 'toOne'

// OneToOne

ToOneWS.onopen = () => {
  onOpen('toOneWS')
}

ToOneWS.onclose = (evt) => {
  onClose('toOneWS', evt)
}

ToOneWS.onerror = (evt) => {
  ToOneWS.close()
  onError('toOneWS', evt)
}

ToOneWS.onmessage = res => {
  if (res.data) {
    const msg = JSON.parse(res.data)
    onMessage(emitter_event, msg)
  }
}

export default ToOneWS
