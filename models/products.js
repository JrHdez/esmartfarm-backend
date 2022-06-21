const { manyOrNone } = require('../config/config');
const db = require('../config/config');

const Product = {};

Product.getAllName = () =>{
    const sql = `
    SELECT
        producto,
        altura_min,
        altura_max
    FROM
        producto
    `;
    return db.manyOrNone(sql);
}

module.exports = Product;