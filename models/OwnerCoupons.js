const mongoose=require('mongoose');
const autoIncrement=require('mongoose-auto-increment');

const OwnerCouponsSchema = mongoose.Schema({
   
    userId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
      listCoupons:[{
        type:Number,
        ref:"coupons"
      }]
  });

autoIncrement.initialize(mongoose.connection);
OwnerCouponsSchema.plugin(autoIncrement.plugin,'ownercoupons');
module.exports = mongoose.model("ownercoupons", OwnerCouponsSchema);