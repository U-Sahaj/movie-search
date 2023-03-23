import { Document } from 'mongoose'
import { ICast } from './ICast'

export type Cast = {
    cast_id: Number,
    name:string
}

export interface ICredit extends Document {
    movie_id: string
    title: string
    cast: string
    castDoc? :[Cast]
    crew: string

}

