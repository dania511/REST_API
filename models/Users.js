let mongoose=require('mongoose')
let userschema=new mongoose.Schema({
    pseudo:String,
    pass_word:String,
    age: Number,
})
module.exports=mongoose.model('Users',userschema)