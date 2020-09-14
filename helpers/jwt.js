const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name) => { //Recibimos los parametros que van a ir en el payload

    return new Promise((resolve, reject) => {

        const payload = { uid, name };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, { //Generar el token
            expiresIn: '4h'
        },(err, token) => {
            if(err){
                reject('No se pudo generar el token')
            }

            resolve( token );
        })

    })

}


module.exports = {
    generarJWT
}



