/* Types for orderhistory post api */


export interface user_orderHistory {
    Id:number|null|string;
    outlet_orderid: number;
    orderedat:string;
    currentstate:string;
    outletName:string;
    customerName:string|null;
    customerPhone:string|null;
    Address:string|null;
    deliveryVia:string;
    outletID:number|null;
    OrderItemDetailsList:Array<user_orderHistoryDetails>
    deliverycustomer:deliverycustomerobject
    total:number|null;
    sub_total:number|null;
    nontaxable:number|null;
    tax_amount:number|null;
    delivery_charge:number|null;
    taxable:number|null;


};

export interface deliverycustomerobject {
    deliverycustomer_name:string;
    deliverycustomer_phone:string;
    altdeliverycustomerPhone:string|null;
    deliverycustomerAddress:string;
}
export interface user_orderHistoryDetails{
    idtblordertracker_details:string|null|number;
    orderedat:string|null;
    itemname:string;
    quantity:string|null;
    modification:string|null;
    itemPrice:string;
    category:string|null;
    description:string|null;
    unit:string|null;
    isTaxable:boolean;
    itemID:number;


};







export interface TopcartItems {
    items : Array<cartItemsObject>;
    restaurantID:number;
    cartID:string|number|null;
};

export interface cartItemsObject {
    idCartitem:number|string|null;
    itemID:number;
    ItemName:string;
    costPrice:string;
    sellingPrice:string;
    sellingPricewithTax:string;
    Taxable:boolean;
    quantity:string;

};




export interface socialLogin {
    full_name:string;
    social_token:string;
    email:string;
    phone:string|null;
    long:string|null;
    lat:string|null;
    address:string|null;
    deviceid:string|null;
    devicetype:string|null;
    firebasetoken:string|null;
};






export interface orderHistory {
    Id:number|null|string;
    outlet_orderid: number;
    // kotid: string|null;
    orderedat:string;
    // tablenum:string|null;
    // employee:string;
    // ordertype:string;
    currentstate:string;
    outletName:string;
    // guestCount:number|null;
    customerName:string|null;
    customerPhone:string|null;
    Address:string|null;
    deliveryVia:string;
    OrderItemDetailsList:Array<orderHistoryDetails>

};

export interface orderHistoryDetails{
    idtblordertracker_details:string|null|number;
    orderedat:string|null;
    itemname:string;
    quantity:string|null;
    modification:string|null;
    // avgpreptime:string|null;
    itemPrice:string;
    category:string;
    description:string;
    // productId:number;
    unit:string|null;
    isTaxable:boolean;

};


export interface orderHistoryThirdParty extends orderHistory{
    id?:number|null;
    CompanyName?:string|null;
    CompanyAddress?:string|null;
    CompanyPhone?:string|null;
    CompanyPan?:string|null;
    CompanyAltPhone?:string|null;
    CompanyEmail?:string|null;
    Token?:string|null;
    CompanyisActive?:boolean|string|number|null;

};

export interface thirdParty {
    id:number|null;
    Name:string|null;
    Address:string|null;
    Phone:string|null;
    Pan:string|null;
    AltPhone:string|null;
    Email:string|null;
    Token:string|null;
    isActive:boolean|number|string|null;
    addedBy:string|null;
    deletedBy:string|null;
    addedDate:string|null;
    deletedDate:string|null;
    baseURL:string|null;

};

export interface typeTblRestaurant{
    id:number|null;
    Name:string|null;
    Address:string|null;
    Phone:string|null;
    Pan:string|null;
    AltPhone:string|null;
    Email:string|null;
    long:string|null;
    lat:string|null;
    details:string|null;
    logo:string|null;
    coverimage:string|null;
    contactPerson:string|null;
    commission:string|null;
    slogin:string|null;
    lastModifiedBy:string|null;
    isResproclient:boolean|string|number|null;
    isActive:boolean|string|number|null;
    addedBy:string|null;
    deletedBy:string|null;
    addedDate:string|null;
    deletedDate:string|null;
    baseURL:string|null;
};