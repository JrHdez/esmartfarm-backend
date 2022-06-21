DROP TABLE IF EXISTS products_tech CASCADE; 
CREATE TABLE products_tech(
	id_producto BIGSERIAL NOT NULL,
	id_tecnologia BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_producto) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_tecnologia) REFERENCES teconologias(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (id_producto, id_tecnologia)
);

DROP TABLE IF EXISTS products_zone CASCADE; 
CREATE TABLE products_has_zone(
	id_producto BIGSERIAL NOT NULL,
	id_zona BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_producto) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_zona) REFERENCES zonas_geograficas(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (id_producto, id_zona)
);

-- DROP TABLE IF EXISTS products_empaques CASCADE; 
-- CREATE TABLE products_empaques(
-- 	id BIGSERIAL PRIMARY KEY,
-- 	id_producto BIGSERIAL NOT NULL,
-- 	id_empaque BIGSERIAL NOT NULL,
-- 	created_at TIMESTAMP(0) NOT NULL,
-- 	updated_at TIMESTAMP(0) NOT NULL,
--     FOREIGN KEY(id_producto) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE,
--     FOREIGN KEY(id_empaque) REFERENCES empaques(id) ON UPDATE CASCADE ON DELETE CASCADE,
--     PRIMARY KEY (id_producto, id_empaque)
-- );

DROP TABLE IF EXISTS products_fumigacion CASCADE; 
CREATE TABLE products_fumigacion(
	id_producto BIGSERIAL NOT NULL,
	id_fumigacion BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_producto) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_fumigacion) REFERENCES fumigacion(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (id_producto, id_fumigacion)
);


DROP TABLE IF EXISTS fumigacion_proveedores CASCADE; 
CREATE TABLE fumigacion_proveedores(
	id BIGSERIAL PRIMARY KEY,
	id_fumigacion BIGSERIAL NOT NULL,
	id_proveedor BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_fumigacion) REFERENCES fumigacion(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_proveedor) REFERENCES proveedores(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (id_fumigacion, id_proveedor)
);

DROP TABLE IF EXISTS products_has_zone CASCADE; 
CREATE TABLE products_has_zone(
	id BIGSERIAL PRIMARY KEY,
	id_producto BIGSERIAL NOT NULL,
	id_zona BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_producto) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_zona) REFERENCES zonas_geograficas(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (id_producto, id_zona)
);