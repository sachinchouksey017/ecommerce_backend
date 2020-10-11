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
module.exports.deleteCategory = (data) => {
    console.log('in service ', data);
    return new Promise((resolve, reject) => {
        categoryModel.delete(data, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })

}
module.exports.updateCategory = (data) => {
    console.log('in service ', data);
    return new Promise((resolve, reject) => {
        categoryModel.updateCategory(data, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })

}
module.exports.getAllCategory = (data) => {
    console.log('in service ', data);
    return new Promise((resolve, reject) => {
        categoryModel.getAllCategory(data, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })

}
