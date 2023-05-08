import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {user_Tblordertracker} from "./user_Tblordertracker";
import {TblMenu} from './TblMenu';



@Index("tblordert_ordertracker_id_b772ac4fewfwefwefb_fk_quickstar", ["ordertrackerId"], {})
@Entity()
export class user_Tblordertrackerdetails {
    @PrimaryGeneratedColumn({type: "int", name: "idtblordertracker_details"})
    idtblordertrackerDetails : number;

    @Column("varchar", {
        name: "itemname",
        nullable: true,
        length: 100
    })
    itemname : string | null;

    @Column("varchar", {
        name: "orderedat",
        nullable: true,
        length: 120
    })
    orderedat : string | null;

    @Column("varchar", {
        name: "completedat",
        nullable: true,
        length: 120
    })
    completedat : string | null;

    @Column("varchar", {
        name: "totaltime",
        nullable: true,
        length: 120
    })
    totaltime : string | null;

    @Column("decimal", {
        name: "quantity",
        nullable: true,
        precision: 10,
        scale: 2
    })
    quantity : string | null;

    @Column("varchar", {
        name: "modification",
        nullable: true,
        length: 250,
        default:"",
    })
    modification : string | null;

    @Column("varchar", {
        name: "itemType",
        default: "FOOD",
        length: 50
    })
    itemType : string | null;

    @Column("varchar", {
        name: "avgpreptime",
        nullable: true,
        length: 20
    })
    avgpreptime : string | null;

    @Column("varchar", {
        name: "preptimedifference",
        nullable: true,
        length: 14
    })
    preptimedifference : string | null;

    @Column("varchar", {
        name: "item_price",
        nullable: true,
        length: 25
    })
    itemPrice : string | null;

    @Column("varchar", {
        name: "category",
        nullable: true,
        length: 100
    })
    category : string | null;

    @Column("varchar", {
        name: "voidat",
        nullable: true,
        length: 20
    })
    voidat : string | null;

    @Column("varchar", {
        name: "voidtotaltime",
        nullable: true,
        length: 20
    })
    voidtotaltime : string | null;

    @Column("int", {
        name: "ordertracker_id",
        nullable: true
    })
    ordertrackerId : string | null | number;

    @Column("varchar", {
        name: "description",
        nullable: true,
        length: 200
    })
    description : string | null;

    @Column("tinyint", {
        name: "is_taxable",
        nullable: true,
        width: 1
    })
    isTaxable : boolean | null;

    @Column("int", {
        name: "productID",
        nullable: true
    })
    productId : number | null;

    @Column("varchar", {
        name: "unit",
        nullable: true,
        length: 15,
        default:null,
    })
    unit : string | null;


    @Column("int", {
        name: "itemID",
        nullable: true
    })
    itemID : number | string | null;

    @ManyToOne(() => TblMenu, (item) => item.idMenu, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION"
    })
    @JoinColumn([
        {
            name: "itemID",
            referencedColumnName: "idMenu"
        }
    ])
    item : TblMenu

    @ManyToOne(() => user_Tblordertracker, user_tblordertrackerdetails => user_tblordertrackerdetails.user_tblordertrackerdetails, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION"
    })
    @JoinColumn([
        {
            name: "ordertracker_id",
            referencedColumnName: "id"
        }
    ])
    ordertracker : user_Tblordertracker;
}
