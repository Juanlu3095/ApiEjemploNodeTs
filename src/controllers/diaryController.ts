import type { diaryServiceInterface } from "../types.js"
import type { Response, Request } from "express"
import { isString, toNewDiaryInput } from '../utils/utils.js'

export class DiaryController {
    diaryService: diaryServiceInterface

    constructor(diaryService: diaryServiceInterface) {
        this.diaryService = diaryService
    }

    getAll = async (_req: Request, res: Response) => {
        const diaries = await this.diaryService.getAll()
        res.json(diaries)
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params
        if (id && isString(id)) {
            const diary = await this.diaryService.getById(id)
            if(diary) {
                return res.json(diary)
            } else {
                return res.status(404).json({ message: 'Entrada no encontrada.'})
            }
        } else {
            return res.status(422).json({ message: 'No se ha aportado id.' })
        }
    }

    create = async (req: Request, res: Response) => {
        const input = req.body // Falta validar esto        

        try {
            if(!toNewDiaryInput(input)) {
                return res.status(422).json({ message: 'La entrada enviada no tiene el formato correcto.' })
            }

            const result = await this.diaryService.create(input)
            if(result) {
                return res.json({ message: 'Entrada creada.' })
            } else {
                return res.json({ message: 'Entrada no creada.' })
            }
        } catch (error) {
            console.error(error)
            return null
        }
    }

    patch = async (req: Request, res: Response) => {
        const input = req.body // VALIDAR
        const { id } = req.params

        if (!id || !isString(id)) return res.status(422).json({ message: 'Id no tiene el formato correcto.' })
        if(!toNewDiaryInput(input)) {
            return res.status(422).json({ message: 'La entrada enviada no tiene el formato correcto.' })
        }

        const result = await this.diaryService.patch({ id, input})
        if (result?.found !== 0 && result?.result !== 0) {
            return res.json({ message: 'Entrada actualizada.' })
        } else if (result.found === 0){
            return res.status(404).json({ message: 'Entrada no encontrada.'})
        } else {
            return res.status(500).json({ message: 'Ha ocurrido un error.' })
        }
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params
        if (!id || !isString(id)) return res.status(422).json({ message: 'Id no tiene el formato correcto.' })
        
        const result = await this.diaryService.delete(id)
        if(result && result > 0) {
            return res.json({ message: 'Entrada eliminada.' })
        } else if (result && result === 0) {
            return res.status(404).json({ message: 'Entrada no encontrada.' })
        } else {
            return res.status(500).json({ message: 'Ha ocurrido un error.' })
        }
    }

    deleteSelection = async (req: Request, res: Response) => {
        const { ids }: { ids: string[] } = req.body
        if(ids.length === 0) return res.status(422).json({ message: 'Ids no proporcionadas.' })
        const result = await this.diaryService.deleteSelection(ids)
        if (result && result > 0) {
            return res.json({ message: 'Entradas eliminadas.'})
        } else if (result === 0) {
            return res.status(404).json({ message: 'Entrada no encontrada.' })
        } else {
            return res.status(500).json({ message: 'Ha ocurrido un error.' })
        }
    }
}