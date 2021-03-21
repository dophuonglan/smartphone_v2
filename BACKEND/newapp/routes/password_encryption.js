const bcrypt = require('bcrypt')

const encryption = (string)=>{
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(string, salt, function (err, hash) {
            // To check a password  
            return hash;
            // bcrypt.compare(string, hash, function (err, res) {
            //     // res == true
            //     // console.log('equal')
            //     console.log(res)
            //     return res;
            // })
    
            // bcrypt.compare('not_bacon', hash, function (err, res) {
            //     // res == false
            //     // console.log('not equal')
            //     console.log(res);
            //     return res;
            // })
        })
    })
    
}

module.exports = { encryption }