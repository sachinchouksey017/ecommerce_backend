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

        } else if (data != null) {
            const newCategory = new category({
                categoryName: obj.categoryName
            })
            newCategory.save(null,(err,data)=>{
                if (err) {
                    
                    callback()
                } else {
                    
                }
            })
        } else {

        }
        callback(null, response)
    })
}
module.exports = new categoryModel();