import mongoose from "mongoose";
import colors from 'colors'
import {exit} from 'node:process'

export const connect = async () => {
    try {
        await mongoose.connect(process.env.URL_DATABASE)
        console.log(colors.bgGreen.bold('Conexion exitosa a la Base de datos'))
    } 
    catch (error) {
        console.log(colors.bgRed.bold('Ha habido un error al conectarse a la Base de datos'))
        exit(1)
    }
}