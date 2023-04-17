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