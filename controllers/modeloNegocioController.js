const ModeloNegocio = require('../models/modelo_negocio');

module.exports = {

    async inversionInicial(req, res, nect){
        try{
            cuotaInicialData = req.body;
            const data = await ModeloNegocio.inversionInicial(cuotaInicialData);

            console.log('data',data);
            const CI = parseFloat(data.avg) + parseFloat(data.sum);
            // console.log(`Cotizacion ${JSON.stringify(data)}`);
            // return res.status(201).json(data[0]);
            return res.status(201).json({
                message: 'Exito, data es el costo inicial de la inversion',
                success: true,
                data: CI
            })
            
        }catch(error){
            console.log(`Error al obtener inversion inicial ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener costos inversion inicial',
                error: error,
                success: false
            })
        }
    },

    async preparacionSuelo(req, res, nect){
        try{
            preparacionSuelo = req.body;
            const data = await ModeloNegocio.preparacionSuelo(preparacionSuelo.producto);

            console.log('data',data);

            const CS = (data.tiempo_preparacion / 10) * parseFloat(data.costo_hectarea_personal) + parseFloat(data.costo_insumos);

            // console.log(`Cotizacion ${JSON.stringify(data)}`);
            // return res.status(201).json(data[0]);
            return res.status(201).json({
                message: 'Exito, data es el costo de la preparacion del suelo',
                success: true,
                data: CS  
            })
            
        }catch(error){
            console.log(`Error al obtener preparacion del suelo costos ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener costos preparacion del suelo',
                error: error,
                success: false
            })
        }
    },

    async sostenimientoCultivo(req, res, nect){
        try{
            sostenimientoCultivo = req.body;
            let agroquimico = true;
            if (this.sostenimientoCultivo.tipoCultivo == 'AGROBIOLOGICO'){
                this.sostenimientoCultivo.tipoCultivo = 'AGROQUIMICO';
                agroquimico = false;
            }

            const data = await ModeloNegocio.preparacionSuelo(sostenimientoCultivo);
            console.log('data',data);
            const sumar = Object.values(data);
            const sumaSostCultivoQuimico = sumar.reduce((a,b) => a + b, 0);
            console.log('sumaquimico',sumaSostCultivoQuimico);


            if (agroquimico){
                return res.status(201).json({
                    message: `Exito, data es el costo del sostenimiento del cultivo agroquimico para ${this.sostenimientoCultivo.producto}`,
                    success: true,
                    data: sumaSostCultivoQuimico 
                });
            }else{
                this.sostenimientoCultivo.tipoCultivo = 'AGROBIOLOGICO';
                const data = await ModeloNegocio.preparacionSuelo(sostenimientoCultivo);
                const sumar = Object.values(data);
                const sumaSostCultivoAgrobio = sumar.reduce((a,b) => a + b, 0);

                console.log('sumaagro',sumaSostCultivoAgrobio);

                const sumaSostCultivo = parseFloat(sumaSostCultivoAgrobio) + parseFloat(sumaSostCultivoQuimico) * 0.4;
                return res.status(201).json({
                    message: `Exito, data es el costo del sostenimiento del cultivo agrobiologico para ${this.sostenimientoCultivo.producto}`,
                    success: true,
                    data: sumaSostCultivo 
                }); 
            }
            
            
        }catch(error){
            console.log(`Error al obtener preparacion del suelo costos ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener costos preparacion del suelo',
                error: error,
                success: false
            })
        }
    }


}