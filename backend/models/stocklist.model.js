const mongoose = require('mongoose');

const ReturnScheme = new mongoose.Schema({

    stock:{
        type: String,
        required:true,
    },

    RETURN:{
        type:Number,
       // required:true,
    },

    pic:{
        type:String,
       // required:true,
    }
});

const StockList = mongoose.model('StockList',ReturnScheme);

module.exports = StockList;