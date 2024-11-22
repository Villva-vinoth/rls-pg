const AdminuserModel = require('../../db/models/adminUser.model.js')

module.exports ={
    createUser:async(data,callback)=>{
        try {
            const exists = await AdminuserModel.findOne({
                where:{
                    user_name:data.user_name
                }
            })

            console.log("exists",exists)
            if(exists){
                throw new Error('User already have Account !');
            }

            const users = await AdminuserModel.create(data)
            return callback(null,users);

        } catch (error) {
            callback(error)
        }
    },
    getOne: async (data,callback)=>{
        try {
            console.log(" requesting user",data.id)
            const getOne = await AdminuserModel.findOne(
                {
                    where: {
                        id: data.id
                    },
                    attributes:{
                        exclude:['password','updated_at','deletedAt']
                    }
                }
            )
            if(!getOne){
                throw new Error('User Not Found !')
            }
            callback(null,getOne)
        } catch (error) {
            callback(error)
        }
    },
    login: async(data,callback)=>{
        try {
            const users = await AdminuserModel.findOne(
               { 
                where:{
                    user_name:data.user_name,
                },
                attributes:['password','id','user_name']
            }
            )
            if(!users){
                throw new Error("Username Invalid!")
            }
            callback(null,users)
        } catch (error) {
            callback(error);
        }
    }
}