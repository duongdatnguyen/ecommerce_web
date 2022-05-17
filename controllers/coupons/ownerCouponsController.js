const User=require("../../models/Users");
const Coupons=require("../../models/Coupons");
const Ownercoupons=require("../../models/OwnerCoupons");
const couponController=require("./couponController");

class ownerCouponsCotroller
{


    async applyOwnerCoupons(req,res)
    {
        let ownercouponsCheck=await Ownercoupons.findOne({userId:req.body.userId});

        if(ownercouponsCheck)
        {
            console.log("Update coupons");
            this.updateOwnerCoupons(ownercouponsCheck,req,res);
        }
        else
        {
            console.log("Add coupons");
            this.createOwnerCoupons(req,res);
        }

    }


    async getCouponsAndApply(req,res)
    {
            const ownerCouponsId=req.query.ownerCouponsId;
            const couponsIdCheck=req.query.couponsId;
            const ownerCoupons=await Ownercoupons.findById(ownerCouponsId);
            if(couponsIdCheck == null)
            {
                res.status(400).json({"message":"Please add coupons apply "});
            }
            else {

            let indexCoupons=ownerCoupons.listCoupons.indexOf(couponsIdCheck);

            if(indexCoupons>=0)
            {
                ownerCoupons.listCoupons.splice(indexCoupons,1)
            }

            await ownerCoupons.save()
            .then(ownerCoupons=> res.status(200).json({"message":"Coupons have approve","ownercoupons":ownerCoupons}))
            .catch(error=>res.status(400).json({"message":"Apply coupons of user is failed","error":error}));
            
        }
    }

    async getAllCouponsOfUser(req,res)
    {
        const userId=req.params.userId;

        const ownerCoupons=await Ownercoupons.find({"userId":userId}).populate("listCoupons");

        if(ownerCoupons ==null)
        {
            const ownerAdd=new OwnerCoupons();
            ownerAdd.userId=userId;
            await ownerAdd.save().then(ownerCoupons=>res.status(200).json({"ownerCoupons":ownerCoupons}));
        }

        res.status(200).json({"ownerCoupons":ownerCoupons});
    }

    async getById(req,res)
    {
        const couponsId=req.params.couponsId;

        const ownerCoupons=await Ownercoupons.findById(couponsId).populate("listCoupons");

        if(ownerCoupons ==null)
        {
            res.status(400).json({"message":"Coupons is null","ownerCoupons":ownerCoupons});
        }

        res.status(200).json({"ownerCoupons":ownerCoupons});
    }


    async updateOwnerCoupons(ownercoupons,data,res)
    {

        const {userId,listCoupons}=data.body;
        let listOwnerCoupons=ownercoupons["listCoupons"];
        console.log(ownercoupons);
        if(listCoupons !=null)
        {
            for (let coupons of listCoupons)
            {
                    if(!listOwnerCoupons.includes(coupons))
                    {
                        listOwnerCoupons.push(coupons);
                    }
            }
        }
        ownercoupons.listCoupons=listOwnerCoupons;
        await ownercoupons.save()
        .then(ownercoupons=>{return res.status(200).json({"message":"Add coupons of user success","ownercoupons":ownercoupons})})
        .catch(error=> {return res.status(400).json({"message":"Add coupons of user is failed","error":error})});
        
    }
    async createOwnerCoupons(data,res)
    {
        let ownercoupons=new Ownercoupons(data.body);

        await ownercoupons.save()
        .then(ownercoupons=>{return res.status(200).json({"message":"Add coupons of user success","ownercoupons":ownercoupons})})
        .catch(error=> {return res.status(400).json({"message":"Add coupons of user is failed","error":error})});;
    }



}

module.exports=new ownerCouponsCotroller;