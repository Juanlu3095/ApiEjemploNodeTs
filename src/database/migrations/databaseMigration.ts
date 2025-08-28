import { MongoClient } from 'mongodb'

export class DatabaseMigration {
    public dbUser: string = '';
    public dbPass: string = '';
    public dbName: string = '';
    private mongoClient: MongoClient = {} as MongoClient

    public constructor(DB_USER: string, DB_PASS: string, DB_NAME: string) {
        this.dbUser = DB_USER
        this.dbPass = DB_PASS
        this.dbName = DB_NAME
        this.mongoClient = new MongoClient(`mongodb+srv://${this.dbUser}:${this.dbPass}@cluster0.igxztyn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    }

    migrate = async () => {
        try {
            await this.mongoClient.connect()
            const database = this.mongoClient.db(this.dbName)
            await database.createCollection('pepes')
            console.log(`Se ha creado la base de datos ${this.dbName}.`)
            await this.mongoClient.close()
        } catch (error) {
            console.error(error)
        }
    }

    delete = async () => {
        try {await this.mongoClient.connect()
            await this.mongoClient.db("Pepe").dropDatabase()
            console.log(`Se ha eliminado la base de datos ${this.dbName}.`)
            await this.mongoClient.close()
        } catch (error) {
            console.error(error)
        }
    }
}