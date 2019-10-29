const express = require('express')

const server = express()
server.use(express.json())

const ninjas = ['Naruto', 'Neji', 'Hinata', 'Kakashi']

server.use((req, res, next) => {
    console.log('A requisição foi chamada')
    return next()
})

function checkNinjaExists(req, res, next){
    if(!req.body.name){
        return res.status(400).json({error: 'Ninja name is required'})
    }
    return next()
}

function checkNinjaInArray(req, res, next){
    const ninja = ninjas[req.params.index]

    if(!ninja){
        return res.status(400).json({error: 'Ninja doesnt exist'})
    }

    req.ninja = ninja
    return next()
}


server.get('/ninjas', (req, res) => {
    return res.json(ninjas)
})

server.get("/ninjas/:index", checkNinjaInArray, (req, res) => {

    res.json({message: `Ninja ${req.ninja}!`})
})

server.post('/ninjas', checkNinjaExists, (req, res) => {
    const { name } = req.body
    ninjas.push(name)

    return res.json(ninjas)
})

server.put('/ninjas/:index', checkNinjaInArray, checkNinjaExists, (req, res) => {
    const { index } = req.params
    const { name } = req.body
    
    ninjas[index] = name
    return res.json(ninjas)
})

server.delete('/ninjas/:index', checkNinjaInArray, (req, res) => {
    const { index } = req.params

    users.splice(index, 1)

    return res.send()
})

server.listen(3000)