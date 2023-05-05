import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class TblThirdparty {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id : number;

    @Column("varchar", {
        name: "CompanyName",
        nullable: true,
        default:null,

        length: 100
    })
    CompanyName : string | null;

    @Column("varchar", {
        name: "Address",
        nullable: true,
        default:null,

        length: 100
    })
    Address : string | null;

    @Column("varchar", {
        name: "Phone",
        nullable: true,
        default:null,

        length: 20
    })
    Phone : string | null;

    @Column("varchar", {
        name: "Pan",
        nullable: true,
        default:null,

        length: 50
    })
    Pan : string | null;

    @Column("varchar", {
        name: "AltPhone",
        nullable: true,
        default:null,

        length: 50
    })
    AltPhone : string | null;

    @Column("varchar", {
        name: "Email",
        nullable: true,
        default:null,

        length: 70
    })
    Email : string | null;

    @Column("varchar", {
        name: "baseURL",
        nullable: true,
        default:null,

        length: 100
    })
    baseURL : string | null;



    @Column("varchar", {
        name: "Token",
        nullable: true,
        default:null,

        length: 200
    })
    Token : string | null;

    @Column("varchar", {
        name: "deletedBy",
        nullable: true,
        default:null,

        length: 50
    })
    deletedBy : string | null;

    @Column("varchar", {
        name: "addedBy",
        default:null,

        nullable: true,
        length: 50
    })
    addedBy : string | null;

    @Column("varchar", {
        name: "addedDate",
        default:null,

        nullable: true,
        length: 50
    })
    addedDate : string | null;

    @Column("varchar", {
        default:null,

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
