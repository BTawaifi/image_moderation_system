import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import type { PrefilterResponseType } from "../types/Prefilter_Response"

@Entity({ name: "archive" })
export class Archive {

    @PrimaryGeneratedColumn()
    id!: number

    @Column('int')
    userId!: number

    @Column('text')
    imagePath!: string

    @Column('text')
    callbackUrl!: string

    @CreateDateColumn()
    creationDate!: Date

    @UpdateDateColumn()
    updateDate!: Date

    @Column()
    status: 'Pending' | 'Accepted' | 'Rejected' = 'Pending'

    @Column({ type: 'simple-json', nullable: true, default: null })
    prefilterReport!: PrefilterResponseType | null

    @Column('float', { default: 0 })
    prefilterReportScore = 0;
}
