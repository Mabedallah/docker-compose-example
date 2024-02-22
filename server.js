const express = require('express')
const pool = require('./db')
const port = 1337

const app = express()
app.use(express.json())


//Routs
app.get('/', async(req,res)=>{
    res.sendStatus(200)
})

app.post('/', async(req,res)=>{
    const {name , location} = req.body

    try {
        await pool.query('INSERT INTO schools (name,address) VALUES ($1,$2)',[name, location])
        res.status(200).send({message: "Successfully added child"})
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

})

app.get('/setup', async(req,res)=>{

    try {
        await pool.query('CREATE TABLE schools(id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))')
        res.status(200).send({message: "table created"})
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

})



app.listen(port, ()=> console.log(`server started on port: ${port}`))