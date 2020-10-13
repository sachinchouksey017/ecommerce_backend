var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'product name is required field'],
        unique: true
    },
    price: {
        type: Number,
        required: [true, 'product price is required']
    },
    img: {
        type: String
    },
    quantity: {
        type: Number,
        required: [true, 'quantity is required field']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }
}, {
    timestamps: true
})
var product = mongoose.model('product', productSchema);
function productModel() {
}
productModel.prototype.add = (obj, callback) => {
    var response = {
        "success": true,
        "message": "",
        "data": "",
        status: 200
    }
    product.findOne({ productName: obj.productName }, (err, data) => {
        console.log('err is ', err, '   data ', data);
        if (err) {
            response.status = 500;
            response.message = "please try again later"
            response.success = false,
                response.data = err
            callback(response)

        } else if (data == null) {
            const newProduct = new product({
                productName: obj.productName,
                price: obj.price,
                img: obj.img,
                quantity: obj.quantity,
                category: obj.categoryId
            })
            newProduct.save(null, (err, data) => {
                if (err) {
                    response.status = 500;
                    response.message = "error while save"
                    response.success = false,
                        response.data = err
                    callback(response)
                } else {
                    response.status = 200;
                    response.message = "Product added successfully"
                    response.success = true,
                        response.data = data
                    callback(null, response)
                }
            })
        } else {
            response.status = 500;
            response.message = "Product already exist"
            response.success = false,
                response.data = ''
            callback(response)
        }
    })
}
productModel.prototype.delete = (obj, callback) => {
    console.log('the ', obj.product);

    var response = {
        success: false,
        message: "",
        data: "",
        err: "",
        status: 500
    }
    console.log('obj.product', parseInt(obj.productId));
    product.findByIdAndRemove({ _id: obj.productId }, (err, data) => {
        console.log('after find and remove', err, '    ', data);
        if (err) {
            response.message = "product does not Exist";
            callback(response);
        } else if (data != null) {
            response.message = "product deleted successfully"
            response.success = true;
            response.status = 200

            callback(null, response)
        } else {
            response.message = "product does not Exist";
            response.status = 500
            callback(response)
        }
    })
}

productModel.prototype.getProduct = (req, callback) => {
    var response = {
        success: false,
        message: "",
        data: "",
        err: "",
        status: 500
    }

    product.find(req, (err, data) => {
        if (err) {
            response.message = "Error while search"
            response.err = err;
            response.status = 500
            callback(response, null);
        } else {
            response.message = "product retrived successfully"
            response.data = data
            response.status = 200
            callback(null, response)
        }
    }).populate('category')
}
productModel.prototype.filterByCategory = (req, callback) => {
    var response = {
        success: false,
        message: "",
        data: "",
        err: "",
        status: 500
    }

    product.find({ category: req.categoryId }).populate('category').exec((err, data) => {
        if (err) {
            response.message = "Error while search"
            response.err = err;
            response.status = 500
            callback(response, null);
        } else {
            response.message = "product retrived successfully"
            response.data = data
            response.status = 200
            callback(null, response)
        }
    })
}
productModel.prototype.shortByDate = (req, callback) => {
    var response = {
        success: false,
        message: "",
        data: "",
        err: "",
        status: 500
    }

    product.find({}).populate('category').sort({ 'createdAt': -1 }).exec((err, data) => {
        if (err) {
            response.message = "Error while sort"
            response.err = err;
            response.status = 500
            callback(response, null);
        } else {
            response.message = "product sort successfully"
            response.data = data
            response.status = 200
            callback(null, response)
        }
    })
}
productModel.prototype.updateProduct = (req, callback) => {
    var response = {
        success: false,
        message: "",
        data: "",
        err: "",
        status: 500
    }
    var productModel = {
        ...req.productName && { productName: req.productName },
        ...req.price && { price: req.price },
        ...req.img && { img: req.img },
        ...req.quantity && { quantity: req.quantity },
        ...req.category && { category: req.category }
    }
    console.log('product is ', productModel);
    product.findOneAndUpdate({ _id: req.productId },
        { $set: productModel }, (err, data) => {
            if (err) {
                response.message = "product already exist";
                response.err = err;
                response.status = 500
                callback(response);
            } else if (data != null) {
                console.log("data is", data);
                response.message = "product updated successfully"
                response.success = true;
                response.status = 200

                callback(null, response)
            } else {
                response.status = 500
                response.message = "product does not Exist";
                callback(response)
            }
        })
}

module.exports = new productModel();