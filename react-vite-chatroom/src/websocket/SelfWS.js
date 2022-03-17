import { onOpen, onClose, onError, onMessage } from './WSUtils'

const SelfWS = new WebSocket('ws://localhost:8888/chat/self')

const emitter_event = 'self'

// Self Talk

SelfWS.onopen = () => {
  onOpen('selfWS')
}

SelfWS.onclose = (evt) => {
  onClose('selfWS', evt)
}

SelfWS.onerror = (evt) => {
  onError('selfWS', evt)
}

SelfWS.onmessage = res => {
  if (res.data) {
    const msg = JSON.parse(res.data)
    onMessage(emitter_event, msg)
  }
}

export default SelfWS