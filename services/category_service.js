const categoryModel = require('../models/categorySchema')
module.exports.addCategory = (data) => {
    console.log('in service ', data);
    return new Promise((resolve, reject) => {
        categoryModel.add(data, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })

}
