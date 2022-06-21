const Cost = require('../models/costs');

module.exports = {

    

    async productCosts(req, res, nect){
        try{
            const product = req.params.product;
            const data = await Cost.findByProduct(product);
            // console.log(`Cotizacion ${JSON.stringify(data)}`);
            return res.status(201).json(data[0]);
            // return res.status(201).json({
            //     message: 'Exito',
            //     success: true,
            //     data: data
            // })
            
        }catch(error){
            console.log(`Error al obtener cotizaciones ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las cotizaciones',
                error: error,
                success: false
            })
        }


    },

    async queryTracto(req, res, next){
        try {
            const origen = req.body.origen;      
            const destino = req.body.destino;
            const myCost = await Cost.queryTracto(origen,destino);
            if  (!myCost){
                return res.status(401).json({
                    success: false,
                    message: 'El valor origen no fue encontrado'
                });
            }
            else{
            return res.status(201).json({
                success: true,
                message: 'La consulta de costo se realizó correctamente.',
                data: myCost
                
            });
        }
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el la consulta',
                error: error
            });
        }
    },

    async queryDobleTroque(req, res, next){
        try {
            const origen = req.body.origen;      
            const destino = req.body.destino;
            const myCost = await Cost.queryDobleTroque(origen,destino);
            if  (!myCost){
                return res.status(401).json({
                    success: false,
                    message: 'El valor origen no fue encontrado'
                });
            }
            else{
            return res.status(201).json({
                success: true,
                message: 'La consulta de costo (DobleTroque) se realizó correctamente.',
                data: myCost
                
            });
        }
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el la consulta',
                error: error
            });
        }
    },

    async queryCamionSencillo(req, res, next){
        try {
            const origen = req.body.origen;      
            const destino = req.body.destino;
            const myCost = await Cost.queryCamionSencillo(origen,destino);
            if  (!myCost){
                return res.status(401).json({
                    success: false,
                    message: 'El valor origen no fue encontrado'
                });
            }
            else{
            return res.status(201).json({
                success: true,
                message: 'La consulta de costo (Sencillo) se realizó correctamente..',
                data: myCost
                
            });
        }
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el la consulta',
                error: error
            });
        }
    }

}