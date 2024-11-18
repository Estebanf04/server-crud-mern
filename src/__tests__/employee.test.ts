import request from 'supertest'
import app from '../server'

describe('GET /api/employees', () => {

    test('url exist', async () => {
        const res = await request(app).get('/api/employees')
        expect(res.status).not.toBe(404)
    })

    test('show data property', async () => {
        const res = await request(app).get('/api/employees')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')
        expect(res.headers['content-type']).toMatch(/json/)
    })
})

describe('GET /api/employees/:id', () => {

    test('Throws an error if the employee is not found', async () => {
        const res = await request(app).get('/api/employees/47381aeddd91a4b391e6a9e2') // non-existent id
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('error')
        expect(res.body.error).toBe('No existe el empleado buscado')
        expect(res.status).not.toBe(200)
    })

    test('Throws an error if the ID is not valid', async () => {
        const res = await request(app).get('/api/employees/HiImAnId') // non-valid id
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors[0].msg).toBe('El ID no tiene un formato valido')
        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    test('return data when search for an existing employee', async () => {
        const res = await request(app).get('/api/employees/67386aeddd91a4b391e6a9e7') // valid an existent id
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveProperty('_id')
        expect(res.status).not.toBe(400)
        expect(res.body).not.toHaveProperty('error')
    })
})

describe('POST /api/employees', () => {

    test('Sending an empty record', async () => {
        const res = await request(app).post('/api/employees').send({})
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(12)
        expect(res.status).not.toBe(201)
    })

    test('Sending a valid record', async () => {
        const res = await request(app).post('/api/employees')
        .send({
            _id: "67344ac3c57ef9aead80259c", // a valid custom id for testing in POST, PUT, DELETE
            name: "Empleado",
            surname: "De Prueba",
            email: "empleadodeprueba@gmail.com",
            phone: "744011438",
            job: "FullStack Developer Jr",
            contractHours: 40
        })
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('Empleado creado correctamente')
        expect(res.body).toHaveProperty('data')
        expect(res.status).not.toBe(400)
        expect(res.body).not.toHaveProperty('error')
    })
})

describe('PUT /api/employees/:id', () => {

    test('Throws an error if the employee is not found', async () => {
        const res = await request(app).put('/api/employees/47381aeddd91a4b391e6a9e2') // non-existent id
        .send({
            name: "Empleado",
            surname: "De Prueba",
            email: "empleadodeprueba@gmail.com",
            phone: "744011438",
            job: "FullStack Developer Jr",
            contractHours: 40
        })
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('error')
        expect(res.body.error).toBe('No existe el empleado buscado')
        expect(res.status).not.toBe(200)
    })

    test('Throws an error if the ID is not valid', async () => {
        const res = await request(app).put('/api/employees/HiImAnId') // non-valid id
        .send({
            name: "Empleado",
            surname: "De Prueba",
            email: "empleadodeprueba@gmail.com",
            phone: "744011438",
            job: "FullStack Developer Jr",
            contractHours: 40
        })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors[0].msg).toBe('El ID no tiene un formato valido')
        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    test('Sending a valid record', async () => {
        const res = await request(app).put('/api/employees/67344ac3c57ef9aead80259c') // a valid custom id for testing in POST, PUT, DELETE
        .send({
            name: "Empleado - Actualizado",
            surname: "De Prueba",
            email: "empleadodeprueba@gmail.com",
            phone: "744011438",
            job: "FullStack Developer SSR",
            contractHours: 40
        })
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('Empleado actualizado correctamente')
        expect(res.body).toHaveProperty('data')
        expect(res.status).not.toBe(400)
        expect(res.body).not.toHaveProperty('error')
    })
})

describe('DELETE /api/employees/:id', () => {

    test('Throws an error if the employee is not found', async () => {
        const res = await request(app).delete('/api/employees/47381aeddd91a4b391e6a9e2') // non-existent id
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('error')
        expect(res.body.error).toBe('No existe el empleado buscado')
        expect(res.status).not.toBe(200)
    })

    test('Throws an error if the ID is not valid', async () => {
        const res = await request(app).delete('/api/employees/HiImAnId') // non-valid id
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors[0].msg).toBe('El ID no tiene un formato valido')
        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    test('deleting a existent record', async () => {
        const res = await request(app).delete('/api/employees/67344ac3c57ef9aead80259c') // a valid custom id for testing in POST, PUT, DELETE
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('msg')
        expect(res.body.msg).toBe('Empleado eliminado correctamente')
        expect(res.status).not.toBe(400)
        expect(res.body).not.toHaveProperty('error')

    })
})