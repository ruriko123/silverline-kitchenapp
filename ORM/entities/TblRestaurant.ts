import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class TblRestaurant {
    @PrimaryGeneratedColumn({type: "bigint", name: "id"})
    id : number;

    @Column("varchar", {
        name: "Name",
        nullable: true,
        default:null,

        length: 150
    })
    Name : string | null;

    @Column("varchar", {
        name: "Address",
        nullable: true,
        default:null,

        length: 70
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

        length: 50
    })
    Email : string | null;

    @Column("varchar", {
        name: "long",
        nullable: true,
        default:null,

        length: 20
    })
    long : string | null;



    @Column("varchar", {
        name: "lat",
        nullable: true,
        default:null,

        length: 20
        
    })
    lat : string | null;

    @Column("varchar", {
        name: "details",
        nullable: true,
        default:null,
        length: 150
    })
    details : string | null;
    @Column("varchar", {
        name: "logo",
        nullable: true,
        default:"https://cdn.logojoy.com/wp-content/uploads/2018/05/30151524/822.png",

        length: 500
    })
    logo : string | null;


    @Column("varchar", {
        name: "coverimage",
        nullable: true,
        default:"https://cdn.logojoy.com/wp-content/uploads/2018/05/30151524/822.png",

        length: 500
    })
    coverimage : string | null;


    @Column("varchar", {
        name: "contactPerson",
        nullable: true,
        default:null,

        length: 50
    })
    contactPerson : string | null;


    @Column("varchar", {
        name: "commission",
        nullable: true,
        default:null,

        length: 50

    })
    commission : string | null;

    @Column("varchar", {
        name: "slogan",
        nullable: true,
        default:null,

        length: 150
    })
    slogan : string | null;


    @Column("boolean", {
        name: "isResproclient",
        default: true,
    })
    isResproclient :boolean;

    @Column("varchar", {
        name: "deletedBy",
        nullable: true,
        default:null,

        length: 50
    })
    deletedBy : string | null;

    @Column("varchar", {
        name: "addedBy",
        nullable: true,
        default:null,

        length: 50
    })
    addedBy : string | null;

    @Column("varchar", {
        name: "addedDate",
        nullable: true,
        default:null,

        length: 50
    })
    addedDate : string | null;

    @Column("varchar", {
        name: "deletedDate",
        nullable: true,
        default:null,

        length: 50
    })
    deletedDate : string | null;

    @Column("varchar", {
        name: "lastModifiedBy",
        nullable: true,
        default:null,

        length: 50
    })
    lastModifiedBy : string | null;
    @Column("varchar", {
        name: "baseURL",
        nullable: true,
        default:null,

        length: 50
    })
    baseURL : string | null;

    @Column("varchar", {
        name: "openingTime",
        nullable: true,
        default:null,

        length: 50
    })
    openingTime : string | null;

    @Column("varchar", {
        name: "closingTime",
        nullable: true,
        default:null,

        length: 50
    })
    closingTime : string | null;

    @Column("varchar", {
        name: "operatingLocation",
        nullable: true,
        default:"KATHMANDU",
        length: 70
    })
    operatingLocation : string | null;



    @Column("boolean", {
        name: "isActive",
        default:false
    })
    isActive : boolean | null;

    @Column("boolean", {
        name: "isPopular",
        default:false
    })
    isPopular : boolean | null;

}
