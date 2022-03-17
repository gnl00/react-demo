let ws = new WebSocket('ws://localhost:8888/chat/self')

ws.onopen = () => {
  console.log('ws opened')
}

ws.onerror = (evt) => {
  console.log(evt)
}

ws.onclose = () => {
  console.log('ws closed')
}

export default ws