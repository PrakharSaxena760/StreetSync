import mongoose from "mongoose"

const ConnectDb = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODBURI}`)
        console.log("db connnected successfully")
    } catch (error) {
        console.log("error occured while connecting to Db")
        console.log(error)
    }
}

export {ConnectDb}