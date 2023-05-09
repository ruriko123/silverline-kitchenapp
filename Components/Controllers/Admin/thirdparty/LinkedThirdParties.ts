import {RequestHandler} from "express";
import {TblRestaurantThirdPartyLinks} from "@model/TblRestaurantThirdPartyLinks";
import myDataSource from "@base/app-data-source";
import {TblThirdparty} from "@model/TblThirdparty";

const LinkedThirdParties : RequestHandler = async(req, res) => {
    try {
        let id : number = req.body
            ?.id;
        let restaurantName : number = req.body
            ?.restaurantName;
        if (!id || !restaurantName) {
            res
                .status(500)
                .json({"error": "Missing parameters."});
            return;
        };
        let allThirdPartyNames = await myDataSource
            .getRepository(TblThirdparty)
            .createQueryBuilder("t")
            .select(["t.CompanyName"])
            .getMany();
        let allthirdPartiesarray = [];
        for (let x in allThirdPartyNames) {
            let companyname = allThirdPartyNames[x].CompanyName;
            let tempobject = {
                value: companyname,
                label: companyname
            };
            allthirdPartiesarray.push(tempobject);
        };
        let linkedParties = await myDataSource
            .getRepository(TblRestaurantThirdPartyLinks)
            .createQueryBuilder("t")
            .select(["t.ThirdPartyName"])
            .where({RestaurantID: id, RestaurantName: restaurantName})
            .getMany();
        let linkedpartiesarray = [];
        if (linkedParties && linkedParties.length > 0) {
            for (let k in linkedParties) {
                let ThirdPartyName = linkedParties[k].ThirdPartyName;
                let ThirdPartyNametempobject = {
                    value: ThirdPartyName,
                    label: ThirdPartyName
                };
                linkedpartiesarray.push(ThirdPartyNametempobject);
            };
        };
        let jsonData = {
            allThirdPartyNames: allthirdPartiesarray,
            linkedParties: linkedpartiesarray
        };
        res
            .status(200)
            .json(jsonData);
        return;
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({detail: error});
        return;
    };
};

export {LinkedThirdParties};