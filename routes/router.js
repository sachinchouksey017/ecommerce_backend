const express = require('express');
const { check } = require('express-validator');
const router = express.Router()
let userController = require('../controllers/user_controller')
let categoryController = require('../controllers/category_controller')
let productController = require('../controllers/product_controller')
let authenticate = require('../middleware/authentication')
// router.get('/get', userController.register),
router.post('/register', [
    check('firstName').notEmpty().withMessage('firstName is required field')
        .isLength({ min: 3, max: 20 }).withMessage('firstName min length 3 and max length 20')
        .isAlpha().withMessage('firstName is not valid'),
    check('lastName').notEmpty().withMessage('lastName is required field')
        .isLength({ min: 3, max: 20 }).withMessage('lastName min length 3 and max length 20')
        .isAlpha().withMessage('lastName is not valid'),
    check('email').notEmpty().withMessage('email is required field')
        .isEmail().withMessage('email is not valid '),
    check('password').notEmpty().withMessage('password is required field')
        .isLength({ min: 3, max: 20 }).withMessage('password min length 3 and max length 20')

],
    userController.register),

    router.post('/login', [
        check('email').notEmpty().withMessage('email is required field')
            .isEmail().withMessage('email is not valid '),
        check('password').notEmpty().withMessage('password is required field')
            .isLength({ min: 3, max: 20 }).withMessage('password min length 3 and max length 20')

    ],
        userController.login),
    router.post('/forgotPassword', [
        check('email').notEmpty().withMessage('email is required field')
            .isEmail().withMessage('email is not valid ')
    ],
        userController.forget),
    router.post('/resetPassword', authenticate, [
        check('password').notEmpty().withMessage('password is required field')
            .isLength({ min: 3, max: 20 }).withMessage('password min length 3 and max length 20')
    ],
        userController.reset),

    // catergory routes
    router.post('/category', [check('categoryName').notEmpty().withMessage('categoryName is required field')]
        , authenticate, categoryController.add)

router.get('/category', categoryController.getAllCategory)
router.delete('/category/:categoryId', authenticate, categoryController.deleteCategory)
router.post('/categoryUpdate', [check('categoryName').notEmpty().withMessage('categoryName is required field')
    , check('categoryId').notEmpty().withMessage('categoryId is required field')
]
    , authenticate, categoryController.updateCategory)


router.post('/category', [check('categoryName').notEmpty().withMessage('categoryName is required field')]
    , authenticate, categoryController.add)
router.post('/category', [check('categoryName').notEmpty().withMessage('categoryName is required field')]
    , authenticate, categoryController.add)

// productName: body.productName,
// categoryName: body.categoryName,
// price: body.price,
// img: body.img,
// quantity: body.quantity,
// product routes
router.post('/product', [
    check('productName').notEmpty().withMessage('productName is required field'),
    check('price')
        .notEmpty()
        .withMessage('price is required field')
        .isNumeric()
        .withMessage('price must be in number'),
    check('quantity')
        .notEmpty()
        .withMessage('quantity is required field')
        .isNumeric()
        .withMessage('quantity must be in number'),
    check('categoryId')
        .notEmpty()
        .withMessage('categoryId is required field')
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage('categoryId is not valid')



], productController.addProduct)
router.get('/product', productController.get)
router.get('/product/:categoryId', productController.filterByCategory)
router.get('/search', productController.get)
router.delete('/product', productController.deleteProduct)
router.post('/productUpdate',
    [
        check('price')
            .optional()
            .isNumeric()
            .withMessage('price must be in number'),
        check('quantity')
            .optional()
            .isNumeric()
            .withMessage('quantity must be in number'),
        check('productId')
            .notEmpty()
            .withMessage('productId is required field')
            .matches(/^[0-9a-fA-F]{24}$/)
            .withMessage('productId is not valid')

    ],
    productController.updateProduct)


// sort routes

router.get('/sortByDate', productController.sortByDate)


module.exports = router;
