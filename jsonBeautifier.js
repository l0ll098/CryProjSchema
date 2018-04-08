const through = require('through2');

module.exports = function (char) {
    return through.obj((file, enc, cb) => {
        let formatted = new Buffer(JSON.stringify(JSON.parse(file.contents.toString()), null, char));
        file.contents = formatted;
        cb(null, file)
    });
}