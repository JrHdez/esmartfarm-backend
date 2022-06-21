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
            costo,
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
                coordenadas,
                toneladas,
                origen,
                destino,
                costo,
                medio,
                created_at,
                updated_at
            )   
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id
        `;

    return db.oneOrNone(sql, [
        cotizacion.id_user,
        cotizacion.product,
        cotizacion.area,
        cotizacion.tecnologias,
        cotizacion.estado_via,
        cotizacion.ubicacion,
        cotizacion.coordenadas,
        cotizacion.toneladas,
        cotizacion.origen,
        cotizacion.destino,
        cotizacion.costo,
        cotizacion.medio,
        new Date(),
        new Date()
    ]);

}

module.exports = Cotizacion;



