import { type DiaryEntryInput, Visibility, Weather } from "../types.js"

export const isString = (string: any): boolean => {
    return typeof string === 'string' || string instanceof String
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date)) // Convierte fecha en milisegundos y si no puede Boolean devolverá false
}

const isWeather = (weather: any): boolean => {
    // return ['sunny', 'rainy', 'cloudy', 'windy', 'stormy'].includes(weather) // Esto funciona pero repite el contrato con el type
    return Object.values(Weather).includes(weather)
}

const isVisibility = (visibility: any): boolean => {
    // return ['sunny', 'rainy', 'cloudy', 'windy', 'stormy'].includes(weather) // Esto funciona pero repite el contrato con el type
    return Object.values(Visibility).includes(visibility)
}

const parseComment = (CommentFromInput: any): string => {
    if(!isString(CommentFromInput)) {
        throw new Error('Comment no es un string')
    }

    return CommentFromInput
}

const parseDate = (DateFromInput: any): string => {
    if (!isString(DateFromInput) || !isDate(DateFromInput)) {
        throw new Error('Fecha no válida')
    }

    return DateFromInput
}

const parseWeather = (WeatherFromInput: any): Weather => {
    if(!isString(WeatherFromInput) || !isWeather(WeatherFromInput)) {
        throw new Error('Weather no tiene un formato válido')
    }

    return WeatherFromInput
}

const parseVisibility = (VisibilityFromInput: any): Visibility => {
    if(!isString(VisibilityFromInput) || !isVisibility(VisibilityFromInput)) {
        throw new Error('Visibility no tiene un formato válido')
    }

    return VisibilityFromInput
}

// Devuelve todo el objeto validado
export const toNewDiaryInput = (object: any): DiaryEntryInput => {
    const newEntry: DiaryEntryInput = {
        comment: parseComment(object.comment),
        date: parseDate(object.date),
        weather: parseWeather(object.weather),
        visibility: parseVisibility(object.visibility)
    }

    return newEntry
}
