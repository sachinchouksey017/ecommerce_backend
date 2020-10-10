var aws = require('aws-sdk')
var config=require('../config/config')
var multer = require('multer')
var multerS3 = require('multer-s3')
 
var s3 = new aws.S3({
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    region: config.AWS_REGION

})
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    console.log('correct');
    
      cb(null, true)
  } else {
    console.log('wrong',file.mimetype);
    
      cb(new Error('Invalid Mime Type , only JEPG and PNG'), false)
  }
}
 
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'fundoobridgelabz',
    "acl": "public-read",
    limits: {
        fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
    },
    metadata: function (req, file, cb) {
      console.log('file is ',file);
      fileFilter(req,file,(err,data)=>{
        if(err){
          cb(err);

        }else{
          cb(null, {fieldName:'firstImage'});
        }
      })
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})
module.exports=upload;