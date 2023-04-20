import { io } from "@base/index";
import {orderHistory} from "@reqtypes/orderHistory";
import { createOutletHash } from '@socket/socketJoinToken';
const emitOrder=async(outletName:string,orderObject:orderHistory)=>{
    let outletHash=await createOutletHash(outletName);
    console.log(outletHash);
    io.emit(`${outletHash}`,orderObject);
    return;
};



export {emitOrder};