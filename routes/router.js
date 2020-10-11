const express = require('express');
const { check } = require('express-validator');
const router = express.Router()
let userController = require('../controllers/user_controller')
let categoryController = require('../controllers/category_controller')
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







module.exports = router;
