import {RequestHandler} from "express";
import {Tbluser} from "@model/Tbluser";
import myDataSource from "@base/app-data-source";
import {decodeToken} from '@utils/USER/token';
import {TblCart} from '@base/ORM/entities/TblCart';
import {TblCartItems} from "@base/ORM/entities/TblCartItems";
import {TopcartItems, cartItemsObject} from '@reqtypes/orderHistory';
import {TblMenu} from "@model/TblMenu";

function isItNumber(str : string) {
    return /^\-?[0-9]+(e[0-9]+)?(\.[0-9]+)?$/.test(str);
};

const addItemstoCart : RequestHandler = async(req, res) => {
    try {

        let token = req
            ?.headers
                ?.token;
        let restaurantID : any = req.body
            ?.restaurantID;
        let cartItems : TopcartItems = req
            ?.body;
        if (!token || !restaurantID) {
            res
                .status(400)
                .json({detail: "Missing parameters."});
            return;
        };

        let tokendata = await decodeToken(token);
        if (!tokendata || tokendata
            ?.error) {
            res
                .status(400)
                .json({detail: "error while reading token."});
            return;
        };
        let userid : number = tokendata
            ?.id;
        let userdisplayname : string = tokendata
            ?.displayname;
        let userData = await myDataSource
            .getRepository(Tbluser)
            .findOne({
                where: {
                    id: userid,
                    displayname: `${userdisplayname}`
                }
            });
        if (!userData) {
            res
                .status(400)
                .json({detail: "User not found."});
            return;
        };

        let cart = new TblCart();
        cart.customerID = userid;
        cart.restaurantID = restaurantID;
        let savedCart = await myDataSource
            .manager
            .save(cart);
        let cartID = savedCart
            ?.idCart;
        let insertCount = 0;
        cartItems["cartID"] = cartID;
        for (let i = 0; i < cartItems.items.length; i++) {
            let cartItem : cartItemsObject = cartItems.items[i];
            let itemID : number = cartItem
                ?.itemID;
            let ItemName : string = cartItem
                ?.ItemName;
            let costPrice : string | number = cartItem
                ?.costPrice;
            let sellingPrice : string | number = cartItem
                ?.sellingPrice;
            let sellingPricewithTax : string | number = cartItem
                ?.sellingPricewithTax;
            let Taxable : boolean = cartItem
                ?.Taxable;
            let quantity : string | number = cartItem
                ?.quantity;

            if (isItNumber(quantity) && isItNumber(sellingPricewithTax) && isItNumber(sellingPrice) && isItNumber(costPrice) && Taxable && sellingPricewithTax && itemID && ItemName && costPrice && sellingPrice) {
                costPrice = parseFloat(costPrice);
                sellingPrice = parseFloat(sellingPrice);
                sellingPricewithTax = parseFloat(sellingPricewithTax);
                quantity = parseFloat(quantity);

                let menudata = await myDataSource
                    .getRepository(TblMenu)
                    .findOne({
                        where: {
                            idMenu: itemID,
                            restaurantID: restaurantID
                        }
                    });

                if (menudata) {
                    let cartitementity = new TblCartItems();
                    cartitementity.cartID = cartID
                    cartitementity.itemID = itemID;
                    cartitementity.ItemName = ItemName;
                    cartitementity.costPrice = costPrice;
                    cartitementity.sellingPrice = sellingPrice;
                    cartitementity.sellingPricewithTax = sellingPricewithTax;
                    cartitementity.Taxable = Taxable;
                    cartitementity.quantity = quantity;
                    await myDataSource
                        .manager
                        .save(cartitementity)
                        .then(async(e) => {
                            cartItems.items[i]["idCartitem"] = e.idCartitem;
                        });
                        insertCount++;
                };
            }
        };

        if (insertCount === 0) {

            await myDataSource
                .createQueryBuilder()
                .delete()
                .from(TblCart)
                .where({idCart: cartID})
                .execute();
            res
                .status(400)
                .json({"detail": "Couldn't save items to cart. Make sure that the restaurant ID is correct."});
            return;
        };

        res
            .status(200)
            .json(cartItems);
        return;
    } catch (error) {
        res
            .status(500)
            .json({"error": error});
        return;
    };
};

export {addItemstoCart};