const jwt = require('jsonwebtoken');
const secretKey = 'xiaojun';

//生成令牌
function create(data,expiresIn=20) {
    let token = jwt.sign(data, secretKey, { expiresIn });
    return token
}

//验证令牌
function verfiy(token) {
    let data;
    try {
        //解码
        let decoded = jwt.verify(token, secretKey);
        return data = true
    } catch (err) {
        return data = false
    }
}

module.exports = {
    create,verfiy
}