import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tblordertracker } from "./Tblordertracker";

@Index(
  "tblordert_ordertracker_id_b772ac4b_fk_quickstar",
  ["ordertrackerId"],
  {}
)
@Entity()
export class Tblordertrackerdetails {
  @PrimaryGeneratedColumn({ type: "int", name: "idtblordertracker_details" })
  idtblordertrackerDetails: number;

  @Column("varchar", { name: "itemname", nullable: true, length: 100 })
  itemname: string | null;

  @Column("varchar", { name: "orderedat", nullable: true, length: 10 })
  orderedat: string | null;

  @Column("varchar", { name: "completedat", nullable: true, length: 10 })
  completedat: string | null;

  @Column("varchar", { name: "totaltime", nullable: true, length: 10 })
  totaltime: string | null;

  @Column("decimal", {
    name: "quantity",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  quantity: string | null;


  @Column("varchar", { name: "modification", nullable: true, length: 50 })
  modification: string | null;


  @Column("varchar", { name: "itemType",default:"FOOD", length: 50 })
  itemType: string | null;


  @Column("varchar", { name: "avgpreptime", nullable: true, length: 20 })
  avgpreptime: string | null;

  @Column("varchar", { name: "preptimedifference", nullable: true, length: 14 })
  preptimedifference: string | null;

  @Column("varchar", { name: "item_price", nullable: true, length: 10 })
  itemPrice: string | null;

  @Column("varchar", { name: "category", nullable: true, length: 100 })
  category: string | null;

  @Column("varchar", { name: "voidat", nullable: true, length: 20 })
  voidat: string | null;

  @Column("varchar", { name: "voidtotaltime", nullable: true, length: 20 })
  voidtotaltime: string | null;

  @Column("bigint", { name: "ordertracker_id", nullable: true })
  ordertrackerId: string | null;

  @Column("varchar", { name: "description", nullable: true, length: 100 })
  description: string | null;

  @Column("tinyint", { name: "is_taxable", nullable: true, width: 1 })
  isTaxable: boolean | null;

  @Column("int", { name: "productID", nullable: true })
  productId: number | null;

  @Column("varchar", { name: "unit", nullable: true, length: 15 })
  unit: string | null;

  @ManyToOne(
    () => Tblordertracker,
    (tblordertracker) => tblordertracker.tblordertrackerdetails,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "ordertracker_id", referencedColumnName: "id" }])
  ordertracker: Tblordertracker;
}
