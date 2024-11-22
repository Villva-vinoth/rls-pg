const express = require('express')
const cors = require('cors')
const { sequelize } = require('./db/config/db.config')
const baseRouter = require('./helper/index')
const port = 4000
const app = express()

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send({
        message:"Server is Live !"
    })
})

app.use('/api/v1',baseRouter);

const initialize = async () =>{
    try {
        await sequelize.sync()
        console.log("Sequelize Connected to Pg !")
        app.listen(port,()=>{
            console.log(`server is running on the port ${port}`);
        })
        
        return {sequelize}
    } catch (error) {
        console.log('sequelize connection Failed !',error)
    }
    
}


const errorHandler = (err,req,res,next)=>{
   
    if(err){
        console.log(err)
        return res.json({
            success:false,
            message:err.message || "Internal Server Error !"
        })
    }

    if(res){
        console.log(res,"res")
    }

    next();

}

app.use(errorHandler)

initialize();




