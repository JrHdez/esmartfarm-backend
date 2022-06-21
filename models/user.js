const db = require('../config/config');
const crypto = require("crypto");
const { oneOrNone } = require('../config/config');

const User = {};

User.getAll = () => {
    const sql = `
    SELECT 
        * 
    FROM
        users
    `;

    return db.manyOrNone(sql);
}

User.findbyId = (id, callback)=>{

    const sql = `
    SELECT 
        id,
        name,
        lastname,
        typeID,
        numberID,
        phone,
        password,
        session_token,
        image
    FROM
        users
    WHERE
        id = $1
    `
    return db.oneOrNone(sql,id).then(user => {callback(null, user);})

}

User.create = (user) => {

    const myPasswordHashed = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = myPasswordHashed;

    const sql = `
    INSERT INTO 
        users(
            name,
            lastname,
            typeID,
            numberID,
            phone,
            email,
            password,
            created_at,
            updated_at,
            image
        )   
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id
    `;

    return db.oneOrNone(sql, [
        user.name,
        user.lastname,
        user.typeID,
        user.numberID,
        user.phone,
        user.email,
        user.password,
        new Date(),
        new Date(),
        user.image
    ]);
}

User.findbyNoId = (numberID) => {
    const sql = `
    SELECT 
        id,
        name,
        lastname,
        typeID,
        numberID,
        phone,
        email,
        password,
        session_token,
        image
    FROM 
        users 
    WHERE 
        numberID = $1
    `;

    return db.oneOrNone(sql,numberID);


}

User.updateToken = (id, token) => {
    const sql = `
    UPDATE  
        users
    SET
        session_token = $2
    WHERE
        id = $1
    `;

    return db.none(sql, [id,token]);
}


User.isPasswordMatched = (candidatePassword, hash) => {
    const myPasswordHashed = crypto.createHash('md5').update(candidatePassword).digest('hex');
    if(myPasswordHashed === hash) {
        return true;
    }
    return false;
}

User.isPasswordMatched = (candidatePassword, hash) => {
    const myPasswordHashed = crypto.createHash('md5').update(candidatePassword).digest('hex');
    if(myPasswordHashed === hash) {
        return true;
    }
    return false;
}

module.exports = User;