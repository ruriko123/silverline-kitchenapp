import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { TblRestaurant } from "./TblRestaurant";

@Entity()
export class TblMenu {
    @PrimaryGeneratedColumn({type: "int", name: "IDMenu"})
    idMenu : number;

    @Column("varchar", {
        name: "Category",
        nullable: true,
        default:null,
        length: 100
    })
    Category : string | null;

    @Column("varchar", {
        name: "ItemName",
        nullable: true,
        length: 100,
        default:null
    })
    ItemName : string | null;

    @Column("decimal", {
        name: "costPrice",
        nullable: true,
        default:0.00,
        precision: 10,
        scale: 2
    })
    costPrice : string | null|number;

    @Column("decimal", {
        name: "sellingPrice",
        nullable: true,
        default:0.00,
        precision: 10,
        scale: 2
    })
    sellingPrice : string | null|number;


    @Column("decimal", {
        name: "sellingPricewithTax",
        nullable: true,
        default:0.00,
        precision: 10,
        scale: 2
    })
    sellingPricewithTax : string | null|number;

    @Column("boolean", {
        name: "Taxable",
        default:true
    })
    Taxable : boolean|string | null;


    @Column("boolean", {
        name: "isActive",

        default:true
    })
    isActive : boolean|string | null;


    @Column("varchar", {
        name: "description",
        nullable: true,
        length:200,
        default:""
    })
    description : string | null;
    @Column("int", {
        name: "restaurantID",
        nullable: true,
    })
    restaurantID : number ;





    @ManyToOne(
        () => TblRestaurant,
        (restaurant) =>restaurant.id,
        { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
      )
      @JoinColumn([{ name: "restaurantID", referencedColumnName: "id" }])
      restaurant: TblRestaurant

}
