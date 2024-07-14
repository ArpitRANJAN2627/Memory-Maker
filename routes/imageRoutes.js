const express=require('express')
const router =express.Router();
const Image=require('../model/Image')
const requireLogin=require('../middlewares/requireLogin')
const multer  = require('multer')
const {cloudinary,storage}=require('../cloudConfig')
const upload = multer({ storage })
const isAuthor=require('../middlewares/isAuthor')


//get all img

router.get('/',requireLogin,async (req,res)=>{
    const images= await Image.find({author:req.user._id});
   
    res.render('home',{images});
})
//show new img fom
router.get('/add',requireLogin,(req,res)=>{
    res.render('add');
})

//add new image
router.post('/add',requireLogin,upload.single('imgUrl'),async(req,res)=>{
    const {des,title}=req.body
    const author=req.user._id
     await Image.create({imgUrl:req.file.path,des,title,author});
    res.redirect('/');
})

//get show page

router.get('/item/:id',requireLogin,isAuthor,async(req,res)=>{
    const {id}=req.params
   const image= await Image.findById(id);



    res.render('show',{image})
})

//get edit form
router.get('/item/edit/:id',requireLogin,isAuthor,async(req,res)=>{
    const {id}=req.params
    const image=await Image.findById(id)
    res.render('edit',{image});
})

//update image
router.patch('/item/edit/:id',requireLogin,isAuthor,async(req,res)=>{
    try{
    const {imgUrl,des,title}=req.body
    const {id}=req.params;
    await Image.findByIdAndUpdate(id,{imgUrl,des,title});
    req.flash('success','Updated Image Successfully ')
    res.redirect(`/item/${id}`)
    }
    catch(e){
        req.flash('error','something went wrong ')
    }
})


//delete

router.delete('/item/:id',requireLogin,isAuthor,async(req,res)=>{
    try{
    const {id}=req.params;
    await Image.findByIdAndDelete(id);
    req.flash('success',' Deleted  Image Successfully ')
    res.redirect('/')
    }
    catch(e){
        req.flash('error','something went wrong ')
    }
})

module.exports=router;