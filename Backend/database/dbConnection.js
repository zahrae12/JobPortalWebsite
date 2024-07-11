import mongoose from "mongoose";

export const dbConnection =()=>{
    mongoose.connect(process.env.DB_STRING,{
        dbName:"JOB_PORTAL_WEBSITE",
    }).then(()=>{
        console.log('connected to database!')
    }).catch((err)=>{
        console.log(`some error accured while connecting to database${err}`);
    });
};
