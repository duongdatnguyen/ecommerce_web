
const Size=require("../../models/Size");
const Users = require("../../models/Users");
const ItemOrder=require("../../models/ItemOrder");
const Order=require("../../models/Order");
const sendEmail=require("../../services/sendMail");
const { check } = require("express-validator");
const SaleController=require("../../controllers/product/Sale");
const MessageSendEmail=require("../../contants/MessageSendEmail");
class OrderController{


    async addQuantityProductAgain(order)
    {
        let itemList=order.items;
        for( let item of itemList)
        {       
            let size= await Size.findOne({"productId":item.productId._id,"nameSize":item.sizeName});
            //let colors=size.colors;
            
            let indexOf= size.colors.findIndex(color => color.colorName==item.colorName);

            if(indexOf >=0)
            {
                        let quantityBefore=size.colors[indexOf].quantity;


                        size.colors[indexOf].quantity=quantityBefore+ item.quantity;
                        await size.save();

            }
        }
    }


    async getByStatus(req,res)
    {
        const statusCheck=req.query.statusCheck;

        const orderList= await Order.find({"status":statusCheck}).populate({path:"items",populate: { path: "productId", select: ["name", "price"] }}).populate({path:"userId",select: ["fistname", "lastname","email"]});

        res.status(200).json({orders:orderList});
    } 




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
    if(req.body.isPaypal)
    {
        orderAdd.paymentMethod="Paypal";
    }
    orderAdd.priceDiscount =req.body.priceDiscount;

    let checkAddItemSucces=this.checkAddItemSuccess(items,itemIds);
    
    if(checkAddItemSucces)
    {
        
        await orderAdd.save();
        //const message=MessageSendEmail(orderAdd);
        // const message={ // thiết lập đối tượng, nội dung gửi mail
        //     from: 'Ecomerce web',
        //     to: "nguyenduongdat0308@gmail.com",
        //     subject: 'Order success',
        //     text: "You recieved message from",
        //     html: `<p>you have order complete. Please waiting admin check order. Your order have total price ${orderAdd.totalPrice} <p>`
        // }
        //sendEmail(message);
        // console.log(message);
        
        //await sendEmail(message);
        const message= await MessageSendEmail.createMessage(orderAdd._id);
                //console.log(message);
  await sendEmail(message);
        return res.status(200).json(orderAdd);
    }
    else{
        let messageError=this.getMessageFailed(items,itemIds);
        return res.status(400).json({"message":"Add order failed","error":messageError});
    }

    
    }

    getMessageFailed(items,itemIds)
    {
        let messageError=[];
        if(itemIds.length==0)
        {
            messageError.push(`Item ${items.length} faild to order`);
        }
        else
        {
        items.forEach(v => {
            if(itemIds.indexOf(v))
            {
                messageError.push(`Product with ID ${v} is out of stock`);
            }
        });
        }
        return messageError;
    
    }

    checkAddItemSuccess(items,itemIds)
    {
       if(items.length==itemIds.length)
       {return true;}
       else
       return false;
       
    }



    async addItemList(items,addItemList)
    {
        let listSizeUpdate=[];
        let listItemAdd=[];
        for(let i=0;i<items.length;i++)
        {
            const itemAdd=new ItemOrder(items[i]);
            const sizeFind= await Size.findOne({"nameSize":items[i].sizeName,"productId":items[i].productId});
            const size= new Size(sizeFind);

            const colorName=itemAdd.colorName;
            let colors= size['colors'];

            for(let jj=0;jj<colors.length;jj++)
            {
                if(colors[jj].colorName==colorName)
                {
                    if(colors[jj].quantity>=itemAdd.quantity)
                    {
                        size.colors[jj].quantity=colors[jj].quantity-itemAdd.quantity;

                        listSizeUpdate.push(size);
                        listItemAdd.push(itemAdd);
                        // await size.save();
                        // await itemAdd.save();
                        // addItemList.unshift(itemAdd._id); 
                    }
                }

            }
            
            
            
        }
        if(listSizeUpdate.length == items.length)
        {
            for(let size of listSizeUpdate)
            {
                await size.save();
                
            }
            for( let item of listItemAdd)
            {
                await item.save();
                addItemList.unshift(item._id); 
            }
        }
    }
}

module.exports=new OrderController;