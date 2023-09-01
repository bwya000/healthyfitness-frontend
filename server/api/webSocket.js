import { WebSocketServer } from 'ws'

const webSocket = (server) => {
  const wss = new WebSocketServer({ noServer: true })
  const clients = {} // 根據腳色分類用於存儲連接的客戶端

  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (socket) => {
      wss.emit('connection', socket, request)
    })
  })

  wss.on('connection', (socket, request) => {
    const role = request.url === '/visitor' ? 'visitor' : 'support'
    clients[role] = socket // 存取新連接用戶

    socket.on('message', (message) => {
      try {
        const messageObject = JSON.parse(message)

        console.log(
          `Received from ${messageObject.name}: ${messageObject.message}`
        )

        // 根据角色发送消息
        const targetRole = role === 'visitor' ? 'support' : 'visitor'
        if (clients[targetRole]) {
          clients[targetRole].send(
            `${messageObject.name}: ${messageObject.message}`
          )
        }
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    })

    socket.on('close', () => {
      delete clients[role] // 斷開連結
    })
  })
}

export default webSocket
