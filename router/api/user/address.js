const express=require("express");
const router=express.Router();
const jwt=require('jsonwebtoken');
const bcrypt=require("bcrypt");
const validatonUser=require("../../../midleware/validationUser");
const User=require("../../../models/Users");
const { body } = require("express-validator");
const auth = require("../../../midleware/auth");


/**Add address 
 * API: user/address
 */

router.post("/",[auth,validatonUser.checkValidAddress],async(req,res)=>{
    const {city,district,ward,gender,nameCustomer,detailAddress,phoneNumber,...rest}=req.body;
    const newaddress={};


    if(city) newaddress.city=city;
    if(district) newaddress.district=district;
    if(ward) newaddress.ward=ward;
    if(gender) newaddress.gender=gender;
    if(nameCustomer) newaddress.nameCustomer=nameCustomer;
    if(detailAddress) newaddress.detailAddress=detailAddress;
    if(phoneNumber) newaddress.phoneNumber=phoneNumber;
    
    try{
        const user=await User.findById(req.user.id).select("-password");
        if(user.addresses.length===0)
        {
            newaddress.default=true;
        }
        else
        {
            newaddress.default=false;
        }
        user.addresses.unshift(newaddress);

        await user.save();
        res.status(200).json(user);
    }
    catch(error)
    {
        console.log(error);
        res.status(400).json({error:[{"msg":error}]});
    }
})

router.delete("/:addressid",auth,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select("-password");
        console.log(user.addresses);
        const removeIndex=user.addresses.map(item=>item.id).indexOf(req.params.addressid);

        user.addresses.splice(removeIndex,1);
        //If remove array have just one addresses
        if(user.addresses.length!==0)
        {
            const valuedefault=user.addresses.reduce((previoursvalue,element)=>{
                if(element.default===true)
                {
                    previoursvalue++;
                }
                return previoursvalue;
            },0);
            if(valuedefault===0)
            {
                user.addresses[0].default=true;
            }
        }
        await user.save();
        res.status(200).json(user);
    }
    catch(error)
    {
        console.log(error);
        res.status(400).json({error:[{"msg":error}]});
    }
})

router.get("/",auth,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select("addresses").sort('default');
        res.json(user);
    }
    catch(error)
    {
        res.status(400).json({error:[{"msg":error}]});
    }
});


router.put("/:addressid",auth,async(req,res)=>{

    let addressId=req.params.addressid;
    const user=await User.findById(req.user.id).select("-password");

    const index=user.addresses.map(item=>item.id).indexOf(addressId);

    if(index<0)
    {
        res.status(400).json({"msg":"Address is null", "status":false});
    }

    const {city,district,ward,gender,nameCustomer,detailAddress,phoneNumber, isdefault,...rest}=req.body;

    if(city) user.addresses[index].city=city;
    if(district) user.addresses[index].district=district;
    if(ward) user.addresses[index].ward=ward;
    if(gender) user.addresses[index].gender=gender;
    if(nameCustomer) user.addresses[index].nameCustomer=nameCustomer;
    if(detailAddress) user.addresses[index].detailAddress=detailAddress;
    if(phoneNumber) user.addresses[index].phoneNumber=phoneNumber;


    user.addresses[index].default=isdefault;
    if(isdefault)
    {
        for(let i=0;i<user.addresses.length;i++)
        {
            if(user.addresses[i].id !=addressId)
            {
                user.addresses[i].default=false;
            }
        }
    }
    else
    {
        const removeIndex=user.addresses.map(item=>item.default).indexOf(true);

        if(removeIndex<0)
        {
            user.addresses[0].default=true;
        }
    }

    await user.save();
    res.status(200).json(user);
})





module.exports=router;