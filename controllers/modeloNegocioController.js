const ModeloNegocio = require('../models/modelo_negocio');

module.exports = {

    async modeloNegocio(req, res, next){

    // try{
    const data = req.body;
    console.log('datatatatata',data);
    //INversion inicial
    const invInicialInfo = await ModeloNegocio.inversionInicial(data);
    let CI;
    if (data.compra_arriendo == 'Compra'){
        CI = parseFloat(invInicialInfo.avg) + parseFloat(invInicialInfo.sum);

    }else{
        CI = parseFloat(invInicialInfo.avg)
    }
    console.log('CI',CI);

    
    
    //PReparacion suelo/////////////////////
    const prepSueloInfo = await ModeloNegocio.preparacionSuelo(data.product);
    const CS = (prepSueloInfo.tiempo_preparacion / 30) * parseFloat(prepSueloInfo.costo_hectarea_personal) + parseFloat(prepSueloInfo
        .costo_insumos);
    // console.log('CS',CS);
    
    //Agroquimicos sostenimiento y cosecha////////////////////////////////
    let sostCultivoInfo = await ModeloNegocio.sostenimientoCultivo(data.product, 'AGROQUIMICO', data.compraArriendo, data.departamento);
    let sumarInsumosSost = Object.values(sostCultivoInfo.costo_insumos);
    const sumaInsumosSostCultivoQuimico = sumarInsumosSost.reduce((a,b) => a + b, 0);   
    const sumaSostCultivoQuimico = sumaInsumosSostCultivoQuimico + sostCultivoInfo.otros_insumos + sostCultivoInfo.prom_arriendo;
    // console.log('sumaSostCultivoQuimico',sumaSostCultivoQuimico);
    
    let cosechaInfo = await ModeloNegocio.cosecha(data.product, 'AGROQUIMICO', data.compraArriendo, data.departamento);
    let sumarInsumosCosecha = Object.values(cosechaInfo.costo_insumos);
    const sumaInsumoCosechaQuimico = sumarInsumosCosecha.reduce((a,b) => a + b, 0);
    const sumaCosechaQuimico = sumaInsumoCosechaQuimico + cosechaInfo.otros_insumos + cosechaInfo.prom_arriendo;
    // console.log('sumaCosechaQuimico',sumaCosechaQuimico);

    //Agrobiologicos sostenimiento y cosecha////////////////////////////////
    sostCultivoInfo = await ModeloNegocio.sostenimientoCultivo(data.product, 'AGROBIOLOGICO', data.compraArriendo, data.departamento);
    sumarInsumosSost = Object.values(sostCultivoInfo.costo_insumos);
    let sumaInsumosSostCultivoAgrobio = sumarInsumosSost.reduce((a,b) => a + b, 0);  
    sumaInsumosSostCultivoAgrobio = parseFloat(sumaInsumosSostCultivoAgrobio) + parseFloat(sumaInsumosSostCultivoQuimico) * 0.4;
    const sumaSostCultivoAgrobio = sumaInsumosSostCultivoAgrobio + sostCultivoInfo.otros_insumos + sostCultivoInfo.prom_arriendo;
    // console.log('sumaSostCultivoAgrobio',sumaSostCultivoAgrobio);   


    cosechaInfo = await ModeloNegocio.cosecha(data.product, 'AGROBIOLOGICO', data.compraArriendo, data.departamento);
    sumarInsumosCosecha = Object.values(cosechaInfo.costo_insumos);
    const sumaCosechaAgrobio = sumarInsumosCosecha.reduce((a,b) => a + b, 0);
    const sumaInsumosCosecha = parseFloat(sumaCosechaAgrobio) + parseFloat(sumaInsumoCosechaQuimico) * 0.4;
    const sumaCosecha = sumaInsumosCosecha + cosechaInfo.otros_insumos + cosechaInfo.prom_arriendo;
    // console.log('sumaCosecha',sumaCosecha);

    //Post-cosecha////////////////////////////////
    let postCosechaInfo = await ModeloNegocio.postCosecha(data.product, 'AGROQUIMICO', data.compraArriendo, data.departamento);
    const sumaPostCosecha =  (postCosechaInfo.tiempomax_postcosecha/30)*postCosechaInfo.costo_hectarea_personal + postCosechaInfo.otros_insumos + postCosechaInfo.costo_empaque + postCosechaInfo.prom_arriendo;
    // console.log('sumaPostCosecha',sumaPostCosecha);

    //transporte////////////////////////////////
    let transporteInfo = await ModeloNegocio.transporte(data.product, 'AGROQUIMICO', data.compraArriendo, data.departamento);
    const sumaTransporte =  (transporteInfo.tiempomax_transporte/30)*transporteInfo.costo_hectarea_personal + transporteInfo.otros_insumos + transporteInfo.prom_arriendo;
    // console.log('sumaTransporte',sumaTransporte);


    const returnData = [];

    returnData.push({
        inversion_inicial: Math.trunc(CI)
    },{
        preparacion_suelo: Math.trunc(CS),
    },{
        sostenimiento_quimico: Math.trunc(sumaSostCultivoQuimico)
    },{
        cosecha_quimico: Math.trunc(sumaCosechaQuimico)
    },{
        sostenimiento_agrobio: Math.trunc(sumaSostCultivoAgrobio)
    },{
        cosecha_agrobio: Math.trunc(sumaCosecha)
    },{
        post_cosecha: Math.trunc(sumaPostCosecha)
    },{
        transporte: Math.trunc(sumaTransporte)
    }
    );


    return res.status(201).json({
        message: 'Exito, data es el costo inicial de la inversion',
        success: true,
        data: {
            inversion_inicial: Math.trunc(CI),
            preparacion_suelo: Math.trunc(CS),
            sostenimiento_quimico: Math.trunc(sumaSostCultivoQuimico),
            cosecha_quimico: Math.trunc(sumaCosechaQuimico),
            sostenimiento_agrobio: Math.trunc(sumaSostCultivoAgrobio),
            cosecha_agrobio: Math.trunc(sumaCosecha),
            post_cosecha: Math.trunc(sumaPostCosecha),
            transporte: Math.trunc(sumaTransporte)
        }

    })
    // }catch(error){
    //     console.log(`Error al obtener caso negocio ${error}`);
    //         return res.status(501).json({
    //             message: 'Hubo un error al tratar de obtener costos modelo negocio',
    //             error: error,
    //             success: false
    //         })
    // }
        
    },

  async getExtraCosts(req, res, next){

    try {
        const producto = req.body.producto;
    const precioProducto = await ModeloNegocio.extraCosts(producto)
    const tonxHect = await ModeloNegocio.tonxHect(producto);
    const impuestos = await ModeloNegocio.impuestos();
    return res.status(201).json({
        success: true,
        message: 'extra cost llevada a cabo',
        data: {
            precioProducto,
            tonxHect: tonxHect.tonxhect,
            impuestos
        }
    });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(501).json({
            success: false,
            message: 'Error al obtener los precios'
        });
    }
    

  }
}