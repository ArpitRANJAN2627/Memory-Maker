if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express=require('express')
const app=express()
const mongoose=require('mongoose');
const Image=require('./model/Image')

const dbUrl = process.env.DB_URL ||'mongodb://127.0.0.1:27017/memory-maker'


mongoose.connect(dbUrl)
    .then(() => console.log("DB CONNECTED!"))
    .catch((err) => console.log(err));



const imgArr=[{
  imgUrl:'https://media.istockphoto.com/id/1180311775/photo/kodaikanal-tamil-nadu-south-india-peaks-on-the-palani-hills-as-viewed-on-a-misty-morning-from.webp?b=1&s=170667a&w=0&k=20&c=STc-YmBMhgvtjmAPiBu67w5cAWiGSFP9cuaOpMWu7Yw=',
  title:"Nature",
  des:"This is nature image"
},{
    imgUrl:'https://images.unsplash.com/photo-1467830839049-11173e7b2755?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhpbGx8ZW58MHx8MHx8fDA%3D',
    des:"This is Hill image",
    title:"Hill",

},{
    imgUrl:'https://plus.unsplash.com/premium_photo-1667030783942-05351fd6c3fc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9nfGVufDB8fDB8fHww',
    des:"This is Dog image",
    title:"Dog",

},{
    imgUrl:'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2Nob29sfGVufDB8fDB8fHww',
    des:"This is school image",
    title:"School",
},{
    imgUrl:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2h8ZW58MHx8MHx8fDA%3D',
    des:"This is beach image",
    title:"Beach",

},{
    imgUrl:'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    des:"This is Cat image",
    title:"Cat",
}]


async function Seed(){
    await Image.deleteMany({});
    await Image.insertMany(imgArr)
    console.log('product seed successfully')
}

Seed();

app.listen(8000,()=>{
    console.log("server started at 8000")
})


