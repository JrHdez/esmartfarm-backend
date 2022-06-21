const db = require('../config/config');

const Cost = {};

Cost.inversionInicial = (cuotaInicialData) => {
    const sql = `
    SELECT AVG(all costo_hectarea) 
        from public.tierra 
    WHERE 
	    departamento = $1 AND 
        compra_arriendo = $2
        ; 
    `;
    console.log('sql',cuotaInicialData);
    const resultado = db.oneOrNone(sql, [cuotaInicialData.departamento, cuotaInicialData.compra_arriendo]);
    console.log('resultado',resultado);
    return db.oneOrNone(sql, [cuotaInicialData.departamento, cuotaInicialData.compra_arriendo]);
}

Cost.findByProduct = (product) => {
    const sql = `
        SELECT 
           
            mano_obra AS "Mano de obra",
            analisis_suelo AS "Analisis del suelo",
            semillas AS "Semillas",
            fumigacion AS "Fumigacion",
            fertilizantes AS "Fertilizantes",
            equipo AS "Equipo",
            asistencia AS "Asistencia técnica",
            transporte AS "Transporte",
            (mano_obra + analisis_suelo + semillas + fumigacion + fertilizantes + equipo + asistencia + transporte) AS "TOTAL" 
        FROM 
            costos_producto
        WHERE
            product = $1
    `;
    return db.manyOrNone(sql, product);
}

Cost.queryTracto = (origen,destino) => {
    const sql = `
    SELECT 
        ${destino}
    FROM 
        tractocamion 
    WHERE 
        origen = $1
    `;
    console.log(origen);
    console.log(destino);
    return db.oneOrNone(sql,[origen]);
    
}

Cost.queryDobleTroque = (origen,destino) => {
    const sql = `
    SELECT 
        ${destino}
    FROM 
        doble_troque 
    WHERE 
        origen = $1
    `;
    console.log(origen);
    console.log(destino);
    return db.oneOrNone(sql,[origen]);
    
}

Cost.queryCamionSencillo = (origen,destino) => {
    const sql = `
    SELECT 
        ${destino}
    FROM 
        camion_sencillo 
    WHERE 
        origen = $1
    `;
    console.log(origen);
    console.log(destino);
    return db.oneOrNone(sql,[origen]);
    
}

module.exports = Cost;