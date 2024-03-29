
import { FeedPostEntity } from './../../feed/models/post.entity';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Role } from "./role.enum";

@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string

    @Column()
    lastName: string
    
    @Column({select : false})// when we select we dont get password back
    password: string

    @Column({unique:true})
    email: string

    @Column({type:'enum', enum:Role, default:Role.USER})
    role: Role

    @OneToMany(()=>FeedPostEntity,(feedPostEntity)=> feedPostEntity.author)
    feedPosts:FeedPostEntity[]
}