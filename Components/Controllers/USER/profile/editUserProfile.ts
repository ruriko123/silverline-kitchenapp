import {RequestHandler} from "express";
import {normalUserRegister} from "@reqtypes/orderHistory";
import myDataSource from "@base/app-data-source";
import {Tbluser} from '@model/Tbluser';
import {decodeToken} from '@utils/USER/token';
import {getCurrentTime} from "@utils/time/getCurrentTime";
import {generateToken} from "@utils/USER/token";

const editUserProfile : RequestHandler = async(req, res) => {
    try {
        let userdata : normalUserRegister = req
            ?.body;
        let full_name = userdata
            ?.full_name;
        let phone = userdata
            ?.phone || "";
        let long = userdata
            ?.long || "";
        let lat = userdata
            ?.lat || "";
        if (!long || long === "") {
            long = "85.3240";
        };
        if (!lat || lat === "") {
            lat = "27.7172";
        };
        let address = userdata
            ?.address || "";

        if (!full_name) {
            res
                .status(400)
                .json({"error": "Full name is missing."});
            return;
        };
        let modifiedDate = await getCurrentTime();
        let modifiedby = "SELF";

        let token = req
            ?.headers
                ?.token;
        let tokendata = await decodeToken(token);
        if (!tokendata || tokendata
            ?.error) {
            res
                .status(303)
                .json({detail: "error while reading token."});
            return;
        };
        let userid : number = tokendata
            ?.id;

        let userData = await myDataSource
            .getRepository(Tbluser)
            .findOne({
                where: {
                    id: userid
                }
            });
        if (!userData) {
            res
                .status(400)
                .json({detail: "User does not exist."});
            return;
        };

        if (!(userData
            ?.otpStep === "COMPLETED")) {
            res
                .status(400)
                .json({detail: "OTP verification not completed."});
            return;
        } else {

            await myDataSource
                .createQueryBuilder()
                .update(Tbluser)
                .set({
                    modifiedby: modifiedby,
                    modifiedDate: modifiedDate,
                    locationName: address,
                    lat: lat,
                    long: long,
                    phone: phone,
                    displayname: full_name
                })
                .where("id = :id", {id: userid})
                .execute();

                let newuserinfo = await myDataSource
                .getRepository(Tbluser)
                .createQueryBuilder("t")
                .select([
                    "t.id",
                    "t.displayname",
                    "t.email",
                    "t.phone",
                    "t.locationName",
                    "t.altphone",
                    "t.points",
                    "t.profilepicture"
                ])
                .where({id: userid})
                .getOne();


                let tokenobject = {
                    id: newuserinfo
                        ?.id,
                    displayname: newuserinfo
                    ?.displayname
                };
                let token = await generateToken(tokenobject);


            res
                .status(200)
                .json({newinfo:newuserinfo,token:token});
            return;
        };

    } catch (error) {
        res
            .status(500)
            .json({"error": error});
        return;
    };
};

export {editUserProfile};
