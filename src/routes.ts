import { Router } from "express";
import { EmployeeController } from "./controllers/EmployeeController";
import { Validations } from "./validations/EmployeeValidations";
import { catchingErrors } from "./middlewares/catchingErrors";
import { employeeExist } from "./middlewares/employeeExist";

const employeesRouter = Router()

    employeesRouter.get('/', EmployeeController.getAll)

    employeesRouter.get('/:id', 
        Validations.validateMongoIDParameter(),
        catchingErrors,
        employeeExist,
        EmployeeController.getEmployeeById
    )

    employeesRouter.post('/', 
        Validations.validateCreateOrUpdateAnEmployee(),
        catchingErrors,
        EmployeeController.createEmployee
    )

    employeesRouter.put('/:id', 
        Validations.validateMongoIDParameter(),
        Validations.validateCreateOrUpdateAnEmployee(),
        catchingErrors,
        employeeExist,
        EmployeeController.updateEmployee
    )

    employeesRouter.delete('/:id', 
        Validations.validateMongoIDParameter(),
        catchingErrors,
        employeeExist,
        EmployeeController.deleteEmployee
    )

export default employeesRouter	