const Cotizacion = require('../models/cotizacion');

module.exports = {
    async createQuote(req, res, next){
        try {
                const cotizacion = req.body;
                const data = await Cotizacion.create(cotizacion);
                
                return res.status(201).json({
                    success: true,
                    message: 'La cotización se realizó correctamente.',
                    data: data.id
                });

            } catch (error) {
                console.log(`Error: ${error}`);
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro de la cotización',
                    error: error
                });
            }
    },

    async findByUser(req, res, nect){
        try{
            const id_user = req.params.id_user
            const data = await Cotizacion.findByUser(id_user);
            // console.log(`Cotizacion ${JSON.stringify(data)}`);
            return res.status(201).json(data);
            
        }catch(error){
            console.log(`Error al obtener cotizaciones ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las cotizaciones',
                error: error,
                success: false
            })
        }


    }
}