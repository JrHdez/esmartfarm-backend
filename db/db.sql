-- DROP TABLE IF EXISTS roles CASCADE;
-- CREATE TABLE roles(
-- 	id BIGSERIAL PRIMARY KEY,
-- 	name VARCHAR(180) NOT NULL UNIQUE,
-- 	image VARCHAR(255) NULL,
-- 	route VARCHAR(255) NULL,
-- 	created_at TIMESTAMP(0) NOT NULL,
-- 	updated_at TIMESTAMP(0) NOT NULL
-- );

-- INSERT INTO roles (
-- 	name,
-- 	route,
-- 	created_at,
-- 	updated_at
-- )
-- VALUES (
-- 	'CLIENTE',
-- 	'client/products/list',
-- 	'2021-05-22',
-- 	'2021-05-22'
-- );

-- INSERT INTO roles (
-- 	name,
-- 	route,
-- 	created_at,
-- 	updated_at
-- )
-- VALUES (
-- 	'ADMINISTRADOR',
-- 	'admin/clients/list',
-- 	'2021-05-22',
-- 	'2021-05-22'
-- );

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	typeID VARCHAR(80) NOT NULL,
	numberID VARCHAR(80) NOT NULL UNIQUE,
	phone VARCHAR(80) NOT NULL UNIQUE,
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	session_token VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	image VARCHAR(255) NULL
);

-- DROP TABLE IF EXISTS user_has_roles CASCADE;
-- CREATE TABLE user_has_roles(
-- 	id_user BIGSERIAL NOT NULL,
-- 	id_rol BIGSERIAL NOT NULL,
-- 	created_at TIMESTAMP(0) NOT NULL,
-- 	updated_at TIMESTAMP(0) NOT NULL,
-- 	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
-- 	FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
-- 	PRIMARY KEY (id_user, id_rol)
-- );

INSERT INTO users(
	name,
	lastname,
	no_id,
	phone,
	email,
	password,
	created_at,
	updated_at
)
VALUES(
	'Junior',
	'Hernandez',
	'1234340323',
	'3013111292',
	'jghe.63@gmail.com',
	'123456',
	'2021-10-01',
	'2021-10-01'
	
)






DROP TABLE IF EXISTS teconologias CASCADE;
CREATE TABLE teconologias(
	id BIGSERIAL PRIMARY KEY,
	teconologia VARCHAR(255) NOT NULL,
	descripcion VARCHAR(255) NULL,
	costo VARCHAR(80) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);


DROP TABLE IF EXISTS zonas_geograficas CASCADE;
CREATE TABLE zonas_geograficas(
	id BIGSERIAL PRIMARY KEY,
	zona VARCHAR(255) NOT NULL,
	clima VARCHAR(255) NOT NULL,
	phsuelo VARCHAR(80) NULL,
	humedad VARCHAR(80) NULL,
	vias VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS empaques CASCADE;
CREATE TABLE empaques(
	id BIGSERIAL PRIMARY KEY,
	empaque VARCHAR(255) NOT NULL,
	dimensiones VARCHAR(255) NOT NULL,
	material VARCHAR(80) NULL,
	resistencia VARCHAR(80) NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);


INSERT INTO empaques (empaque,dimensiones,material,requisitos,created_at,updated_at) VALUES ('Caja','50x50','Cartón','Baja','2022-01-11','2022-01-11');

DROP TABLE IF EXISTS transporte CASCADE;
CREATE TABLE transporte(
	id BIGSERIAL PRIMARY KEY,
	tipoTransporte VARCHAR(255) NOT NULL,
	capacidad VARCHAR(255) NOT NULL,
	costo VARCHAR(80) NOT NULL,
	disponibilidad VARCHAR(80) NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS personal CASCADE;
CREATE TABLE personal(
	id BIGSERIAL PRIMARY KEY,
	rol VARCHAR(255) NOT NULL,
	apellido VARCHAR(255) NOT NULL,
	profesion VARCHAR(80) NULL,
	cultivo VARCHAR(80) NOT NULL,
	costo VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS personal CASCADE;
CREATE TABLE personal(
	id BIGSERIAL PRIMARY KEY,
	rol VARCHAR(255) NOT NULL,
	producto VARCHAR(255) NOT NULL,
	costo_empresa_mes DOUBLE PRECISION NULL,
	costo_admin DOUBLE PRECISION NULL NULL,
	kit_herramientas DOUBLE PRECISION NULL,
	valor_dia_ps DOUBLE PRECISION NULL,
	fase_uso VARCHAR(80) NULL,
	tiempo VARCHAR(20) NULL,
	cantidad INT NULL,
	costo_hectarea DOUBLE PRECISION NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);


DROP TABLE IF EXISTS maquinaria CASCADE;
CREATE TABLE maquinaria(
	id BIGSERIAL PRIMARY KEY,
	equipo VARCHAR(255) NOT NULL,
	tipo VARCHAR(255) NOT NULL,
	fase_uso VARCHAR(80) NULL,
	producto VARCHAR(80) NOT NULL,
	capacidad_toneladas INT NULL,
	toneladas_cultivo INT NULL,
	costo DOUBLE PRECISION NULL,
	cantidad INT NULL,
	inversion_inicial DOUBLE PRECISION NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS fumigacion CASCADE;
CREATE TABLE fumigacion(
	id BIGSERIAL PRIMARY KEY,
	tipoFumigacion VARCHAR(255) NOT NULL,
	prodcutos VARCHAR(255) NOT NULL,
	costos VARCHAR(80) NOT NULL,
	proveedor VARCHAR(80) NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS certificaciones CASCADE;
CREATE TABLE certificaciones(
	id BIGSERIAL PRIMARY KEY,
	certificacion VARCHAR(255) NOT NULL,
	cultivo VARCHAR(255) NOT NULL,
	costo VARCHAR(80) NULL,
	requisitos VARCHAR(80) NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS proveedores CASCADE;
CREATE TABLE proveedores(
	id BIGSERIAL PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,
	nit VARCHAR(255) NOT NULL,
	descripcion VARCHAR(80) NULL,
	ubicacion VARCHAR(255) NOT NULL,
	productos VARCHAR(80) NOT NULL,
	precios VARCHAR(255) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
	);

DROP TABLE IF EXISTS products CASCADE; --products_has_tecnologies
CREATE TABLE products(
	id BIGSERIAL PRIMARY KEY,
	producto VARCHAR(255) NOT NULL UNIQUE,
	tiempoCosecha VARCHAR(10) NOT NULL,
	cicloVida INT NULL,
	cantidadHectarea DOUBLE PRECISION NOT NULL,
	altura VARCHAR(10) NULL,
	humedad VARCHAR(10) NULL,
	ph VARCHAR(10) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
    id_empaque BIGSERIAL NOT NULL,
	image VARCHAR(255) NULL,
	FOREIGN KEY(id_empaque) REFERENCES empaques(id) ON UPDATE CASCADE ON DELETE CASCADE
);


INSERT INTO products VALUES(1,'Cebolla','45',2,5,'980','30','10','2022-01-17 00:00:00','2022-01-17 00:00:00',6);
INSERT INTO products VALUES(2,'Piña','35',3,10,'1200','90','8','2022-01-17 00:00:00','2022-01-17 00:00:00',3);
INSERT INTO products VALUES(3,'Arroz','15',4,6,'750','45','6','2022-01-17 00:00:00','2022-01-17 00:00:00',4);
INSERT INTO products VALUES(4,'Papa','10',5,12,'890','50','5','2022-01-17 00:00:00','2022-01-17 00:00:00',5);
INSERT INTO products VALUES(5,'Higos','15',2,14,'880','35','7','2022-01-17 00:00:00','2022-01-17 00:00:00',4);
INSERT INTO products (producto, tiempoCosecha, cicloVida, cantidadHectarea, altura, humedad, created_at, updated_at, id_empaque) VALUES ('Piña','50','2','100','1200','6','2022-01-12','2022-01-12',1)


DROP TABLE IF EXISTS costos_producto CASCADE;
CREATE TABLE costos_producto(
	id BIGSERIAL PRIMARY KEY,
	product VARCHAR(255) NOT NULL,
	mano_obra BIGINT NULL,
	analisis_suelo BIGINT NULL,
	semillas BIGINT NULL,
	fumigacion BIGINT NULL,
	fertilizantes BIGINT NULL,
	equipo BIGINT NULL,
	asistencia BIGINT NULL,
	transporte BIGINT NULL default 0,
	FOREIGN KEY(product) REFERENCES products(producto) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO costos_producto VALUES(1,'Piña',5980000,150000,26000000,1150000,6310000,7420000,1200000,400000);
INSERT INTO costos_producto VALUES(2,'Papa',5980000,150000,26000000,1150000,6310000,7420000,1200000);
SELECT id, product, (mano_obra + analisis_suelo + semillas + fumigacion + fertilizantes + equipo + asistencia + transporte) AS total FROM costos_producto



DROP TABLE IF EXISTS dbPolicia CASCADE;
CREATE TABLE dbPolicia(
	id BIGSERIAL PRIMARY KEY,
	nombres VARCHAR(50) NOT NULL,
	apellidos VARCHAR(50) NOT NULL,
	placa VARCHAR(20) NOT NULL
);

INSERT INTO dbPolicia VALUES (1,'Jesus David','Boavita Reyes','P3423');
INSERT INTO dbPolicia VALUES (2,'Cristian Julian','Uribe Almeyda','P6382');
INSERT INTO dbPolicia VALUES (3,'Roman','Castañeda Osorio','G1269');
INSERT INTO dbPolicia VALUES (4,'Sandra Juliana','Rodriguez Molino','G6523');
INSERT INTO dbPolicia VALUES (5,'Oscar Andres','Perez Gaitan','P7450');





















DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	typeID VARCHAR(80) NOT NULL,
	numberID VARCHAR(80) NOT NULL UNIQUE,
	phone VARCHAR(80) NOT NULL UNIQUE,
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	session_token VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	image VARCHAR(255) NULL
);

DROP TABLE IF EXISTS cotizaciones CASCADE;
CREATE TABLE cotizaciones(
	id BIGSERIAL PRIMARY KEY,
	id_user BIGINT NOT NULL,
	product VARCHAR(255) NOT NULL,
	area DOUBLE PRECISION NOT NULL,
	tecnologias VARCHAR(255) NULL,
	estado_via VARCHAR(30) NOT NULL,
	ubicacion VARCHAR(150) NOT NULL,
	coordenadas VARCHAR(255) NOT NULL,
	toneladas DOUBLE PRECISION NULL,
	origen VARCHAR(50)  NULL,
	destino VARCHAR(50)  NULL,
	costo DOUBLE PRECISION NULL,
	medio VARCHAR(50)  NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(product) REFERENCES products(producto) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS user_has_roles CASCADE;
CREATE TABLE user_has_roles(
	id_user BIGINT NOT NULL,
	id_rol BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY (id_user, id_rol)
);



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
CREATE TABLE products_zone(
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

