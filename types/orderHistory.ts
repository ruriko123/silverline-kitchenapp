/* Types for orderhistory post api */


export interface orderHistory {
    Id:number|null|string;
    outlet_orderid: number;
    kotid: string|null;
    orderedat:string;
    tablenum:string|null;
    employee:string;
    ordertype:string;
    currentstate:string;
    outletName:string;
    guestCount:number|null;
    customerName:string|null;
    customerPhone:string|null;
    Address:string|null;
    deliveryVia:string;
    
    OrderItemDetailsList:Array<orderHistoryDetails>

}

export interface orderHistoryDetails{
    idtblordertracker_details:string|null|number;
    orderedat:string;
    itemname:string;
    quantity:string|null;
    modification:string|null;
    avgpreptime:string|null;
    itemPrice:string;
    category:string;
    description:string;
    productId:number;
    unit:string|null;
    isTaxable:boolean;

}


export interface orderHistoryThirdParty extends orderHistory{
    id?:number|null;
    CompanyName?:number|null;
    CompanyAddress?:number|null;
    CompanyPhone?:number|null;
    CompanyPan?:number|null;
    CompanyAltPhone?:number|null;
    CompanyEmail?:number|null;
    Token?:number|null;
    CompanyisActive?:boolean|number|null;

}

export interface thirdParty {
    id:number|null;
    Name:number|null;
    Address:number|null;
    Phone:number|null;
    Pan:number|null;
    AltPhone:number|null;
    Email:number|null;
    Token:number|null;
    isActive:boolean|number|null;
}
