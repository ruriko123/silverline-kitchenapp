import { io } from "@base/index";
import {orderHistory} from "@reqtypes/orderHistory";
import { createOutletHash } from '@controllers/Socket/socketJoinToken';
const emitOrder=async(outletName:string,orderObject:orderHistory)=>{
    let outletHash=await createOutletHash(outletName);
    console.log(outletHash);

    io.emit(`${outletHash}`,orderObject);
    return;
};



export {emitOrder};