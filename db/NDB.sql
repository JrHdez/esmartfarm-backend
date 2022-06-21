
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
Create table personal (
    rol VARCHAR(100) NULL,
	costo_empresa_mes INT NULL,
	porcentaje_costo_admin float NULL,
	costo_admin INT NULL,
    costo_empresa INT NULL,
	fase_uso VARCHAR(100) NULL,
	porcentaje_ocupacion float NULL,
	costoxhectarea INT NULL
);
COPY public.personal FROM 'C:\PSQL\personal.csv' DELIMITER ';' CSV HEADER;

DROP TABLE IF EXISTS maquinaria CASCADE;
Create table maquinaria (
    equipo_maquinaria VARCHAR(200) NULL, 
	tipo VARCHAR(30) NULL,
	fase_uso VARCHAR(100) NULL,
    producto VARCHAR(30) NULL,
	capacidad_toneladas INT NULL,
	toneladasxcultivo INT NULL,
	costo INT NULL,
	cantidad INT NULL,
	inversion_inicial INT NULL
);
COPY public.maquinaria FROM 'C:\PSQL\maquinaria.csv' DELIMITER ';' CSV HEADER;

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

DROP TABLE IF EXISTS producto CASCADE;
Create table producto (
	id bigserial primary key,
    producto VARCHAR(50) NULL, 
	tiempo_preparacion int null,
	tiempo_sostenimiento int null,
	tiempo_cosecha int null,
	tiempomax_postcosecha int null,
	tiempomax_transporte int null,
	cantidad_cosechas int null,
	toneladasxhectarea int null,
	altura_min int null,
	altura_max int null
);

INSERT INTO products VALUES(1,'Piña',10,540,10,4,4,3,10,1200,1800);
INSERT INTO products VALUES(2,'Papa',5,115,10,5,25,5,12,2100,3100);
INSERT INTO products VALUES(3,'Uchuva',15,120,10,5,15,2,14,1800,2800);


















DROP TABLE IF EXISTS productos.pina CASCADE;
Create table productos.pina (
    no_registro VARCHAR(1000) NULL, 
	fecha_otorgado_noresulocion VARCHAR(1000) NULL,
    nombre VARCHAR(1000) NULL,
	clase_insumo VARCHAR(1000) NULL,
	nombre_empresa VARCHAR(1000) NULL,
	nit_empresa VARCHAR(1000) NULL,
	ingrediente_activo VARCHAR(1000) NULL,
	concentracion VARCHAR(1000) NULL,
	cat_toxic VARCHAR(1000) NULL,
	clase VARCHAR(1000) NULL,
	tipo_for VARCHAR(1000) NULL,
	costo_unitario FLOAT NULL,
	presentacion VARCHAR(1000) NULL,
	unidad VARCHAR(1000) NULL,
	cantidad_hectarea VARCHAR(1000) NULL,
	costo_hectarea FLOAT NULL,
	frecuencia_aplicacion VARCHAR(1000) NULL,
	tiempo_fase VARCHAR(1000) NULL,
	numero_aplicaciones VARCHAR(1000) NULL,
	costo_total FLOAT NULL
);
 COPY productos.pina FROM 'C:\PSQL\pina.csv' DELIMITER ';' CSV HEADER;
  ALTER TABLE IF EXISTS productos.pina
    ADD COLUMN id bigserial primary key; 
  

DROP TABLE IF EXISTS productos.papa CASCADE;
Create table productos.papa (
    no_registro VARCHAR(1000) NULL, 
	fecha_otorgado_noresulocion VARCHAR(1000) NULL,
    nombre VARCHAR(1000) NULL,
	clase_insumo VARCHAR(1000) NULL,
	nombre_empresa VARCHAR(1000) NULL,
	nit_empresa VARCHAR(1000) NULL,
	ingrediente_activo VARCHAR(1000) NULL,
	concentracion VARCHAR(1000) NULL,
	cat_toxic VARCHAR(1000) NULL,
	clase VARCHAR(1000) NULL,
	tipo_for VARCHAR(1000) NULL,
	costo_unitario FLOAT NULL,
	presentacion VARCHAR(1000) NULL,
	unidad VARCHAR(1000) NULL,
	cantidad_hectarea VARCHAR(1000) NULL,
	costo_hectarea FLOAT NULL,
	frecuencia_aplicacion VARCHAR(1000) NULL,
	tiempo_fase VARCHAR(1000) NULL,
	numero_aplicaciones VARCHAR(1000) NULL,
	costo_total FLOAT NULL
);
 COPY productos.papa FROM 'C:\PSQL\papa.csv' DELIMITER ';' CSV HEADER;
 ALTER TABLE IF EXISTS productos.papa
    ADD COLUMN id bigserial primary key; 
  
DROP TABLE IF EXISTS productos.uchuva CASCADE;
Create table productos.uchuva (
    no_registro VARCHAR(1000) NULL, 
	fecha_otorgado_noresulocion VARCHAR(1000) NULL,
    nombre VARCHAR(1000) NULL,
	clase_insumo VARCHAR(1000) NULL,
	nombre_empresa VARCHAR(1000) NULL,
	nit_empresa VARCHAR(1000) NULL,
	ingrediente_activo VARCHAR(1000) NULL,
	concentracion VARCHAR(1000) NULL,
	cat_toxic VARCHAR(1000) NULL,
	clase VARCHAR(1000) NULL,
	tipo_for VARCHAR(1000) NULL,
	costo_unitario FLOAT NULL,
	presentacion VARCHAR(1000) NULL,
	unidad VARCHAR(1000) NULL,
	cantidad_hectarea VARCHAR(1000) NULL,
	costo_hectarea FLOAT NULL,
	frecuencia_aplicacion VARCHAR(1000) NULL,
	tiempo_fase VARCHAR(1000) NULL,
	numero_aplicaciones VARCHAR(1000) NULL,
	costo_total FLOAT NULL
);
COPY productos.uchuva FROM 'C:\PSQL\uchuva.csv' DELIMITER ';' CSV HEADER;
ALTER TABLE IF EXISTS productos.uchuva
    ADD COLUMN id bigserial primary key; 

DROP TABLE IF EXISTS tierra CASCADE;
Create table tierra (
    departamento VARCHAR(100) NULL, 
	ciudad_muinicipio VARCHAR(100) NULL,
    compra_arriendo VARCHAR(30) NULL,
	costo float NULL,
	hectareas float NULL,
	costo_hectarea float NULL
);
 COPY public.tierra FROM 'C:\PSQL\tierra.csv' DELIMITER ';' CSV HEADER;
 
DROP TABLE IF EXISTS maquinaria CASCADE;
Create table maquinaria (
    equipo_maquinaria VARCHAR(200) NULL, 
	tipo VARCHAR(30) NULL,
	fase_uso VARCHAR(100) NULL,
    producto VARCHAR(30) NULL,
	capacidad_toneladas INT NULL,
	toneladasxcultivo INT NULL,
	costo INT NULL,
	cantidad INT NULL,
	inversion_inicial INT NULL
);
COPY public.maquinaria FROM 'C:\PSQL\maquinaria.csv' DELIMITER ';' CSV HEADER;

DROP TABLE IF EXISTS insumos CASCADE;
Create table insumos (
    insumo VARCHAR(200) NULL,
	clase_insumo VARCHAR(30) NULL,
	tipo_insumo VARCHAR(30) NULL,
	fase_uso VARCHAR(30) NULL,
    producto VARCHAR(30) NULL,
	costo INT NULL,
	cantidad INT NULL,
	unidad VARCHAR(30) NULL,
	cantidadxhectarea INT NULL,
	costoxhectarea INT NULL,
	frecuencia_aplicacion INT NULL,
	tiempo_fase INT NULL,	
	numero_aplicaciones INT NULL,
	costo_total INT NULL
);
--COPY public.insumos FROM 'C:\PSQL\insumos.csv' DELIMITER ';' CSV HEADER;
COPY public.insumos FROM 'C:\PSQL\insumos.csv' DELIMITER ';';
 
 DROP TABLE IF EXISTS personal CASCADE;
Create table personal (
    rol VARCHAR(100) NULL,
	costo_empresa_mes INT NULL,
	porcentaje_costo_admin float NULL,
	costo_admin INT NULL,
    costo_empresa INT NULL,
	fase_uso VARCHAR(100) NULL,
	porcentaje_ocupacion float NULL,
	costoxhectarea INT NULL
);
COPY public.personal FROM 'C:\PSQL\personal.csv' DELIMITER ';' CSV HEADER;

DROP TABLE IF EXISTS producto CASCADE;
Create table producto (
	id bigserial primary key,
    producto VARCHAR(50) NULL, 
	tiempo_preparacion int null,
	tiempo_sostenimiento int null,
	tiempo_cosecha int null,
	tiempomax_postcosecha int null,
	tiempomax_transporte int null,
	cantidad_cosechas int null,
	toneladasxhectarea int null,
	altura_min int null,
	altura_max int null
);
COPY public.producto FROM 'C:\PSQL\producto.csv' DELIMITER ';' CSV HEADER;














DROP TABLE IF EXISTS productos.uchuva CASCADE;
Create table productos.uchuva (
    no_registro VARCHAR(1000) NULL, 
	fecha_otorgado_noresulocion VARCHAR(1000) NULL,
    nombre VARCHAR(1000) NULL,
	clase_insumo VARCHAR(1000) NULL,
	nombre_empresa VARCHAR(1000) NULL,
	nit_empresa VARCHAR(1000) NULL,
	ingrediente_activo VARCHAR(1000) NULL,
	concentracion VARCHAR(1000) NULL,
	cat_toxic VARCHAR(1000) NULL,
	clase VARCHAR(1000) NULL,
	tipo_for VARCHAR(1000) NULL,
	costo_unitario float NULL,
	presentacion VARCHAR(1000) NULL,
	unidad VARCHAR(1000) NULL,
	cantidad_hectarea VARCHAR(1000) NULL,
	costo_hectarea float NULL,
	frecuencia_aplicacion VARCHAR(1000) NULL,
	tiempo_fase VARCHAR(1000) NULL,
	numero_aplicaciones VARCHAR(1000) NULL,
	costo_total FLOAT NULL
);
COPY productos.uchuva FROM 'C:\PSQL\uchuva.csv' DELIMITER ';' CSV HEADER;
ALTER TABLE IF EXISTS productos.uchuva
    ADD COLUMN id bigserial primary key; 
	
	DROP TABLE IF EXISTS productos.papa CASCADE;
Create table productos.papa (
    no_registro VARCHAR(1000) NULL, 
	fecha_otorgado_noresulocion VARCHAR(1000) NULL,
    nombre VARCHAR(1000) NULL,
	clase_insumo VARCHAR(1000) NULL,
	nombre_empresa VARCHAR(1000) NULL,
	nit_empresa VARCHAR(1000) NULL,
	ingrediente_activo VARCHAR(1000) NULL,
	concentracion VARCHAR(1000) NULL,
	cat_toxic VARCHAR(1000) NULL,
	clase VARCHAR(1000) NULL,
	tipo_for VARCHAR(1000) NULL,
	costo_unitario FLOAT NULL,
	presentacion VARCHAR(1000) NULL,
	unidad VARCHAR(1000) NULL,
	cantidad_hectarea VARCHAR(1000) NULL,
	costo_hectarea FLOAT NULL,
	frecuencia_aplicacion VARCHAR(1000) NULL,
	tiempo_fase VARCHAR(1000) NULL,
	numero_aplicaciones VARCHAR(1000) NULL,
	costo_total FLOAT NULL
);
 COPY productos.papa FROM 'C:\PSQL\papa.csv' DELIMITER ';' CSV HEADER;
 ALTER TABLE IF EXISTS productos.papa
    ADD COLUMN id bigserial primary key; 
	
	DROP TABLE IF EXISTS productos.piña CASCADE;
Create table productos.piña (
    no_registro VARCHAR(1000) NULL, 
	fecha_otorgado_noresulocion VARCHAR(1000) NULL,
    nombre VARCHAR(1000) NULL,
	clase_insumo VARCHAR(1000) NULL,
	nombre_empresa VARCHAR(1000) NULL,
	nit_empresa VARCHAR(1000) NULL,
	ingrediente_activo VARCHAR(1000) NULL,
	concentracion VARCHAR(1000) NULL,
	cat_toxic VARCHAR(1000) NULL,
	clase VARCHAR(1000) NULL,
	tipo_for VARCHAR(1000) NULL,
	costo_unitario FLOAT NULL,
	presentacion VARCHAR(1000) NULL,
	unidad VARCHAR(1000) NULL,
	cantidad_hectarea VARCHAR(1000) NULL,
	costo_hectarea FLOAT NULL,
	frecuencia_aplicacion VARCHAR(1000) NULL,
	tiempo_fase VARCHAR(1000) NULL,
	numero_aplicaciones VARCHAR(1000) NULL,
	costo_total VARCHAR(1000) NULL
);
 COPY productos.piña FROM 'C:\PSQL\pina.csv' DELIMITER ';' CSV HEADER;
  ALTER TABLE IF EXISTS productos.piña
    ADD COLUMN id bigserial primary key; 