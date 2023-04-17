import { io } from "@base/index";
import {orderHistory} from "@reqtypes/orderHistory";

const emitOrder=async(eventName:String,orderObject:orderHistory)=>{
    io.emit(`${eventName}`,orderObject);
};



export {emitOrder};