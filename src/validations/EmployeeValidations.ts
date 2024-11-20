import {body, param} from 'express-validator'

export class Validations{

    static validateMongoIDParameter = () => {
        return [
            param('id').isMongoId().withMessage('El ID no tiene un formato valido')
        ]
    }

    static validateCreateOrUpdateAnEmployee = () => {
        return [
            body('name')
                .notEmpty().withMessage('El nombre del empleado es obligatorio')
                .isString().withMessage('El nombre debe ser un string'),
            body('surname')
                .notEmpty().withMessage('El apellido del empleado es obligatorio')
                .isString().withMessage('El apellido debe ser un string'),
            body('email')
                .notEmpty().withMessage('El email del empleado es obligatorio')
                .isEmail().withMessage('El email debe tener un formato valido'),
            body('phone')
                .notEmpty().withMessage('El numero de telefono del empleado es obligatorio')
                .isLength({min: 9, max: 9}).withMessage('El numero de telefono debe tener un formato valido'),
            body('job')
                .notEmpty().withMessage('El puesto de trabajo del empleado es obligatorio')
                .isString().withMessage('El puesto de trabajo debe ser un string'),
            body('contractHours')
                .notEmpty().withMessage('Las horas de contrato del empleado son obligatorias')
                .isNumeric().withMessage('Las horas de contrato deben ser un tipo numerico')
        ]
    }

 }