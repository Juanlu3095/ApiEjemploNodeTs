import { MongoClient } from 'mongodb'

const { DB_USER, DB_PASS, DB_NAME } = process.env

export const connectionDB = async () => {
    try {
        const client = new MongoClient(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.igxztyn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        await client.connect()
        const databaseConnection = client.db(DB_NAME)
        return databaseConnection
    } catch (error) {
        console.error(error)
        return null
    }
}