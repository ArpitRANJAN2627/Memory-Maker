const requireLogin=(req,res,next)=>{
    try{
    if(!req.isAuthenticated()){
        req.flash('success','You need to login first')
        return res.redirect('/login')
    }
    next();
}
catch(e){
    req.flash('error','something went wrong ')
}
}


module.exports=requireLogin