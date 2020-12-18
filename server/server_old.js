const express = require('express');
const cors = require('cors');
const app = express();
const port =3000;

app.use(cors());
// app.use('/',express.static('public'));

 const budget =require('./body.json');
// {myBudget: [
//     {
//         title: 'Eat out',
//         budget: 25
//     },
//     {
//         title: 'Rent',
//         budget: 375
//     },
//     {
//         title: 'Grocery',
//         budget: 100
//     }

// ]};


//Removing static content
// app.get('/hello',(req, res) =>{
//     res.send('Hello World 1');
// });
app.get('/budget',(req, res) =>{
    res.json(budget);
});
app.listen(port , () =>{
    console.log(`API servered at http://localhost:${port}`);
});