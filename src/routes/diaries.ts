import express, { Router } from 'express'
import { diaryService } from '../services/diaryService.js'
import { DiaryController } from '../controllers/diaryController.js'

const diaryRouter: Router = express.Router()

const diaryController = new DiaryController(new diaryService)

diaryRouter.get('/', diaryController.getAll)

diaryRouter.get('/:id', diaryController.getById)

diaryRouter.post('/', diaryController.create)

diaryRouter.patch('/:id', diaryController.patch)

diaryRouter.delete('/:id', diaryController.delete)

diaryRouter.delete('/', diaryController.deleteSelection)

export default diaryRouter