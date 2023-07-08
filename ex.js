// import { MongoClient } from "mongodb";
const express=require("express");
const app=express();
var cors = require('cors')
const mc= require("mongodb")
const uri = "mongodb+srv://bhargav:bhargav%40227@cluster0.r0cqany.mongodb.net/?retryWrites=true&w=majority";
const client = new mc.MongoClient(uri);
app.use(cors())
function genPassword() {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 10;
    var password = "";
 for (var i = 0; i <= passwordLength; i++) {
   var randomNumber = Math.floor(Math.random() * chars.length);
   password += chars.substring(randomNumber, randomNumber +1);
  }
      return ({pass:password})
 }

 async function insert(d){
    const db = client.db("numbers");
    const coll = db.collection("pass")
    await coll.insertOne(d)
 }
 app.get("/",(req,res)=>{
    const doc =genPassword();
    res.json(doc);
    insert(doc);
 })
 app.listen(3000,()=>{console.log("hi");})