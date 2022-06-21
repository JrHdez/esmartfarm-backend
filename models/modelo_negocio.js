const db = require('../config/config');

const ModeloNegocio = {};

//INVERSION INICIAL

ModeloNegocio.inversionInicial  =  async (cuotaInicialData) => {
    var resultados = {};

    const sql = `
    SELECT AVG(all costo_hectarea) 
        from public.tierra 
    WHERE 
	    departamento = $1 AND 
        compra_arriendo = $2
        ; 
    `;
    
    
    // resultados.push(await db.oneOrNone(sql, [cuotaInicialData.departamento, cuotaInicialData.compra_arriendo]));
    const VM = await db.oneOrNone(sql, [cuotaInicialData.departamento, cuotaInicialData.compra_arriendo]);


    const sql2 = `
    SELECT sum(costo) 
        from public.maquinaria 
    WHERE
	    producto = $1 OR
        producto = 'TODOS';
    `;

    // resultados.push(await db.oneOrNone(sql2, cuotaInicialData.producto));
    const CT = await db.oneOrNone(sql2, cuotaInicialData.producto);

    resultados = {
        ...VM,
        ...CT
    }

    return resultados;
    
}

//PREPARACION SUELO

ModeloNegocio.preparacionSuelo  =  async (producto) => {
    var resultados = {};
    const sql = `
    SELECT tiempo_preparacion 
        FROM public.producto 
    WHERE
	    producto = $1
    ;
    `;
    const tiempo_preparacion = await db.oneOrNone(sql, producto); //Tiempo de preparacion del suelo para el producto especificado


    const sql2 = `
        SELECT sum(costoxhectarea) AS costo_hectarea_personal
            FROM public.personal 
        WHERE
	        fase_uso = 'Preparación del Suelo'
        ;
    `;

    const costo_hectarea_personal = await db.oneOrNone(sql2, producto); //Costo hectarea personal para la preparacion del suelo (personal no depende del producto)

    const sql3 = `
    SELECT sum(costo_total) AS costo_insumos
        FROM public.insumos 
    WHERE
	    fase_uso = 'Preparación del Suelo' AND
        (producto = $1 OR producto = 'TODOS')
    ;
    `;

    const costo_total_insumos = await db.oneOrNone(sql3, producto); //Costo total de insumos en la preparacion del suelo para un producto dado, sumado a preparacion del suelo de todos los productos

    resultados = {
        ...tiempo_preparacion,
        ...costo_hectarea_personal,
        ...costo_total_insumos
    }

    

    return resultados;
    
}

//SONTENIMIENTO CULTIVO

ModeloNegocio.preparacionSuelo  =  async (sostCultivo) => {
    var resultados = {};
    let costo_insumos = {};
    const clases_insumos = ['INSECTICIDA','HERBICIDA','SOLUBLE','FUNGICIDA'];

    const productoLowerCase = sostCultivo.producto.toLowerCase();

    for (const insumo of clases_insumos){
        const sql1 = `
        SELECT 
            AVG(all costo_total) AS insumo
        FROM 
            productos.${productoLowerCase}
        WHERE
            clase = $1 AND clase_insumo = $2
        ;
        `;
        query = await db.oneOrNone(sql1, [insumo,sostCultivo.tipoCultivo])
        costo_insumos[`insumo_${insumo}`] = query.insumo;
        
        // costo_total_insumos.push(query); 
    }
    console.log('afuera',costo_insumos);


    const sql5 = `
    SELECT 
        sum(cast(costo_total as float)) AS insumos_sostenimiento_producto
    FROM 
        public.insumos 
    WHERE
	    producto = $1 and fase_uso = 'Sostenimiento del Cultivo';
    `;
    const insumos_sostenimiento = await db.oneOrNone(sql5,sostCultivo.producto); //Insumos sostenimientos para el tipo de producto
    console.log('insumos_sostenimiento',insumos_sostenimiento);

    const sql6 = `
    SELECT 
        costo_total AS insumos_sostenimiento_todos
    FROM 
        public.insumos 
    WHERE
	    producto = 'TODOS' AND fase_uso = 'Sostenimiento del Cultivo';
    `;

    const insumos_sostenimiento_todos = await db.oneOrNone(sql6,sostCultivo.producto); //insumos sostenimiento para todos los productos (por ahora no hay nada aca)

    resultados = {
        ...costo_insumos,
        ...insumos_sostenimiento,
        ...insumos_sostenimiento_todos,
    }



    return resultados;
    
}



module.exports = ModeloNegocio;