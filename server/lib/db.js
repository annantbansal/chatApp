import mongoose from 'mongoose';
//function to connect to mongodb databse 
export const connectDB=async()=>{
    try {
        mongoose.connection.on('connected',()=>console.log('DB connected'));
        await mongoose.connect(`${process.env.MONGODB_URL}`)
    } catch (error) {
        console.log(error);
    }
}