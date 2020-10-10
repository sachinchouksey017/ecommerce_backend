var jwt = require('jsonwebtoken');
var config = require('../config/config')
var auth = function (req, res, next) {
     token = req.headers['token']
     jwt.verify(token, config.secretKey, function (err, decoded) {
          
          if (err) {
               let mess='Not Authenticated';
               if(err.message=='jwt expired')
               mess='link session is expired '
               return res.status(401).send({ message: mess });
          } else {
               console.log('decoded data', decoded);
               req.body['data'] = decoded;
               console.log(req.body);
               next();
          }

     });

}
module.exports = auth;