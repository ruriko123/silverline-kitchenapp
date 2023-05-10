import {RequestHandler} from "express";
import myDataSource from "@base/app-data-source";
import {TbloperatingLocations} from '@model/TbloperatingLocations';
import {Tbluser} from '@model/Tbluser';
import { sendMassNotification } from "@utils/firebase/sendMassNotification";


const AdminsendMassNotification : RequestHandler = async(req, res) => {
    try {
        let title : string = req
            ?.body
                ?.title;
        let subject : string = req
            ?.body
                ?.subject;
        let preferredlocation : string = req
            ?.body
                ?.preferredlocation;

        if (!title) {
            res
                .status(400)
                .json({error: "Title missing"});
            return;
        };
        if (!subject) {
            res
                .status(400)
                .json({error: "Subject missing"});
            return;
        };

        if (!preferredlocation) {
            res
                .status(400)
                .json({error: "preferredlocation missing."});
            return;
        };
        let firebasetokens;
        if (preferredlocation === "ALL") {
            firebasetokens = await myDataSource
                .getRepository(Tbluser)
                .createQueryBuilder("t")
                .select(["t.firebaseToken"])
                .where({registrationStatus:"REGISTERED",activeStatus: true})
                .andWhere("firebaseToken IS NOT NULL")
                .getMany();
        } else {
            firebasetokens = await myDataSource
                .getRepository(Tbluser)
                .createQueryBuilder("t")
                .select(["t.firebaseToken"])
                .where({registrationStatus:"REGISTERED",activeStatus: true, preferredlocation: preferredlocation})
                .andWhere("firebaseToken IS NOT NULL")
                .getMany();
        };
        if (!firebasetokens) {
            res
                .status(400)
                .json({error: "Couldn't find firebase tokens."});
            return;
        };

        try {
            sendMassNotification(firebasetokens,title,subject);
        } catch (error) {
            res
            .status(400)
            .json({error: "Error occured while sending mass notification."});
        return;
        }

        res
            .status(200)
            .json({success: "Mass notification sent."});
        return;

    } catch (error) {
        res
            .status(500)
            .json({error: error});
        return;
    };
};

export {AdminsendMassNotification};