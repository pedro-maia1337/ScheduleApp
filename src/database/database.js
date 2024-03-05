import mongoose from 'mongoose'
import 'dotenv/config'

const connectDatabase = async () => {
    try{
        await mongoose.connect(process.env.CONNECTIONURL)
        console.log("MongoDB connected!")
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error}`)
        throw error
    }
}

export default connectDatabase

