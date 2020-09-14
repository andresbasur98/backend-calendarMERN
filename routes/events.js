const { Router } = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { getEventos, crearEventos, actualizarEvento, eliminarEvento } = require('../controllers/events');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


// router.use( validarJWT ); Si no queremos indicarselo a cada uno 

// Obtener eventos
router.get('/', validarJWT, getEventos);

// Crear evento
router.post('/', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
    validarCampos,
    validarJWT
], crearEventos);

// Actualizar evento
router.put('/:id', validarJWT, actualizarEvento);

// Borrar evento
router.delete('/:id', validarJWT, eliminarEvento);

module.exports =  router
