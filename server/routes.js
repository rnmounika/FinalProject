const express = require("express")
const { Mongoose } = require("mongoose")
const Budget = require("./models/budget_data") // new
const Users= require("./models/user_data")
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

var randtoken = require('rand-token') 
var refreshTokens = {} 


const secretKey ='My super secret key';
const jwtMW = exjwt({
    secret : secretKey,
    algorithms : ['HS256']
});

// Get all posts
router.post("/budget",jwtMW, async (req, res) => {
    // try {
    //     const email= req.body.email;
    // // const posts = await Budget.find()
    // const posts = await Budget.findOne({email:email})
	// res.send(posts)
    // } catch (error) {
    //     console.log("error")
    // }
    const email= req.body.email;
    Budget.find({email:email})
    .then((data)=>{
        // console.log(data)
        res.json(data);
        // mongoose.connection.close()
    })
    .catch((ex)=>{
        console.log(ex)
    })
	
})
// router.get("/login", async (req, res) => {
    
// 	const posts = await Budget.find()
// 	res.send(posts)
// })


function transformDate()
{
 var currentDate = new Date();

var date = currentDate.getDate();
var month = currentDate.getMonth(); 
var year = currentDate.getFullYear();

var dateString = year + "-" +(month + 1) + "-" +date ;
return dateString;
}
 
router.post("/login", (req, res) => {
    // const{username,password} = req.body;
    const username= req.body.username;
    const password = req.body.password;
      
   Users.findOne({email:username})
    .then((data)=>{
    //  console.log(data)
        if(data == null)
        {
            return res.status(400).send({
                message: "Not Valid"
              });
        }
      
        else
        {
            dbPassword= data.password;
            var result = bcrypt.compareSync(password, dbPassword);
            // console.log(result)
            if (result) {
             console.log("Password correct");
             let token =jwt.sign({username : data.email }, secretKey,{expiresIn: '120s'});
             var refreshToken = randtoken.uid(256) 
              refreshTokens[refreshToken] = username
            //  res.json({token: 'JWT ' + token, refreshToken: refreshToken}) 
             res.status(200).json({
                 success :true,
                 err : null ,
                 token,
                 refreshToken: refreshToken
             });
         } else {
              console.log("Password wrong");
            res.json({
                success :false,
                message: "Not Valid"
               
            });
         }
        }
       
        
        // mongoose.connection.close()
    })
    .catch((ex)=>{
        console.log(ex)
    })
  
    

    
})
router.post('/token', function (req, res, next) {
    var username = req.body.email
    var refreshToken = req.body.refreshToken
    console.log(username+ " "+refreshToken)
    if((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == username)) {
        // let token =jwt.sign({username : data.email }, secretKey,{expiresIn: '6000s'});
      var token = jwt.sign({username :username }, secretKey, { expiresIn: '120s' })
    //   res.json({token:token})
    console.log(token)
    res.status(200).json({
        success :true,
        err : null ,
        token,
        // refreshToken: refreshToken
    });
    }
    else {
      res.send(401)
    }
  })

  router.post('/token/reject', function (req, res, next) { 
    var refreshToken = req.body.refreshToken 
    if(refreshToken in refreshTokens) { 
      delete refreshTokens[refreshToken]
    } 
    res.send(204) 
  })

router.post("/updateBudget", (req, res) => {
    const email= req.body.email;
    const title = req.body.title;
   const value = req.body.value;
   const expectedBudget = req.body.expectedBudget;
//    console.log(value+"exe  "+expectedBudget)
   let newData = {$set: {value:value,expectedBudget:expectedBudget}};   

   Budget.update({email:email,title:title},newData)
  .then((docs)=>{
    if(docs) {
        console.log(docs)
        res.json({
            success :true,
            err : null 
        });
    } else {
      reject({success:false,data:"no such user exist"});
    }
 }).catch((err)=>{
    reject(err);
})
    // Budget.findOne({email:email,title:title})
    // .then((data)=>{
    //     console.log(data)
    //     res.json({
    //         success :true,
    //         err : null 
    //     });
    // })
    // .catch((connectionError)=>{
    //     console.log(connectionError)
    // })
    
})

router.post("/deleteBudget", (req, res) => {
    const email= req.body.email;
    const title = req.body.title;
    Budget.deleteOne({email:email,title:title})
    .then((data)=>{
        console.log(data)
        res.json({
            success :true,
            err : null 
        });
    })
    .catch((connectionError)=>{
        console.log(connectionError)
    })
    
})

router.post("/register",async (req, res) => {
    // const{username,password} = req.body;
    console.log(req.body);
     const email= req.body.email;
     const password = req.body.password;
     const firstName = req.body.firstName;
     const lastName = req.body.lastName;
    const encryptedPwd = await bcrypt.hash(password.toString(), 10);
    // //   const dat= transformDate();
//     firstName: 'tapas',
//   lastName: 't',
//   email: 't@gmail.com',
//   password: '123456',
//   confirmPassword: '123456'
    
    let newUser = new Users({email:email,password:encryptedPwd,firstName:firstName,lastName:lastName});
    Users.insertMany(newUser)
    .then((data)=>{
        console.log("Registration successful")
        res.json({
            success :true,
            err : null 
        });
        // mongoose.connection.close()
    })
    .catch((connectionError)=>{
        res.json({
            success :false,
            err : connectionError 
        });

        console.log("Registration failed")
    })
})

// router.post('/token', jsonParser,(req, res) => {
//     const refreshToken = req.body.token
//     if (refreshToken == null) return res.sendStatus(401)
//     if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403)
//         const accessToken = generateAccessToken({ email: user.email })
//         res.json({ accessToken: accessToken })
//     })
// })

router.post("/addBudget", (req, res) => {
	const budgetData = new Budget({
		title: req.body.title,
        value: req.body.value,
        color: req.body.color,
        email:req.body.email,
        expectedBudget: req.body.expectedBudget
	})
    // budgetData.save().then( console.log("Budget is save successfully"),
    // res.send(budgetData)).catch(err=> handleError(err))
    // res.send(budgetData)
    // budgetData.save().then(data =>{
    //     req.send(200).data("saved");
    // }).catch(e =>{
    //     req.send(500).send(e.message);
    // }) 
    // Budget.insertMany(budgetData)
    // .then((data)=>{
    //     console.log("Budget added successful")
    //     res.json({
    //         success :true,
    //         err : null 
    //     });
    //     // mongoose.connection.close()
    // })
    // .catch((connectionError)=>{
    //     res.json({
    //         success :false,
    //         err : connectionError 
    //     });

    // })

    budgetData.save()
    .then(() => res.status(200).json({
        success :true,
        err : null 
    }),
    )
    .catch((err) => res.status(400).json("Error: " + err));
//  res.send(budgetData)
    // console.log("Data added from postman")
    
})
module.exports = router