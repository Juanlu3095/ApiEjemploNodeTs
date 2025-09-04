import express from 'express'
import diaryRouter from './routes/diaries.js'

const app = express()

app.use(express.json()) // Transforma req.body a json

app.use('/api/diaries', diaryRouter)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})