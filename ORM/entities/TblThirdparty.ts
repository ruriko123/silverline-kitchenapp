import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class TblThirdparty {
    @PrimaryGeneratedColumn({type: "bigint", name: "id"})
    id : number;

    @Column("varchar", {
        name: "CompanyName",
        nullable: true,
        length: 50
    })
    CompanyName : string | null;

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
        name: "baseURL",
        nullable: true,
        length: 50
    })
    baseURL : string | null;



    @Column("varchar", {
        name: "Token",
        nullable: true,
        length: 200
    })
    Token : string | null;

    @Column("varchar", {
        name: "deletedBy",
        nullable: true,
        length: 50
    })
    deletedBy : string | null;

    @Column("varchar", {
        name: "addedBy",
        nullable: true,
        length: 50
    })
    addedBy : string | null;

    @Column("varchar", {
        name: "addedDate",
        nullable: true,
        length: 50
    })
    addedDate : string | null;

    @Column("varchar", {
        name: "deletedDate",
        nullable: true,
        length: 50
    })
    deletedDate : string | null;

    @Column("boolean", {
        name: "isActive",
        default:true
    })
    isActive : string | null;

}
