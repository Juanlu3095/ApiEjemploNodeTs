// export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy'
// export type Visibility = 'great' | 'good' | 'poor' | 'very good'

export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Windy = 'windy',
    Stormy = 'stormy',
}

export enum Visibility {
    Great = 'great',
    Good = 'good',
    Poor = 'poor',
    VeryGood = 'very good'
}

export interface DiaryEntry {
    id: string,
    date: string,
    weather: Weather,
    visibility: Visibility,
    comment: string
}

// export type notSensitiveDiaryEntry = Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>
export type notSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>

export type DiaryEntryInput = Omit<DiaryEntry, 'id'>

export interface diaryServiceInterface {
    getAll: () =>  Promise<DiaryEntry[] | null>
    getById: (id: string) =>  Promise<DiaryEntry | null>
    create: (input: DiaryEntryInput) => Promise<boolean | null>
    patch: ({ id, input }: { id: string, input: DiaryEntryInput }) => Promise<{ found: number, result: number } | null>
    delete: (id: string) => Promise<number | null>
    deleteSelection: (ids: string[]) => Promise<number | null>
}