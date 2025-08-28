import { ObjectId } from "mongodb"
import { connectionDB } from "../database/connection.js"
import type { DiaryEntry, DiaryEntryInput, diaryServiceInterface } from "../types.js"

export class diaryService implements diaryServiceInterface {
    getAll = async (): Promise<DiaryEntry[] | null> => {
        try {
            const db = await connectionDB()
            if (!db) return null
            const diariesCollection = await db.collection<DiaryEntry>('diary')
            const diaries = await diariesCollection.find().toArray()
            if (diaries) {
                return diaries
            } else {
                return null
            }
    
        } catch (error) {
            console.error(error)
            return null
        }
    }

    getById = async (id: string) => {
        try {
            const db = await connectionDB()
            if (!db) return null
            const diariesCollection = await db.collection<DiaryEntry>('diary')
            const query = { _id: new ObjectId(id)} // Las ids de MongoDB son tratadas como objetos
            const diary = await diariesCollection.findOne(query)
            return diary
    
        } catch (error) {
            console.error(error)
            return null
        }
    }

    create = async (diaryInput: DiaryEntryInput) => {
        try {
            const db = await connectionDB()
            if (!db) return null
            const diariesCollection = await db.collection('diary')
            const query = await diariesCollection.insertOne(diaryInput)
            return query.acknowledged
        } catch (error) {
            console.error(error)
            return null
        }
    }

    patch = async ({ id, input }: { id: string, input: DiaryEntryInput}) => {
        try {
            const db = await connectionDB()
            if(!db) return null
            const diariesCollection = await db.collection('diary')
            const query = await diariesCollection.updateOne( { _id: new ObjectId(id) }, {$set: input})
            return { found: query.matchedCount, result: query.modifiedCount }
        } catch (error) {
            console.error(error)
            return null
        }
    }

    delete = async (id: string) => {
        try {
            const db = await connectionDB()
            if(!db) return null
            const diariesCollection = await db.collection('diary')
            const query = await diariesCollection.deleteOne({ _id: new ObjectId(id) })
            return query.deletedCount // found no devuelve si hay encontrado el documento, sólo si se recibe respuesta
        } catch (error) {
            console.error(error)
            return null
        }
    }

    deleteSelection = async (ids: string[]) => {
        try {
            const db = await connectionDB()
            if(!db) return null
            const diariesCollection = await db.collection('diary')
            const idsToDelete = ids.map((id: string) => new ObjectId(id))
            const query = await diariesCollection.deleteMany({ _id: { $in: idsToDelete }})
            return query.deletedCount // found no devuelve si hay encontrado el documento, sólo si se recibe respuesta
        } catch (error) {
            console.error(error)
            return null
        }
    }

}
