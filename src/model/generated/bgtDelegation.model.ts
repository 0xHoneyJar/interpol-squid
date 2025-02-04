import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, BigIntColumn as BigIntColumn_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"
import {BGTDelegationState} from "./_bgtDelegationState"

@Entity_()
export class BGTDelegation {
    constructor(props?: Partial<BGTDelegation>) {
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

    @Column_("varchar", {length: 9, nullable: false})
    state!: BGTDelegationState

    @BigIntColumn_({nullable: false})
    timestamp!: bigint

    @IntColumn_({nullable: false})
    queuedAtBlock!: number

    @StringColumn_({nullable: false})
    transactionHash!: string
}
