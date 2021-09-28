const express = require('express');
const router = express.Router();


const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")
const {bulkupload,getProductById,createProduct,getProduct,photo,deleteProduct,updateProduct,getAllProducts
    ,getCategories,searchProduct,addreview,deletereview,updatereview,like} = require("../controllers/product")


router.param("userId",getUserById);
router.param("productId",getProductById);



// Routes
router.get('/searchproduct',searchProduct)

router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct); //,isSignedIn,isAuthenticated

// READ

router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",photo);

// UPDATE
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct)//router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct)

// DELETE 
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)//router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)

// Product List
router.get("/products",getAllProducts)


router.get("/products/categories",getCategories)
router.post("/bulkupload/:userId",isSignedIn,isAuthenticated,isAdmin,bulkupload)

//likes and review on the product
router.post('/review/:userId/:productId',isSignedIn,isAuthenticated,addreview)
router.patch('/review/:userId/:productId',isSignedIn,isAuthenticated,updatereview)
router.delete('/review/:userId/:productId',isSignedIn,isAuthenticated,deletereview)

router.post('/likeproduct/:userId/:productId',isSignedIn,isAuthenticated,like)

module.exports = router;




