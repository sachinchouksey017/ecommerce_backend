const userModel = require('../models/userSchema')
module.exports.register = (data) => {
    console.log('in service ', data);
    return new Promise((resolve, reject) => {
        userModel.register(data, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })

}

module.exports.login = (data) => {
    console.log('in service ', data);
    return new Promise((resolve, reject) => {
        userModel.login(data, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })

}
module.exports.forget = (data) => {
    console.log('in service ', data);
    return new Promise((resolve, reject) => {
        userModel.forgotPassword(data, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })

}
module.exports.reset = (data) => {
    console.log('in service ', data);
    return new Promise((resolve, reject) => {
        userModel.resetPassword(data, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })

}