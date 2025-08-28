import express from 'express'
import diaryRouter from './routes/diaries.js'

const app = express()

app.use(express.json()) // Transforma req.body a json

app.use('/api/diaries', diaryRouter)

app.get('/ping', (_req, res) => {
    console.log('Ping')
    res.send(process.env.DB_USER)
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})