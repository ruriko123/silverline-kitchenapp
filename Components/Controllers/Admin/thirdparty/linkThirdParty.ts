import {RequestHandler} from "express";
import {TblRestaurantThirdPartyLinks} from "@model/TblRestaurantThirdPartyLinks";
import myDataSource from "@base/app-data-source";
import {TblThirdparty} from "@model/TblThirdparty";
import {TblRestaurant} from "@model/TblRestaurant";
import { RestaurantLinkDJANGOAPI } from "@base/Components/utils/RestaurantLinkDJANGOAPI";

const linkThirdParty : RequestHandler = async(req, res) => {
    try {
        let RestaurantName : string = req.body
            ?.RestaurantName;
        let ThirdPartyName : string = req.body
            ?.ThirdPartyName;
        let restaurantID:any=req?.body?.id;
        if (!RestaurantName || !ThirdPartyName || RestaurantName === "" || ThirdPartyName === "") {
            res
                .status(401)
                .json({"error": "Missing parameters."});
            return;
        };

        let ThirdPartyExists = await myDataSource
            .getRepository(TblThirdparty)
            .findOne({
                where: {
                    CompanyName: `${ThirdPartyName}`
                }
            });
        if (!ThirdPartyExists) {
            res
                .status(400)
                .json({"error": "Third party does not exist."});
            return;
        };

        let restaurantExists = await myDataSource
            .getRepository(TblRestaurant)
            .findOne({
                where: {
                    Name: `${RestaurantName}`
                }
            });

        if (!restaurantExists) {
            res
                .status(400)
                .json({"error": "Restaurant does not exist."});
            return;
        };

        let restaurantLinkData = await myDataSource
            .getRepository(TblRestaurantThirdPartyLinks)
            .findOne({
                where: {
                    RestaurantName: `${RestaurantName}`,
                    ThirdPartyName: `${ThirdPartyName}`
                }
            });
        if (restaurantLinkData) {
            res
                .status(400)
                .json({"error": "Third party link to the restaurant already exists."});
            return;
        } else {
            let thirdPartyInfo = {
                name: ThirdPartyExists.CompanyName,
                Address: ThirdPartyExists.Address,
                contact_number: ThirdPartyExists.Phone,
                tax_number: ThirdPartyExists.Pan,
                type:"LINK",
                BASEURL:restaurantExists.baseURL,
                email:ThirdPartyExists.Email,
                KEY:"",
            };
            RestaurantLinkDJANGOAPI(thirdPartyInfo);
            const restaurantthirdpartyLink = new TblRestaurantThirdPartyLinks();
            restaurantthirdpartyLink.RestaurantName = RestaurantName;
            restaurantthirdpartyLink.ThirdPartyName = ThirdPartyName;
            restaurantthirdpartyLink.RestaurantID=restaurantID;
            await myDataSource
                .manager
                .save(restaurantthirdpartyLink);
            res
                .status(200)
                .json({"success": "Third party linked with the restaurant successfully."});
            return;
        };
    } catch (error) {
        res
            .status(500)
            .json({"error": error});
        return;
    };
};

export {linkThirdParty};