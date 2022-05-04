/**
 * This class to handle database of user 
 */

class UserService
{

    async createUser(req,res){

    }

    async findUser(email)
    {
        const user= await User.findOne({email:email});
        return user;
    }

    async createUser(user)
    {
        await user.save();
    };
    
    async updateUser(userUpdate)
    {
        const {fistname,lastname,role,status,date,month,gender,phonenumber}=userUpdate;

        const result=await User.findByIdAndUpdate(req.params.userId,{$set:{"fistname":fistname,
        "lastname":lastname,
        "gender":gender,
        "role":role,
        "status":status,
        "date":date,
        "month":month,
        "phonenumber":phonenumber}});

        const userResult= await User.findById(req.params.userId);

        return userResult;
    };

    async deleteUser(userId)
    {
        await User.findByIdAndUpdate(userId,{$set:{status:false}});

        const result=await User.findById(userId);
        
        return result;
    }

    async findUserByName(requestBody)
    {
        const s = requestBody.nameSearch;
        const regex = new RegExp(s, 'i');
        
        
        let query=User.find({ $or: [ {"fistname":{$regex: regex}}, {"lastname":{$regex: regex}} ] });
        if(req.query.sort)
        {
            query=query.sort("fistname");
    
        }
       
        const users=await query;

        return users;
    }
}

module.exports=new UserService();