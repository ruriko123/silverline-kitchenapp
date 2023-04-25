import {adminHash} from "@base/Components/utils/AdminHash";
import {TblAdmin} from "@model/TblAdmin";
import myDataSource from "@base/app-data-source";


const createDefaultAdmin= async()=>{
    try {

        if(!process.env.DEFAULTADMINUSERNAME || !process.env.DEFAULTADMINPASSWORD){
            console.log("FAILURE: cannot read default admin credentials from env file.")
            return;
        }
        let userName = process.env.DEFAULTADMINUSERNAME;
        let password = process.env.DEFAULTADMINPASSWORD;
        let PermissionType="MAINADMIN"
        let addedBy : string ="BACKEND";
        let addedDate = new Date().toLocaleString('en-US', {timeZone: 'Asia/Kathmandu'});

        let userData = await myDataSource
            .getRepository(TblAdmin)
            .findOne({
                where: {
                    userName: `${userName}`
                }
            });
        if(userData){
            return;
        } else {
            const admintable = new TblAdmin();
            password = await adminHash(password);
            admintable.userName=userName;
            admintable.Password=password;
            admintable.PermissionType=PermissionType;
            admintable.addedBy = addedBy;
            admintable.addedDate=addedDate;
            admintable.isMainAdmin=true;
            await myDataSource
            .manager
            .save(admintable);

            return;
        }

    } catch (error) {
            return;

    }
}
export {createDefaultAdmin};