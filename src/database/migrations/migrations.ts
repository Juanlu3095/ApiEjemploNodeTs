import { CollectionMigration } from "./collectionMigration.js";

const DB_USER = process.env.DB_USER ?? ''
const DB_PASS = process.env.DB_PASS ?? ''
const DB_NAME = process.env.DB_NAME ?? ''

const collectionMigration = new CollectionMigration(DB_USER, DB_PASS, DB_NAME)
collectionMigration.migrate("pepes") // Da igual el orden en que se migren las colecciones