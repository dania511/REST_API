const express=require('express')
const app=express()
const mongoose=require('mongoose')
let userModel=require('./models/Users')
require('dotenv').config({path:'./config/.env'})
const PORT=5000
app.use(express.json())
app.listen(PORT,()=>console.log(`server is running on port: http://localhost${PORT}`));


//connect with DB
mongoose.connect(process.env.MONGO_URI,
     { useNewUrlParser: true,  useCreateIndex: true,useUnifiedTopology: true })
.then(() => {console.log('Database connection successful')})
.catch(err => {console.error('Database connection error')})

//create my DB
userModel.create([{
    pseudo:"AZZARO_11",
    pass_word:"741963",
    age:35
},
{
    pseudo:"Tiger4",
    pass_word:"789456",
    age:44
},
{
    pseudo:"IMEN8",
    pass_word:"654987",
    age:64
}
,
{
    pseudo:"Sar_ra",
    pass_word:"123456",
    age:20
}],(err)=>{
    if (err){console.error(err)}
})

app.get('/users',function(req,res){userModel.find().then(doc=>res.send(doc)).catch(err=>console.error(err))})
app.post('/add_User',function(req,res){
    let newuser= new userModel({
        pseudo:req.body.pseudo,
        pass_word:req.body.pass_word,
        age:req.body.age});
  //save added user      
newuser.save().then(doc=>res.send(doc)).catch(err=>console.error(err))})
  //update 
app.put('/update/:id',function(req,res){userModel.updateOne({_id:req.params.id},{ $set: { ...req.body }}).then(doc=>res.send(doc)).catch(err=>console.error(err))})
app.delete('/delete/:id',function(req,res){userModel.deleteOne({_id:req.params.id}).then(doc=>res.send(doc)).catch(err=>console.error(err))
})