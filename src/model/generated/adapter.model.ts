import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_} from "@subsquid/typeorm-store"

@Entity_()
export class Adapter {
    constructor(props?: Partial<Adapter>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    address!: string

    @StringColumn_({nullable: false})
    protocol!: string

    @Index_()
    @StringColumn_({nullable: false})
    vault!: string
}
