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
    const CT = await db.oneOrNone(sql, [cuotaInicialData.departamento, cuotaInicialData.compra_arriendo]);


    const sql2 = `
    SELECT sum(costo) 
        from public.maquinaria 
    WHERE
	    producto = $1 OR
        producto = 'TODOS';
    `;

    // resultados.push(await db.oneOrNone(sql2, cuotaInicialData.producto));
    const VM = await db.oneOrNone(sql2, cuotaInicialData.product);

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
    // console.log('costo_total_insumos',resultados);
    

    return resultados;
    
}

//SONTENIMIENTO CULTIVO

ModeloNegocio.sostenimientoCultivo  =  async (producto, tipoCultivo, compra_arriendo, departamento) => {
    var resultados = {};

    const sql1 = `
    SELECT tiempo_sostenimiento
        FROM public.producto 
    WHERE
	    producto = $1
    ;
    `;
    const tiempo_sostenimiento = await db.oneOrNone(sql1, producto); //Tiempo de preparacion del suelo para el producto especificado


    const sql2 = `
        SELECT sum(costoxhectarea) AS costo_hectarea_personal
            FROM public.personal 
        WHERE
	        fase_uso = 'Sostenimiento del Cultivo'
        ;
    `;

    const costo_hectarea_personal = await db.oneOrNone(sql2, producto); //Costo hectarea personal para la preparacion del suelo (personal no depende del producto)


    let costo_insumos = {};
    const clases_insumos = ['INSECTICIDA','HERBICIDA','SOLUBLE','FUNGICIDA'];

    const productoLowerCase = producto.toLowerCase();

    for (const insumo of clases_insumos){
        const sql3 = `
        SELECT 
            AVG(all costo_total) AS insumo
        FROM 
            productos.${productoLowerCase}
        WHERE
            clase = $1 AND clase_insumo = $2
        ;
        `;
        query = await db.oneOrNone(sql3, [insumo, tipoCultivo])
        costo_insumos[`insumo_${insumo}`] = query.insumo;
        
        // costo_total_insumos.push(query); 
    }
    // console.log('Costo insumos',costo_insumos);


    const sql4 = `
    SELECT 
        sum(cast(costo_total as float)) AS otros_insumos
    FROM 
        public.insumos 
    WHERE
        (producto = $1 OR producto = 'TODOS') and fase_uso = 'Sostenimiento del Cultivo';
    `;
    const otros_insumos = await db.oneOrNone(sql4, producto); //Insumos sostenimientos para el tipo de producto
    // console.log('insumos_sostenimiento',insumos_sostenimiento);


    let CT = {
        prom_arriendo: 0
    };
    if (compra_arriendo == 'Arriendo'){

        const sql = `
        SELECT 
            AVG(all costo_hectarea)  as "prom_arriendo"
        FROM 
            public.tierra 
        WHERE 
    	    departamento = $1 AND 
            compra_arriendo = 'Arriendo'
        ; 
    `;
  
    CT = await db.oneOrNone(sql, departamento);
    }
    console.log('tiempo sost',tiempo_sostenimiento);
    CT.prom_arriendo = CT.prom_arriendo * tiempo_sostenimiento.tiempo_sostenimiento/30; //Suma del arriendo


    resultados = {
        ...tiempo_sostenimiento,
        ...costo_hectarea_personal,
        costo_insumos,
        ...otros_insumos,
        ...CT
    }

    // console.log('resultados',resultados);



    return resultados;
    
}

ModeloNegocio.cosecha  =  async (producto, tipoCultivo, compra_arriendo, departamento) => {
    var resultados = {};

    const sql1 = `
    SELECT tiempo_cosecha
        FROM public.producto 
    WHERE
	    producto = $1
    ;
    `;
    const tiempo_cosecha = await db.oneOrNone(sql1, producto); //Tiempo de cosecha para el producto especificado


    const sql2 = `
        SELECT sum(costoxhectarea) AS costo_hectarea_personal
            FROM public.personal 
        WHERE
	        fase_uso = 'Cosecha'
        ;
    `;

    const costo_hectarea_personal = await db.oneOrNone(sql2, producto); //Costo hectarea personal para la cosecha (personal no depende del producto)


    let costo_insumos = {};
    const clases_insumos = ['INSECTICIDA','HERBICIDA','SOLUBLE','FUNGICIDA'];

    const productoLowerCase = producto.toLowerCase();

    for (const insumo of clases_insumos){
        const sql3 = `
        SELECT 
            AVG(all costo_total) AS insumo
        FROM 
            productos.${productoLowerCase}
        WHERE
            clase = $1 AND clase_insumo = $2
        ;
        `;
        query = await db.oneOrNone(sql3, [insumo, tipoCultivo])
        costo_insumos[`insumo_${insumo}`] = query.insumo;
        
        // costo_total_insumos.push(query); 
    }
    // console.log('Costo insumos',costo_insumos);


    const sql4 = `
    SELECT 
        sum(cast(costo_total as float)) AS otros_insumos
    FROM 
        public.insumos 
    WHERE
        (producto = $1 OR producto = 'TODOS') and fase_uso = 'Cosecha';
    `;
    const otros_insumos = await db.oneOrNone(sql4, producto); //Insumos sostenimientos para el tipo de producto
    // console.log('insumos_sostenimiento',insumos_sostenimiento);


    let CT = {
        prom_arriendo: 0
    };
    if (compra_arriendo == 'Arriendo'){
        
        const sql = `
        SELECT 
            AVG(all costo_hectarea)  as "prom_arriendo"
        FROM 
            public.tierra 
        WHERE 
    	    departamento = $1 AND 
            compra_arriendo = 'Arriendo'
        ; 
    `;
  
    CT = await db.oneOrNone(sql, departamento);
    }
    
    CT.prom_arriendo = CT.prom_arriendo * tiempo_cosecha.tiempo_cosecha/30; //Suma del arriendo


    resultados = {
        ...tiempo_cosecha,
        ...costo_hectarea_personal,
        costo_insumos,
        ...otros_insumos,
        ...CT
    }

    // console.log('resultados',resultados);



    return resultados;
    
}

ModeloNegocio.postCosecha  =  async (producto, tipoCultivo, compra_arriendo, departamento) => {
    var resultados = {};

    const sql1 = `
    SELECT tiempomax_postcosecha
        FROM public.producto 
    WHERE
	    producto = $1
    ;
    `;
    const tiempomax_postcosecha = await db.oneOrNone(sql1, producto); //Tiempo de postcosecha para el producto especificado


    const sql2 = `
        SELECT sum(cast(costoxhectarea as float)) AS costo_hectarea_personal
            FROM public.personal 
        WHERE
	        fase_uso = 'Post-Cosecha'
        ;
    `;

    const costo_hectarea_personal = await db.oneOrNone(sql2, producto); //Costo hectarea personal para la psotcosecha (personal no depende del producto)

    const sql4 = `
    SELECT 
        sum(cast(costo_total as float)) AS otros_insumos
    FROM 
        public.insumos 
    WHERE
        (producto = $1 OR producto = 'TODOS') and fase_uso = 'Post-Cosecha';
    `;
    const otros_insumos = await db.oneOrNone(sql4, producto); //Insumos sostenimientos para el tipo de producto
    
    // console.log('insumos_sostenimiento',insumos_sostenimiento);

    const sql5 = `
    SELECT 
        costoxhectarea as costo_empaque
    FROM 
        public.empaques 
    WHERE
        producto = $1
    ;
    `;

    costo_empaque = await db.oneOrNone(sql5, producto);


    let CT = {
        prom_arriendo: 0
    };
    if (compra_arriendo == 'Arriendo'){

        const sql = `
        SELECT 
            AVG(all costo_hectarea)  as prom_arriendo
        FROM 
            public.tierra 
        WHERE 
    	    departamento = $1 AND 
            compra_arriendo = 'Arriendo'
        ; 
    `;
  
    CT = await db.oneOrNone(sql, departamento);
    }
    
    CT.prom_arriendo = CT.prom_arriendo * tiempomax_postcosecha.tiempomax_postcosecha/30; //Suma del arriendo



    resultados = {
        ...tiempomax_postcosecha,
        ...costo_hectarea_personal,
        ...otros_insumos,
        ...costo_empaque,
        ...CT
    }

    // console.log('resultados',resultados);



    return resultados;
    
}

ModeloNegocio.transporte  =  async (producto, tipoCultivo, compra_arriendo, departamento) => {
    var resultados = {};

    const sql1 = `
    SELECT tiempomax_transporte
        FROM public.producto 
    WHERE
	    producto = $1
    ;
    `;
    const tiempomax_transporte = await db.oneOrNone(sql1, producto); //Tiempo de postcosecha para el producto especificado


    const sql2 = `
        SELECT sum(cast(costoxhectarea as float)) AS costo_hectarea_personal
            FROM public.personal 
        WHERE
	        fase_uso = 'Transporte - Comercialización'
        ;
    `;

    const costo_hectarea_personal = await db.oneOrNone(sql2, producto); //Costo hectarea personal para la psotcosecha (personal no depende del producto)

    const sql4 = `
    SELECT 
        sum(cast(costo_total as float)) AS otros_insumos
    FROM 
        public.insumos 
    WHERE
        (producto = $1 OR producto = 'TODOS') and fase_uso = 'Transporte - Comercialización';
    `;
    const otros_insumos = await db.oneOrNone(sql4, producto); //Insumos sostenimientos para el tipo de producto
    
    // console.log('insumos_sostenimiento',insumos_sostenimiento);



    let CT = {
        prom_arriendo: 0
    };
    if (compra_arriendo == 'Arriendo'){

        const sql = `
        SELECT 
            AVG(all costo_hectarea)  as prom_arriendo
        FROM 
            public.tierra 
        WHERE 
    	    departamento = $1 AND 
            compra_arriendo = 'Arriendo'
        ; 
    `;
  
    CT = await db.oneOrNone(sql, departamento);
    }

    CT.prom_arriendo = CT.prom_arriendo * tiempomax_transporte.tiempomax_transporte/30; //Suma del arriendo



    resultados = {
        ...tiempomax_transporte,
        ...costo_hectarea_personal,
        ...otros_insumos,
        ...CT
    }

    // console.log('resultados',resultados);



    return resultados;
    
}

ModeloNegocio.extraCosts = async (producto) => {

    const sql = `
    SELECT 
	    pais, ${producto}
    FROM
	productos.precioproductopais
    `
    return db.manyOrNone(sql);
        
}

ModeloNegocio.tonxHect = async (producto) => {

    const sql = `
    SELECT
	    toneladasxhectarea as tonxHect
    FROM
	    public.producto
    WHERE
	    producto = $1
    `
    return db.oneOrNone(sql,producto);
        
}

ModeloNegocio.impuestos = async () => {

    const sql = `
    SELECT
	    *
    FROM
	    public.impuestos
    `
    return db.manyOrNone(sql);
        
}


module.exports = ModeloNegocio;