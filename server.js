const http = require('http')

const port = 3000

const server = http.createServer()

const messages = [
  { 'id': 1, 'user': 'christie lynam', 'message': 'react and redux are cool!' },
  { 'id': 2, 'user': 'david whitaker', 'message': 'servers are cool!' },
  { 'id': 3, 'user': 'jeff casimir', 'message': 'jobs are cool!' }
]

const getAllMessages = (response) => {
  response.statusCode = 200
  response.setHeader('Content-Type', 'text/plain')
  response.write(JSON.stringify(messages))
  response.end()
}

const addMessage = (newMessage, response) => {
  messages.push(newMessage)
  response.statusCode = 201
  response.setHeader('Content-Type', 'text/plain')
  response.write(JSON.stringify(messages))
  response.end()
}

server.on('request', (request, response) => {
  switch (request.method) {
    case 'GET':
      getAllMessages(response)
      break;
    case 'POST':
      let newMessage
      
      request.on('data', (data) => {
        newMessage = {
          id: new Date(),
          ...JSON.parse(data)
        }
      })

      request.on('end', () => {
        addMessage(newMessage, response);
      })
      break;
  }
})

server.listen(port, () => {
  console.log(`The HTTP server is running on port ${port}.`)
})
