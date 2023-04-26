import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tbluser", { schema: "kitchenDB" })
export class Tbluser {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "userType", nullable: true, length: 20 })
  userType: string | null;

  @Column("varchar", { name: "username", nullable: true, length: 50 })
  username: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 254 })
  email: string | null;

  @Column("varchar", { name: "phone", nullable: true, length: 50 })
  phone: string | null;

  @Column("longtext", { name: "password", nullable: true })
  password: string | null;

  @Column("tinyint", { name: "socialflag", width: 1 })
  socialflag: boolean;

  @Column("tinyint", { name: "activeStatus", width: 1 })
  activeStatus: boolean;

  @Column("varchar", { name: "otp", nullable: true, length: 4 })
  otp: string | null;

  @Column("datetime", { name: "otpGeneratedDatetime", nullable: true })
  otpGeneratedDatetime: Date | null;

  @Column("varchar", { name: "otpStep", nullable: true, length: 50 })
  otpStep: string | null;

  @Column("int", { name: "otpFailAttempts" })
  otpFailAttempts: number;

  @Column("varchar", { name: "resentOtp", nullable: true, length: 50 })
  resentOtp: string | null;

  @Column("datetime", { name: "otpTimeout", nullable: true })
  otpTimeout: Date | null;

  @Column("int", { name: "resendOtpAttempts" })
  resendOtpAttempts: number;

  @Column("varchar", { name: "firebaseToken", nullable: true, length: 255 })
  firebaseToken: string | null;

  @Column("varchar", { name: "registrationStatus", nullable: true, length: 50 })
  registrationStatus: string | null;

  @Column("datetime", { name: "modifiedDate", nullable: true })
  modifiedDate: Date | null;

  @Column("varchar", { name: "modifiedby", nullable: true, length: 70 })
  modifiedby: string | null;

  @Column("datetime", { name: "RegistrationDatetime", nullable: true })
  registrationDatetime: Date | null;

  @Column("tinyint", { name: "phoneverificationStatus", width: 1 })
  phoneverificationStatus: boolean;

  @Column("tinyint", { name: "emailverificationStatus", width: 1 })
  emailverificationStatus: boolean;

  @Column("varchar", { name: "lat", nullable: true, length: 50 })
  lat: string | null;

  @Column("varchar", { name: "long", nullable: true, length: 50 })
  long: string | null;

  @Column("varchar", { name: "locationName", nullable: true, length: 50 })
  locationName: string | null;

  @Column("varchar", { name: "deviceID", nullable: true, length: 50 })
  deviceId: string | null;

  @Column("varchar", { name: "deviceType", nullable: true, length: 50 })
  deviceType: string | null;

  @Column("longtext", { name: "profilepicture", nullable: true })
  profilepicture: string | null;
}
