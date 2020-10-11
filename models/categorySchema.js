var mongoose = require('mongoose');
var categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, 'category name is required field'],
        unique: true
    }
}, {
    timestamps: true
})
var category = mongoose.model('category', categorySchema);
function categoryModel() {
}
categoryModel.prototype.add = (obj, callback) => {
    var response = {
        "success": true,
        "message": "",
        "data": "",
        status: 200
    }
    category.findOne({ categoryName: obj.categoryName }, (err, data) => {
        console.log('err is ', err, '   data ', data);
        if (err) {
            response.status = 500;
            response.message = "please try again later"
            response.success = false,
                response.data = err
            callback(response)

        } else if (data == null) {
            const newCategory = new category({
                categoryName: obj.categoryName
            })
            newCategory.save(null, (err, data) => {
                if (err) {
                    response.status = 500;
                    response.message = "error while save"
                    response.success = false,
                        response.data = err
                    callback(response)
                } else {
                    response.status = 200;
                    response.message = "category added successfully"
                    response.success = true,
                        response.data = data
                    callback(null, response)
                }
            })
        } else {
            response.status = 500;
            response.message = "category already exist"
            response.success = false,
                response.data = ''
            callback(response)
        }
    })
}
categoryModel.prototype.delete = (obj, callback) => {
    console.log('the ', obj.categoryId);

    var response = {
        success: false,
        message: "",
        data: "",
        err: "",
        status: 500
    }
    console.log('obj.categoryId',parseInt(obj.categoryId));
    category.findByIdAndRemove({ _id:  obj.categoryId }, (err, data) => {
        console.log('after find and remove', err, '    ', data);
        if (err) {
            response.message = "Category does not Exist";
            callback(response);
        } else if (data != null) {
            response.message = "Category deleted successfully"
            response.success = true;
            response.status = 200

            callback(null, response)
        } else {
            response.message = "Category does not Exist";
            response.status = 500
            callback(response)
        }
    })
}
categoryModel.prototype.getAllCategory = (req, callback) => {
    var response = {
        success: false,
        message: "",
        data: "",
        err: "",
        status: 500
    }

    category.find({}, (err, data) => {
        if (err) {
            response.message = "Error while search"
            response.err = err;
            response.status = 500
            callback(response, null);
        } else {
            response.message = "All category retrived successfully"
            response.data = data
            response.status = 200
            callback(null, response)
        }
    })
}
categoryModel.prototype.updateCategory = (req, callback) => {
    var response = {
        success: false,
        message: "",
        data: "",
        err: "",
        status: 500
    }
    category.findOneAndUpdate({ _id: req.categoryId }, { $set: { categoryName: req.categoryName } }, (err, data) => {
        if (err) {
            response.message = "categoryName already exist";
            response.err = err;
            response.status = 500
            callback(response);
        } else if (data != null) {
            console.log("data is", data);
            response.message = "categoryName updated successfully"
            response.success = true;
            response.status = 200

            callback(null, response)
        } else {
            response.status = 500
            response.message = "categoryName does not Exist";
            callback(response)
        }
    })
}

module.exports = new categoryModel();