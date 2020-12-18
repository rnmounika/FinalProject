const mongoose = require('mongoose');
const nameSchema = new mongoose.Schema({
    email: {
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    password: {
        type:String,
        required:true        
    },
    firstName: {
        type:String,
        required:true             
    },
    lastName: {
        type:String,
        required:true            
    }

},{collection: 'Users'})

// function colorValidator (v) {
//     if (v.indexOf('#') == 0) {
//         if (v.length >= 6) {  // #f0f0f0
//             return true;
//         } 
//     }
//     return false;
// };

module.exports =mongoose.model('Users',nameSchema)