import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Tbluser {
    @PrimaryGeneratedColumn({type: "bigint", name: "id"})
    id : number;

    @Column("varchar", {
        name: "userType",
        nullable: true,
        length: 20,
        default:"user"
    })
    userType : string | null;

    @Column("varchar", {
        name: "username",
        nullable: true,
        length: 350,
        default:null
    })
    username : string | null;

    @Column("varchar", {
        name: "displayname",
        nullable: true,
        length: 70,
        default:null
    })
    displayname : string | null;

    @Column("varchar", {
        name: "email",
        nullable: true,
        length: 100,
        default:null
    })
    email : string | null;

    @Column("varchar", {
        name: "phone",
        nullable: true,
        length: 50,
        default:null
    })
    phone : string | null;

    @Column("varchar", {
        name: "preferredlocation",
        nullable: true,
        length: 50,
        default:"KATHMANDU"
    })
    preferredlocation : string | null;


    @Column("longtext", {
        name: "password",
        nullable: true,
        default:null
    })
    password : string | null;

    @Column("tinyint", {
        name: "socialflag",
        width: 1,
        default:null
    })
    socialflag : boolean;

    @Column("tinyint", {
        name: "activeStatus",
        width: 1,
        default:true
    })
    activeStatus : boolean;

    @Column("varchar", {
        name: "otp",
        nullable: true,
        length:5,
        default:null
    })
    otp : string | null;

    @Column("datetime", {
        name: "otpGeneratedDatetime",
        nullable: true,
        default:null
    })
    otpGeneratedDatetime : Date | null;

    @Column("varchar", {
        name: "otpStep",
        nullable: true,
        length: 50,
        default:null
    })
    otpStep : string | null;

    @Column("int", {name: "otpFailAttempts",default:0,nullable:true})
    otpFailAttempts : number;

    @Column("varchar", {
        name: "resentOtp",
        nullable: true,
        length: 50,
        default:null
    })
    resentOtp : string | null;

    @Column("datetime", {
        name: "otpTimeout",
        nullable: true,
        default:null
    })
    otpTimeout : Date | null;

    @Column("int", {name: "resendOtpAttempts", default:0, nullable: true})
    resendOtpAttempts : number;

    @Column("varchar", {
        name: "firebaseToken",
        nullable: true,
        length: 350,
        default:null

    })
    firebaseToken : string | null;

    @Column("varchar", {
        name: "registrationStatus",
        nullable: true,
        length: 50,
        default:null

    })
    registrationStatus : string | null;

    @Column("datetime", {
        name: "modifiedDate",
        nullable: true,
        default:null

    })
    modifiedDate : Date | null;

    @Column("varchar", {
        name: "modifiedby",
        nullable: true,
        length: 70,
        default:null

    })
    modifiedby : string | null;

    @Column("datetime", {
        name: "RegistrationDatetime",
        nullable: true,
        default:null

    })
    registrationDatetime : Date | null;

    @Column("tinyint", {
        name: "phoneverificationStatus",
        width: 1,
        default:false
    })
    phoneverificationStatus : boolean;

    @Column("tinyint", {
        name: "emailverificationStatus",
        width: 1,
        default:false
    })
    emailverificationStatus : boolean;

    @Column("varchar", {
        name: "lat",
        nullable: true,
        length: 50,
        default:"27.7172"

    })
    lat : string | null;

    @Column("varchar", {
        name: "long",
        nullable: true,
        length: 50,
        default:"85.3240"

    })
    long : string | null;

    @Column("varchar", {
        name: "locationName",
        nullable: true,
        length: 300,
        default:null

    })
    locationName : string | null;

    @Column("varchar", {
        name: "deviceID",
        nullable: true,
        length: 100,
        default:null

    })
    deviceId : string | null;

    @Column("varchar", {
        name: "deviceType",
        nullable: true,
        length: 50,
        default:null


    })
    deviceType : string | null;

    @Column("longtext", {
        name: "profilepicture",
        nullable: true,
        default:null
    })
    profilepicture : string | null;
}
