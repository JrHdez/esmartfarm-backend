const db = require('../config/config');

const Cotizacion = {};
 
Cotizacion.findByUser = (id_user) => {
    const sql = `
        SELECT
            id,
            id_user,
            product,
            area,
            tecnologias,
            estado_via,
            ubicacion,
            coordenadas,
            toneladas,
            origen,
            destino,
            inversion_inicial,
            preparacion_suelo,
            sostenimiento_cultivo,
            cosecha,
            post_cosecha,
            costo_transporte,
            medio
        FROM
            cotizaciones
        WHERE
            id_user = $1
    `;
    return db.manyOrNone(sql, id_user);
}

Cotizacion.create = (cotizacion) => {
    const sql = `
        INSERT INTO 
        cotizaciones(
                id_user,
                product,
                area,
                tecnologias,
                estado_via,
                ubicacion,
                compraArriendo,
                departamento,
                altura,
                coordenadas,
                toneladas,
                origen,
                destino,
                inversion_inicial,
                preparacion_suelo,
                sostenimiento_cultivo,
                cosecha,
                post_cosecha,
                costo_transporte,
                medio,
                created_at,
                updated_at
            )   
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING id
        `;
            console.log(cotizacion);
    return db.oneOrNone(sql, [
        cotizacion.id_user,
        cotizacion.product,
        cotizacion.area,
        cotizacion.tecnologias,
        cotizacion.estado_via,
        cotizacion.ubicacion,
        cotizacion.compra_arriendo,
        cotizacion.departamento,
        cotizacion.altura,
        cotizacion.coordenadas,
        cotizacion.toneladas,
        cotizacion.origen,
        cotizacion.destino,
        cotizacion.inversion_inicial,
        cotizacion.preparacion_suelo,
        cotizacion.sostenimiento_cultivo,
        cotizacion.cosecha,
        cotizacion.post_cosecha,
        cotizacion.costo_transporte,
        cotizacion.medio,
        new Date(),
        new Date()
    ]);

}

module.exports = Cotizacion;



