import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tbloperating_locations", { schema: "kitchenDB" })
export class TbloperatingLocations {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "LocationName", nullable: true, length: 50 })
  locationName: string | null;

  @Column("varchar", { name: "IMAGEURL", nullable: true, length: 50 })
  imageurl: string | null;

  @Column("tinyint", { name: "isActive", default: () => "'1'" })
  isActive: number;
}
