import type { DiaryEntryInput } from "../../types.js";
import { CollectionSeeder } from "./collectionSeeder.js";

const DB_USER = process.env.DB_USER ?? ''
const DB_PASS = process.env.DB_PASS ?? ''
const DB_NAME = process.env.DB_NAME ?? ''

const diaries: DiaryEntryInput[] = [
    {
        date: '2025-08-27',
        weather: 'cloudy',
        visibility: 'good',
        comment: 'Prueba del seed'
    }
]

const diarySeeder = new CollectionSeeder(DB_USER, DB_PASS, DB_NAME)
await diarySeeder.seed("diary", diaries)