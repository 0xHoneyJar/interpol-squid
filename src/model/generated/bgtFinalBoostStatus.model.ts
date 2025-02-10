import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class BGTFinalBoostStatus {
    constructor(props?: Partial<BGTFinalBoostStatus>) {
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
    queuedBoostAmount!: bigint

    @BigIntColumn_({nullable: false})
    activatedBoostAmount!: bigint

    @BigIntColumn_({nullable: false})
    queuedDropAmount!: bigint
}
