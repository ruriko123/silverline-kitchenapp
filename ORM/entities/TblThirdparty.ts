import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class TblThirdparty {
    @PrimaryGeneratedColumn({type: "bigint", name: "id"})
    id : string;

    @Column("varchar", {
        name: "CompanyName",
        nullable: true,
        length: 50
    })
    CompanyName : number | null;

    @Column("varchar", {
        name: "Address",
        nullable: true,
        length: 50
    })
    Address : string | null;

    @Column("varchar", {
        name: "Phone",
        nullable: true,
        length: 20
    })
    Phone : string | null;

    @Column("varchar", {
        name: "Pan",
        nullable: true,
        length: 50
    })
    Pan : string | null;

    @Column("varchar", {
        name: "AltPhone",
        nullable: true,
        length: 50
    })
    AltPhone : string | null;

    @Column("varchar", {
        name: "Email",
        nullable: true,
        length: 50
    })
    Email : string | null;

    @Column("varchar", {
        name: "Token",
        nullable: true,
        length: 200
    })
    Token : string | null;

    @Column("boolean", {
        name: "isActive",
        default:true
    })
    isActive : string | null;

}
