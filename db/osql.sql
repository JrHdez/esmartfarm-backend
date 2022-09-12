DROP TABLE IF EXISTS producto CASCADE;
Create table producto (
	id bigserial primary key,
    producto VARCHAR(50) NULL UNIQUE, 
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

INSERT INTO producto VALUES(1,'Piña',10,540,10,4,4,3,10,1200,1800);
INSERT INTO producto VALUES(2,'Papa',5,115,10,5,25,5,12,2100,3100);
INSERT INTO producto VALUES(3,'Uchuva',15,120,10,5,15,2,14,1800,2800);

DROP TABLE IF EXISTS cotizaciones CASCADE;
CREATE TABLE cotizaciones(
	id BIGSERIAL PRIMARY KEY,
	id_user BIGINT NOT NULL,
	product VARCHAR(255) NOT NULL,
    tipo_cultivo VARCHAR(50) NOT NULL,
	area DOUBLE PRECISION NOT NULL,
	tecnologias VARCHAR(255) NULL,
	estado_via VARCHAR(30) NOT NULL,
	ubicacion VARCHAR(150) NOT NULL,
    compraArriendo VARCHAR(150) NOT NULL,
    departamento VARCHAR(150) NOT NULL,
    altura FLOAT NOT NULL,
	coordenadas VARCHAR(255) NOT NULL,
	toneladas DOUBLE PRECISION NULL,
	origen VARCHAR(50)  NULL,
	destino VARCHAR(50)  NULL,
    inversion_inicial FLOAT NULL,
    preparacion_suelo FLOAT NULL,
    sostenimiento_cultivo FLOAT NULL,
    cosecha FLOAT NULL,
    post_cosecha FLOAT NULL,
	costo_transporte FLOAT NULL,
	medio VARCHAR(50)  NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(product) REFERENCES producto(producto) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS empaques CASCADE;
CREATE TABLE empaques(
	id BIGSERIAL PRIMARY KEY,
	empaque VARCHAR(255) NOT NULL,
	producto VARCHAR(100) NOT NULL,
	dimensiones VARCHAR(255) NULL,
	resistencia VARCHAR(80) NULL,
	costoxhectarea FLOAT NOT NULL,
	FOREIGN KEY(producto) REFERENCES producto(producto) ON UPDATE CASCADE
);
INSERT INTO empaques VALUES(1,'Malla','Uchuva','30x30x30','Alta',50000);
INSERT INTO empaques VALUES(2,'Costal','Papa','30x30x30','Debil',35000);
INSERT INTO empaques VALUES(3,'Canasto','Piña','30x30x30','Media',200000);

DROP TABLE IF EXISTS maquinaria CASCADE;
Create table maquinaria (
    equipo_maquinaria VARCHAR(200) NULL, 
	tipo VARCHAR(30) NULL,
	fase_uso VARCHAR(100) NULL,
    producto VARCHAR(30) NULL,
	capacidad_toneladas INT NULL,
	toneladasxcultivo INT NULL,
	costo FLOAT NULL,
	cantidad INT NULL,
	inversion_inicial FLOAT NULL,
    FOREIGN KEY(producto) REFERENCES producto(producto) ON UPDATE CASCADE

);
COPY public.maquinaria FROM 'C:\PSQL\maquinaria.csv' DELIMITER ';' CSV HEADER;

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