import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

import { BudgetNote } from 'src/modules/budget-notes/budget-notes.entity';
import { ModificationRequest } from 'src/modules/modification-request/modification-request.entity';
import { State } from 'src/modules/states/states.entity';
import { PurchaseOrder } from '../entities/purchase-order.entity';

@Entity({ name: 'months' })
export class Month {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({ name: 'start_date', type: 'date' })
    startDate: Date;

    @Column({ name: 'finish_date', type: 'date', nullable: true })
    finishDate: Date;

    @Column({ name: 'closed_by', type: 'integer', width: 10, nullable: true })
    closedBy: number;

    @Column({ name: 'school_id', type: 'integer', width: 10 })
    schoolId: number;

    @Column({ name: 'state_id', type: 'integer', width: 10, default: 1 })
    stateId: number;

    // relationships
    @OneToMany(
        type => BudgetNote,
        budgetNote => budgetNote.month
    )
    public budgetNotes!: BudgetNote[];

    @OneToMany(
        type => ModificationRequest,
        modificationRequest => modificationRequest.month,
        { nullable: true }
    )
    public modificationRequest!: ModificationRequest[];

    @OneToMany(
        type => PurchaseOrder,
        purchaseOrder => purchaseOrder.month,
        { nullable: true }
    )
    public purchaseOrders!: PurchaseOrder[];

    @ManyToOne(
        type => State,
        state => state.months
    )
    @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
    public state!: State;
}
