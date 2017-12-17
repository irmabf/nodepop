'use strict';

const mongoose= require('mongoose');

const Ad= mongoose.model('Ad',{
    name: {
        type:String,
        index:true, 
        required:true
    },
    sale: {
        type:Boolean,
        trim:true}
        ,
    price:{
        type:Number,
        minlength:1,
        trim:true
    },
    pic:{
        type:String,
        index:true,
        trim:true
    },
    _seller:{
        required:true,
        type:mongoose.Schema.Types.ObjectId
    },
    tags: [String]

});

module.exports = {Ad};
