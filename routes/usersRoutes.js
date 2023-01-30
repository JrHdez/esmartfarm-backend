const UsersController = require('../controllers/usersController');
const QuotesController = require('../controllers/quotesController');
const CostsController = require('../controllers/costsController');
const ProductsController = require('../controllers/productsController');
const ModeloNegocioController = require('../controllers/modeloNegocioController');

module.exports = (app, upload) => {

    app.get('/api/users/getAll',UsersController.getAll);

    app.post('/api/users/create2', upload.array('image', 1), UsersController.registerWithImage);
    app.post('/api/users/create', UsersController.register);
    app.post('/api/users/login',UsersController.login);

    app.post('/api/users/createQuote',QuotesController.createQuote);
    app.get('/api/users/getQuotes/:id_user',QuotesController.findByUser);

    app.post('/api/costos/tractocamion',CostsController.queryTracto);
    app.post('/api/costos/doble_troque',CostsController.queryDobleTroque);
    app.post('/api/costos/camion_sencillo',CostsController.queryCamionSencillo);
    app.get('/api/costos/products/:product',CostsController.productCosts);

    
    app.post('/api/costos/modeloNegocio',ModeloNegocioController.modeloNegocio);
    app.post('/api/costos/getExtraCosts',ModeloNegocioController.getExtraCosts);


    app.get('/api/products/getAllName/',ProductsController.getAllName);

}