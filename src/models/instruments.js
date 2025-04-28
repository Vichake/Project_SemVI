import mongoose from "mongoose";

const instrumentSchema = new mongoose.Schema({
    instrumentName:{
        type:String,
        required:true
    },
    instrumentCategory:{
        type:String,
        required:true,
        enum: ['Farm Equipment', 'Heavy Machinery', 'Tools', 'Irrigation'],
    },
    instrumentStatus:{
        type:String,
        required:true,
        enum: ['Active', 'Mantainance', 'Inactive'],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true
    },
    lastServiceDate:{
        type:Date,
        required:true
    }

}); 