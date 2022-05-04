
const Size=require("../../models/Size");
const Users = require("../../models/Users");
const ItemOrder=require("../../models/ItemOrder");
const Order=require("../../models/Order");
const sendEmail=require("../../services/sendMail");
const { check } = require("express-validator");
const SaleController=require("../../controllers/product/Sale");
class OrderController{


    async addItemtoOrder(req,res)
    {
        const userOrder=await Users.findById(req.body.userId);
    if(!userOrder)
    {
        return res.status(400).json(new AppError("User havem't exist"));
    }
    const items=req.body.items;
    if(items.length===0)
    {
        return res.status(400).json(new AppError("No item order"));
    }
    let itemIds=[];

    await this.addItemList(items,itemIds);
    const orderAdd=new Order();
    orderAdd.userId=req.body.userId;
    orderAdd.totalPrice=req.body.totalPrice;
    orderAdd.items.unshift(...itemIds);
    orderAdd.addressrecevie=req.body.addressrecevie;
    orderAdd.address=req.body.address;
    orderAdd.paymentId=req.body.paymentId;
    orderAdd.isPaypal=req.body.isPaypal;
    await orderAdd.save();
    
    const message={ // thiết lập đối tượng, nội dung gửi mail
        from: 'Ecomerce web',
        to: userOrder.email,
        subject: 'Order success',
        text: "You recieved message from",
        html: `<p>you have order complete. Please waiting admin check order. Your order have total price ${orderAdd.totalPrice} <p>`
    }
    sendEmail(message);
    // console.log(message);
    return res.status(200).json(orderAdd);
    }

    async addItemList(items,addItemList)
    {
        for(let i=0;i<items.length;i++)
        {
            const itemAdd=new ItemOrder(items[i]);
            const size= await Size.findById(items[i].sizeId);
            const colorName=itemAdd.colorName;
            const colors=size.colors;
            for(let jj=0;jj<colors.length;jj++)
            {
                if(colors[jj].colorName==colorName)
                {
                    if(colors[jj].quantity>itemAdd.quantity)
                    {
                        size.colors[jj].quantity=colors[jj].quantity-itemAdd.quantity;
                    }
                }

            }
            
            await size.save();
            let saleId=items[i].saleId;
            console.log(saleId)
            let applySale= await SaleController.applySale(saleId, itemAdd.quantity);
            if(applySale)
            {
                await itemAdd.save();
                addItemList.unshift(itemAdd._id);    
            }
            
        }
    }
}

module.exports=new OrderController;