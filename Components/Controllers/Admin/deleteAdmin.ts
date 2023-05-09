import {RequestHandler} from "express";
import {adminHash, adminHashCompare} from "@base/Components/utils/AdminHash";
import {TblAdmin} from "@model/TblAdmin";
import myDataSource from "@base/app-data-source";

const deleteAdmin : RequestHandler = async(req, res) => {

    try {

        let id:number = req.body
            ?.id;
        if(!id){
            res
            .status(401)
            .json({"error": "Admin ID not supplied."});
            return;
        };
        let userData = await myDataSource
            .getRepository(TblAdmin)
            .findOne({
                where: {
                    id: id,
                    isMainAdmin:false
                }
            });
        if(!userData){
            res
            .status(400)
            .json({"error": "Admin with this username either does not exist not cannot be deleted."});
            return;
        } else {
            await myDataSource
            .createQueryBuilder()
            .delete()
            .from(TblAdmin)
            .where("id = :id", { id: id } ).andWhere({isMainAdmin:false})
            .execute();
            res
            .status(200)
            .json({"success": "Admin deleted."});
            return;
        };
    } catch (error) {
        res
            .status(500)
            .json({detail: error});
            return;
    };
};

export {deleteAdmin};