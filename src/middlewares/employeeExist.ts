import { Request, Response, NextFunction } from "express";
import Employee from "../models/Employee";

export const employeeExist = async (req : Request, res : Response, next : NextFunction) => {
    const {id} = req.params
    const employee = await Employee.findById(id)
    if(!employee){
        res.status(404).json({error: 'No existe el empleado buscado'})
        return
    }
    next()
}
