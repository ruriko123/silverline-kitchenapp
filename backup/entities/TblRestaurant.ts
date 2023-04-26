import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tbl_restaurant", { schema: "kitchenDB" })
export class TblRestaurant {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "Name", nullable: true, length: 150 })
  name: string | null;

  @Column("varchar", { name: "Address", nullable: true, length: 70 })
  address: string | null;

  @Column("varchar", { name: "Phone", nullable: true, length: 20 })
  phone: string | null;

  @Column("varchar", { name: "Pan", nullable: true, length: 50 })
  pan: string | null;

  @Column("varchar", { name: "AltPhone", nullable: true, length: 50 })
  altPhone: string | null;

  @Column("varchar", { name: "Email", nullable: true, length: 50 })
  email: string | null;

  @Column("varchar", { name: "long", nullable: true, length: 20 })
  long: string | null;

  @Column("varchar", { name: "lat", nullable: true, length: 20 })
  lat: string | null;

  @Column("varchar", { name: "details", nullable: true, length: 90 })
  details: string | null;

  @Column("varchar", { name: "logo", nullable: true, length: 250 })
  logo: string | null;

  @Column("varchar", { name: "coverimage", nullable: true, length: 250 })
  coverimage: string | null;

  @Column("varchar", { name: "contactPerson", nullable: true, length: 50 })
  contactPerson: string | null;

  @Column("varchar", { name: "commission", nullable: true, length: 50 })
  commission: string | null;

  @Column("varchar", { name: "slogan", nullable: true, length: 150 })
  slogan: string | null;

  @Column("tinyint", { name: "isResproclient", default: () => "'1'" })
  isResproclient: number;

  @Column("varchar", { name: "deletedBy", nullable: true, length: 50 })
  deletedBy: string | null;

  @Column("varchar", { name: "addedBy", nullable: true, length: 50 })
  addedBy: string | null;

  @Column("varchar", { name: "addedDate", nullable: true, length: 50 })
  addedDate: string | null;

  @Column("varchar", { name: "deletedDate", nullable: true, length: 50 })
  deletedDate: string | null;

  @Column("varchar", { name: "lastModifiedBy", nullable: true, length: 50 })
  lastModifiedBy: string | null;

  @Column("tinyint", { name: "isActive", default: () => "'0'" })
  isActive: number;

  @Column("varchar", { name: "baseURL", nullable: true, length: 50 })
  baseUrl: string | null;

  @Column("varchar", { name: "openingTime", nullable: true, length: 50 })
  openingTime: string | null;

  @Column("varchar", { name: "closingTime", nullable: true, length: 50 })
  closingTime: string | null;
}
