import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {TblRestaurant} from "./TblRestaurant";
import {Tbluser} from './Tbluser';
import {TblMenu} from './TblMenu';
import {TblCart} from './TblCart';

@Entity()
export class TblCartItems {
    @PrimaryGeneratedColumn({type: "int", name: "IDCartItem"})
    idCartitem : number;

    @Column("int", {
        name: "cartID",
        nullable: true
    })
    cartID : number | string | null;

    @ManyToOne(() => TblCart, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION"
    })
    @JoinColumn({name: 'cartID', referencedColumnName: 'idCart'})
    cart : TblCart;

    @Column("int", {
        name: "itemID",
        nullable: true
    })
    itemID : number | string | null;

    @Column("varchar", {
        name: "ItemName",
        nullable: true,
        length: 100,
        default: null
    })
    ItemName : string | null;

    @Column("decimal", {
        name: "costPrice",
        nullable: true,
        default: 0.00,
        precision: 10,
        scale: 2
    })
    costPrice : string | null | number;

    @Column("decimal", {
        name: "sellingPrice",
        nullable: true,
        default: 0.00,
        precision: 10,
        scale: 2
    })
    sellingPrice : string | null | number;


    @Column("decimal", {
        name: "quantity",
        nullable: true,
        default: 1.00,
        precision: 10,
        scale: 2
    })
    quantity : string | null | number;

    @Column("decimal", {
        name: "sellingPricewithTax",
        nullable: true,
        default: 0.00,
        precision: 10,
        scale: 2
    })
    sellingPricewithTax : string | null | number;

    @Column("boolean", {
        name: "Taxable",
        default: true
    })
    Taxable : boolean | string | null;

    @Column("boolean", {
        name: "isActive",
        default: true
    })
    isActive : boolean | string | null;


    @Column("boolean", {
        name: "isRemoved",
        default: false
    })
    isRemoved : boolean | string | null;

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

}
