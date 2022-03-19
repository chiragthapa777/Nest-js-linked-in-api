import { DataTypeDefaults } from './../../../node_modules/typeorm/driver/types/DataTypeDefaults.d';
export interface FeedPost{
    id?:number
    body?:string
    createdAt?:Date
}