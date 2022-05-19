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
    const {city,district,ward,street,...rest}=req.body;
    const newaddress={};


    if(city) newaddress.city=city;
    if(district) newaddress.district=district;
    if(ward) newaddress.ward=ward;
    if(street) newaddress.street=street;

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
        res.json(user);
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
})





module.exports=router;