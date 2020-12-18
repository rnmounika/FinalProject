const mongoose = require('mongoose');
const nameSchema = new mongoose.Schema({
    // id:{
    //     type:Number,
    //     required:true,
    //     unique:true
    // },
    title: {
        type:String,
        trim:true,
        required:true
    },
    value: {
        type:Number,
        required:true,
        
    },
    color: { 
        type: String, 
        minlength:6,
        // validate: [colorValidator, 'not a valid color'],
        required: true,
     },
     email: { 
        type: String, 
        required: true,
     },
     expectedBudget: { 
        type: Number ,
         required: true,
     },

},{collection: 'BudgetData'})

// function colorValidator (v) {
//     if (v.indexOf('#') == 0) {
//         if (v.length >= 6) {  // #f0f0f0
//             return true;
//         } 
//     }
//     return false;
// };

module.exports =mongoose.model('BudgetData',nameSchema)