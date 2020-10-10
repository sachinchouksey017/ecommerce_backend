var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const mailer = require('../middleware/nodeMailer')
var userSchema = new mongoose.Schema({
    'firstName': {
        type: String,
        required: [true, 'FirstName is required']
    },
    'lastName': {
        type: String,
        required: [true, 'LastName is required']
    },
    'email': {
        type: String,
        required: [true, 'Email Required']
    },
    'password': {
        type: String,
        required: [true, 'Password Required']
    },
    'profileUrl': String,
    'profileName': String
}, {
    'timestamps': true
})
var user = mongoose.model('user', userSchema);
function userModel() { }
function hashGenerate(password, callback) {
    bcrypt.hash(password, 10, function (err, hash) {
        // Store hash in your password DB.
        if (err) {
            callback(err);
        } else {
            callback(null, hash)
        }
    });
}
userModel.prototype.register = (req, callback) => {
    console.log('in userSchema register', req);
    user.find({ email: req.email }, (err, data) => {
        if (err) {
            console.log(err);
            err[status] = 500
            callback(err);
        } else {
            var response = {
                "success": true,
                "message": "",
                "data": "",
                status: 200
            }
            if (data.length > 0) {
                response.success = false
                response.message = 'Email already Exists',
                    response.status = 409
                callback(response);
            } else {
                console.log('in else condition');
                hashGenerate(req.password, (err, data) => {
                    if (err) {
                        response.success = false
                        response.message = 'Invalid password  !!try again';
                        response.status = 401
                        callback(response);

                    } else {
                        const newUser = new user({
                            'firstName': req.firstName,
                            'lastName': req.lastName,
                            'email': req.email,
                            'password': data,
                            "profileUrl": ""
                        });
                        newUser.save((err, data) => {
                            console.log(data);

                            if (err) {
                                response.success = false;
                                response.message = "Error while save"
                                response.data = err
                                response.status = 500
                                callback(response);
                            } else {
                                var obj = {
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    id: data._id,
                                }
                                response.message = 'User register successFully';
                                response.data = obj;
                                callback(null, response)
                            }
                        })
                    }
                })
            }
        }
    })
}

userModel.prototype.login = (req, callback) => {
    var response = {
        success: false,
        message: '',
        data: '',
        status: 200
    }
    user.find({ 'email': req.email }, (err, data) => {
        if (err) {
            response.message = err;
            response.status = 500;
            return callback(response);
        } else if (data.length > 0) {
            console.log('data of pass is ', data);

            bcrypt.compare(req.password, data[0].password, function (err, object) {
                if (err) {
                    response.status = 401;
                    response.message = 'Invalid password !! try again'
                    callback(response);
                } else if (object) {
                    var token = jwt.sign({ email: data[0].email, id: data[0].id }, config.secretKey);
                    console.log(data);
                    var obj = {
                        firstName: data[0].firstName,
                        lastName: data[0].lastName,
                        profileUrl: data[0].profileUrl,
                        profileName: data[0].profileName,
                        email: data[0].email,
                        id: data[0]._id,
                        token: token
                    }
                    response.success = true
                    response.message = 'User Login Successfully';
                    response.data = obj
                    callback(null, response)
                } else {
                    response.message = 'Invalid password !! try again'
                    response.status = 500;
                    callback(response);
                }
            });
        } else {
            response.message = 'User does Not Exist !! please register First'
            response.status = 403;
            callback(response);
        }
    })
}
userModel.prototype.forgotPassword = (req, callback) => {
    console.log('in userSchema forgot', req);
    var response = {
        success: false,
        message: '',
        data: ''
    }
    user.find({ email: req.email }, (err, data) => {
        if (err) {
            response.message = "Email does not Exist";
            callback(response);
        } else if (data.length > 0) {
            var token = jwt.sign({ email: data[0].email, id: data[0].id }, config.secretKey, { expiresIn: '2h' });
            var url = req.url + '/reset/' + token;
            mailer.sendMail(data[0].email, url);
            response.success = true;
            response.message = "Please Check Your mail for reset password";
            callback(null, response);
        } else {
            response.success = false;
            response.message = "Email does not Exist";
            callback(response);
        }
    })
}
userModel.prototype.resetPassword = (req, callback) => {
    console.log('in userSchema reset', req);
    var response = {
        success: false,
        message: '',
        data: ''
    }
    hashGenerate(req.password, (err, data) => {
        if (err) {
            response.message = 'Password is not valid'
            callback(response);
        } else {
            user.updateOne({ _id: req.data.id }, { password: data }, (err, obj) => {
                if (err) {
                    response.message = 'Problem in server'
                    callback(response);
                } else {
                    response.success = true;
                    response.message = 'Password updated successfully'
                    callback(null, response);
                }
            })
        }
    })
}
userModel.prototype.uploadProfile = (req, callback) => {
    console.log('in userSchema reset', req);
    var response = {
        success: false,
        message: '',
        data: ''
    }
    let d = { profileUrl: req.imageUrl, profileName: req.profileName }
    user.updateOne({ _id: req.userId }, d, (err, obj) => {
        if (err) {
            response.message = 'Problem in server'
            callback(response);
        } else {
            response.success = true;
            response.data = d;
            response.message = 'Profile image updated successfully'
            callback(null, response);
        }
    })
}
userModel.prototype.searchUser = (req, callback) => {
    console.log('serach word in schema', req.searchWord);

    var response = {
        success: false,
        message: '',
        data: ''
    }
    user.find({ 'email': { $regex: req.searchWord, $regex: req.searchWord.toLowerCase() } }, { "firstName": 1, "email": 1, "lastName": 1 }, (err, data) => {
        if (err) {
            response.message = err;
            return callback(response);
        } else {
            response.success = true
            response.message = 'User List retrieved successfully',
                response.data = data
            callback(null, response);
        }
    })
}
module.exports = new userModel();

