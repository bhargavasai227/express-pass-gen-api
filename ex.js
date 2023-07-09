// import { MongoClient } from "mongodb";
const express=require("express");
const app=express();
var cors = require('cors')
const mc= require("mongodb")
const uri = "mongodb+srv://bhargav:bhargav%40227@cluster0.r0cqany.mongodb.net/?retryWrites=true&w=majority";
const client = new mc.MongoClient(uri);
const db = client.db("numbers");
const coll = db.collection("pass")
app.use(cors())

function genPassword(len) {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = len;
    var password = "";
      for (var i = 0; i <= passwordLength; i++) {
         var randomNumber = Math.floor(Math.random() * chars.length);
          password += chars.substring(randomNumber, randomNumber +1);
        }
      return ({pass:password})
 }

 async function insert(d){

    await coll.insertOne(d)
 }
 async function find(){
   // const priv = await coll.find({},{"_id":0}).limit(5).toArray();
   return({last:await coll.find({},{"_id":0}).limit(5).sort({_id:-1}).toArray()});
 }
 app.get("/",async function(req,res){
  len=req.query.len;
    const doc = genPassword(parseInt(len));
    const last = await find();
    insert(doc);
    
    res.json({doc,last});
   
    
 })
 app.listen(3000,()=>{console.log("hi");})