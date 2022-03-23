const ws = new WebSocket('ws://localhost:8888/chat')

ws.onopen = () => {
  console.log('ws opened')
}

ws.onclose = () => {
  // do some cleanup works
  console.log('ws closed')
}

export default ws