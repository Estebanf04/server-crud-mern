import { Request, Response } from "express"
import Employee from "../models/Employee"

export class EmployeeController{

    static getAll = async (req: Request, res: Response) => {
        try {
            const employees = await Employee.find()
            res.json({data: employees})
        } 
        catch (error) {
            res.status(500).json({error: 'Ha habido un error al retornar los datos'})
        }
    }

    static getEmployeeById = async (req: Request, res: Response) => {
        const {id} = req.params
        try {
            const employee = await Employee.findById(id)
            res.json({data: employee})
        } 
        catch (error) {
            res.status(500).json({error: 'Ha habido un error al retornar el registro'})
        }
    }

    static createEmployee = async (req: Request, res: Response) => {
        const newEmployee = new Employee(req.body)
        try {
            await newEmployee.save()
            res.status(201).json({msg: 'Empleado creado correctamente', data: newEmployee})
        } 
        catch (error) {
            res.status(500).json({error: 'Ha habido un error al crear un nuevo registro'})
        }
    }

    static updateEmployee = async (req: Request, res: Response) => {
        const {id} = req.params
        try {
            const employee = await Employee.findById(id)
    
            employee.name = req.body.name
            employee.surname = req.body.surname
            employee.email = req.body.email
            employee.phone = req.body.phone
            employee.job = req.body.job
            employee.contractHours = req.body.contractHours
            await employee.save()

            res.json({msg: 'Empleado actualizado correctamente', data: employee})
        } 
        catch (error) {
            res.status(500).json({error: 'Ha habido un error al retornar el registro'})
        }
    }

    static deleteEmployee = async (req: Request, res: Response) => {
        const {id} = req.params
        try {
            const employee = await Employee.findById(id)
            await employee.deleteOne()
            res.json({msg: 'Empleado eliminado correctamente'})
        } 
        catch (error) {
            res.status(500).json({error: 'Ha habido un error al eliminar el registro'})
        }
    }
    
}