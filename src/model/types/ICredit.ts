import { Document } from 'mongoose'
import { ICast } from './ICast'

export interface ICredit extends Document {
    movie_id: string
    title: string
    cast: ICast
    crew: string
}
