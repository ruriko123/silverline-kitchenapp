import {TblThirdparty} from "@model/TblThirdparty";
import myDataSource from "@base/app-data-source";

const check3Ptoken = async(token : string|undefined) => {
    try {
        if(!token){
            let errordata = {
                "tokenError": `Token not provided.`
            };
            return errordata;
        }
        const thirdPartyCheck = await myDataSource
            .getRepository(TblThirdparty)
            .findOne({
                where: {
                    Token: `${token}`
                }
            });

        if(!thirdPartyCheck ){
        let errordata = {
            "tokenError": `Invalid token.`
        };
        return errordata;
    } else {
        return thirdPartyCheck;
    }


    } catch (err) {
        let errordata = {
            "error": `${err}`
        };
        return errordata;
    };

};

export {check3Ptoken};
