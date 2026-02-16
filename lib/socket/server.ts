import { Server as HTTPServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { prisma } from '@/lib/prisma'

let io: SocketIOServer | null = null

export function initSocketServer(httpServer: HTTPServer) {
  if (io) return io

  io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`)

    // Join deal room
    socket.on('join:deal', (dealId: string) => {
      socket.join(`deal:${dealId}`)
      console.log(`Socket ${socket.id} joined deal:${dealId}`)
    })

    // Leave deal room
    socket.on('leave:deal', (dealId: string) => {
      socket.leave(`deal:${dealId}`)
      console.log(`Socket ${socket.id} left deal:${dealId}`)
    })

    // Typing indicator
    socket.on('typing:start', ({ dealId, userId }) => {
      socket.to(`deal:${dealId}`).emit('typing:user', { userId, isTyping: true })
    })

    socket.on('typing:stop', ({ dealId, userId }) => {
      socket.to(`deal:${dealId}`).emit('typing:user', { userId, isTyping: false })
    })

    // Send message
    socket.on('message:send', async (data) => {
      try {
        const { dealId, senderId, content, contentType } = data

        // Save message to database
        const message = await prisma.message.create({
          data: {
            dealId,
            senderId,
            content,
            contentType: contentType || 'TEXT',
          },
          include: {
            sender: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        })

        // Broadcast to deal room
        io?.to(`deal:${dealId}`).emit('message:new', message)
      } catch (error) {
        console.error('Error sending message:', error)
        socket.emit('message:error', { error: 'Failed to send message' })
      }
    })

    // Mark message as read
    socket.on('message:read', async ({ messageId, userId }) => {
      try {
        await prisma.message.update({
          where: { id: messageId },
          data: {
            isRead: true,
            readAt: new Date(),
          },
        })

        socket.emit('message:read:success', { messageId })
      } catch (error) {
        console.error('Error marking message as read:', error)
      }
    })

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`)
    })
  })

  return io
}

export function getSocketServer() {
  if (!io) {
    throw new Error('Socket.io server not initialized')
  }
  return io
}
