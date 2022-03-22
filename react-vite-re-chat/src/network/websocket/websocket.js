const ws = new WebSocket('ws://localhost:8888/chat')

ws.onopen = () => {
  console.log('ws opened')
}

export default ws