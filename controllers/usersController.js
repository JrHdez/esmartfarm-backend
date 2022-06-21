const User = require('../models/user');
const Rol = require('../models/rol');
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');

module.exports = {
    async getAll(req, res, next){
        try {
            const data = await User.getAll();
            console.log(`Usuarios: ${data}`);
            return  res.status(201).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los usuarios'
            });
        }
    },

    async register(req, res, next){
        try {
            const user = req.body;
            const data = await User.create(user);
            
            console.log('voy a crear un rol');
            await Rol.create(data.id, 1); //Estableciedo rol por defecto (cliente)
            return res.status(201).json({
                success: true,
                message: 'El registro se realizó correctamente, puedes iniciar sesión.',
                data: data.id
                
            });

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del usuario.',
                error: error
            });
        }
    },

    async registerWithImage(req, res, next){
        try {
            
            const user = JSON.parse(req.body.user);
            console.log(`Datoss enviadoss usuario: ${user}`);
            
            const files = req.files;

            if (files.length > 0){
                const pathImage = `image_${Date.now()}`; //Nombre del archivo
                const url = await storage(files[0],pathImage);

                if (url != undefined && url != null){
                    user.image = url;  
                }
            }

            const data = await User.create(user);
            
            await Rol.create(data.id, 1); //Estableciedo rol por defecto (cliente)
            return res.status(201).json({
                success: true,
                message: 'El registro se realizó correctamente, puedes iniciar sesión.',
                data: data.id
                
            });

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del usuario.',
                error: error
            });
        }
    },

    async login(req,res,next){
        try {
            
            const numberID = req.body.numberID;      
            const password = req.body.password;
            console.log(req.body.numberID)
            const myUser = await User.findbyNoId(numberID);
            

            if  (!myUser){
                return res.status(401).json({
                    success: false,
                    message: 'El usuario no fue encontrado',
        
                });
            }

            if(User.isPasswordMatched(password,myUser.password)){
                const token = jwt.sign({id: myUser.id,numberID: myUser.numberID}, keys.secretOrKey, {
                //    expiresIn: (60*60*24) 
                });
                const data = { 
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    typeID: myUser.typeid,
                    numberID: myUser.numberid,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`
                    // roles: myUser.roles
                }
                console.log(data);

                await User.updateToken(myUser.id, `JWT ${token}`);

                console.log(`Usuaario enviado: ` + data);

                return res.status(201).json({
                    success: true,
                    message: 'Se ha autenticado correctamente',
                    data: data
                });
            }
            else{
                return res.status(401).json({
                    success: false,
                    message: 'La contraseña es incorrecta',
                    data: {}
                });
            } 
        } 
        
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                meesage: 'Error al momento de hacer el login',
                error: error
            })
        }
                
        }

    

}