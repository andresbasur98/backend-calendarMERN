const Evento = require("../models/Evento");


const getEventos = async ( req, res) => {

    const eventos = await Evento.find()
                                .populate('user', 'name');

    res.json({
        ok: true,
        eventos
    });

}

const crearEventos = async ( req, res ) => {

    const evento = new Evento(req.body);

    try {

      evento.user = req.uid

      const eventoDB = await evento.save()

       res.json({
           ok: true,
           evento: eventoDB
       })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}


const actualizarEvento = async ( req, res ) => {

    const eventoId =  req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById( eventoId );

        if( !evento ){
           return res.status(404).json({
                ok: false,
                msg: 'Este evento no existe'
            })
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No autorizado para realizar esta acción'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );
        
        res.json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}


const eliminarEvento = async( req, res ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    
    try {
        
        const evento = await Evento.findById( eventoId );
        
        if( !evento ){
            return res.status(404).json({
                 ok: false,
                 msg: 'Este evento no existe'
             })
         }
    
         if( evento.user.toString() !== uid ){
             return res.status(401).json({
                 ok: false,
                 msg: 'No autorizado para realizar esta acción'
             })
         }
        
        await Evento.findByIdAndDelete( eventoId);

        res.json({
            ok: true,
            evento: 'Evento Borrado'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Hable con el administrador'
        })
    }


}


module.exports = {
    getEventos,
    crearEventos,
    actualizarEvento,
    eliminarEvento,
}