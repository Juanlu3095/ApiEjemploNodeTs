import { MongoClient, type Document } from "mongodb";

export class CollectionSeeder {
    public dbUser: string = '';
    public dbPass: string = '';
    public dbName: string = '';
    private mongoClient: MongoClient = {} as MongoClient

    public constructor (DB_USER: string, DB_PASS: string, DB_NAME: string) {
        this.dbUser = DB_USER
        this.dbPass = DB_PASS
        this.dbName = DB_NAME
        this.mongoClient = new MongoClient(`mongodb+srv://${this.dbUser}:${this.dbPass}@cluster0.igxztyn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    }

    seed = async (collection: string, documents: Document[]) => {
        try {
            await this.mongoClient.connect()
            const database = this.mongoClient.db(this.dbName)
            const collectionDB = database.collection(collection)
            const result = await collectionDB.insertMany(documents)
            console.log(`Se han añadido ${result.insertedCount} documento(s) a la colección ${collection}.`)
            await this.mongoClient.close()
        } catch (error) {
            console.error(error)
        }
    }
}