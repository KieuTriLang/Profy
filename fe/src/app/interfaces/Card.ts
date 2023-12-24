import { Info } from "./Info"

export interface Card{
    id:string
    ownerId:string
    infos:Info[]
    createdAt:string
    updatedAt:string
}