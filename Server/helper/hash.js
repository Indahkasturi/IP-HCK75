const bcrypt = require('bcryptjs')

function hash(pw) {
    const salt = bcrypt.genSaltSync(10);
    let result = bcrypt.hashSync(pw, salt);

    return result;

}

function compareHashed(pw, hashed) {
    let result = bcrypt.compareSync(pw, hashed);
    return result;
}

module.exports = { hash, compareHashed }