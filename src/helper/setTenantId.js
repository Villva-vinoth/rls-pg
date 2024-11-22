const { QueryTypes } = require("sequelize")
const { sequelize } = require("../db/config/db.config")

module.exports = {
    setTenantId :async (req,res,next)=>{
       try {
        const data = req.get('tenantId')
        const isadmin = req.get('isadmin')

        const setID = await sequelize.query(`set app.tenant =:tenantId`,{
            type:QueryTypes.SELECT,
            replacements:{tenantId:data}
        })

        if(isadmin != 1){
            const setROle = await sequelize.query(`set role appuser`,{
                type:QueryTypes.SELECT
            })

            // only we can set the permissions in roles 
        }
        else{
            const setROle = await sequelize.query(`set role postgres`,{
                type:QueryTypes.SELECT
            })

            // user has a default bypass mechanism
        }
       
        const current = await sequelize.query(`select current_user`,{
            type:QueryTypes.SELECT
        })

        console.log("current",current)
        
        next();

        
       } catch (error) {
        res.status(500).json({
            success:false,
            message:"Tenant id is Not Found !" || "Internal Server Error !"
        })
       }
    },
    resetTenantID : async ()=>{
        try {
            const resetId = await sequelize.query('reset app.tenant',{
                type:QueryTypes.SELECT
            })
            return resetId
        } catch (error) {
            console.log("err",error)
        }
    },
    getTenantId : async ()=>{
        try {
            const getId = await sequelize.query(`select current_setting('app.tenant')`,{
                type:QueryTypes.SELECT
            })
            return getId
        } catch (error) {
            console.log("err",error)
            return  res.status(500).json(
                {
                    success:true,
                    message:"Tenant Id is Not Found !" || "Internal Server Error !"
                }
            )
        }
    },
    
}


// setTenantId is a middleware for setting the tenant Id and users 
// resetTenantId after the transaction is reset 
// getTenantId is function that the tenant id is set or not

