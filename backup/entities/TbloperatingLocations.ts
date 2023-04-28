import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tbloperating_locations", { schema: "kitchenDB" })
export class TbloperatingLocations {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "LocationName", nullable: true, length: 150 })
  locationName: string | null;

  @Column("tinyint", { name: "isActive", default: () => "'1'" })
  isActive: number;

  @Column("varchar", { name: "IMAGEURL", nullable: true, length: 300 })
  imageurl: string | null;
}
