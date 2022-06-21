const Product = require('../models/products');

module.exports = {
    async getAllName(req, res, next){
        try {
            const data = await Product.getAllName();
            console.log(`Productos: ${data}`);
            return  res.status(201).json(data);
        } catch (error) {
            console.log(`Error controller: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los nombres de productos'
            });
        }
    }
}