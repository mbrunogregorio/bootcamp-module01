const express = require('express')

const server = express()
server.use(express.json())

const users = ['Naruto', 'Neji', 'Hinata', 'Kakashi']

server.get('/users', (req, res) => {
    return res.json(users)
})

server.get("/users/:id", (req, res) => {

    const {id} = req.params;

    res.json({message: `Ninja ${users[id]}!`})
})

server.post('/users', (req, res) => {
    const { name } = req.body
    users.push(name)

    return res.json(users)
})

server.put('/users/:index', (req, res) => {
    const { index } = req.params
    const { name } = req.body
    
    users[index] = name
    return res.json(users)
})

server.delete('/users/:index', (req, res) => {
    const { index } = req.params

    users.splice(index, 1)

    return res.send();
    return res.json(users)
})

server.listen(3000)