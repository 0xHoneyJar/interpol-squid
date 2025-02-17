import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"
import {BGTBoostActionType} from "./_bgtBoostActionType"

@Entity_()
export class BGTBoostAction {
    constructor(props?: Partial<BGTBoostAction>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @StringColumn_({nullable: false})
    locker!: string

    @StringColumn_({nullable: false})
    validator!: string

    @BigIntColumn_({nullable: false})
    amount!: bigint

    @Column_("varchar", {length: 26, nullable: false})
    action!: BGTBoostActionType

    @BigIntColumn_({nullable: false})
    timestamp!: bigint

    @StringColumn_({nullable: false})
    transactionHash!: string

    @BigIntColumn_({nullable: false})
    blockNumber!: bigint
}
