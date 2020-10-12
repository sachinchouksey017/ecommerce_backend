const productModel = require('../models/productSchema')
module.exports.addProduct = (data) => {
    console.log('in service ', data);
    return new Promise((resolve, reject) => {
        productModel.add(data, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })

}
module.exports.deleteProduct = (data) => {
    console.log('in service ', data);
    return new Promise((resolve, reject) => {
        productModel.delete(data, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })

}
module.exports.updateProduct = (data) => {
    console.log('in service ', data);
    return new Promise((resolve, reject) => {
        productModel.updateProduct(data, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })

}
module.exports.getProduct = (data) => {
    console.log('in service ', data);
    return new Promise((resolve, reject) => {
        productModel.getProduct(data, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })

}
module.exports.sortByDateProduct = () => {
    return new Promise((resolve, reject) => {
        productModel.shortByDate({}, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
module.exports.filterByCategory = (req) => {
    return new Promise((resolve, reject) => {
        productModel.filterByCategory(req, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

