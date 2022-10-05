const mongoose = require('mongoose')

const StoreData = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    ISBN:{
        type:String,
        required:true,
    },
    Author:{
        type:String,
        required:true,
    },
    Price:{
        type:Number,
        required:true,
    },
    Counter_Of_Origin:{
        type:String,
    },
    Number_Of_Pages:{
        type:Number,
    },
    Year:{
        type:Number,
        required:true,
    },
    Stock_available:{
        type:Number,
        required:true,
    },
    Digital_Format_Available:{
        type:Boolean,
        // default:false,
        required:true
    }



})

const Store = mongoose.model('bookstore' , StoreData)
module.exports = Store