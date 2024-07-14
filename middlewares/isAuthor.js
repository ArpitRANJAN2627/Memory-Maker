const Image=  require('../model/Image')


const isAuthor = async(req, res, next) => {
    const { id } = req.params;
    const product = await Image.findById(id);

    if (product.author && product.author.equals(req.user._id)) {
        return next();
    }
    req.flash('error', 'You are not authorised to do that');
    return res.redirect('/');
}

module.exports=isAuthor;