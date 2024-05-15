import express from 'express'
import { readFile, writeFile } from 'fs/promises'
import { nanoid } from 'nanoid'

const __dirname = import.meta.dirname

const app = express()

// habilitar el req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// archivos estáticos (public)
app.use(express.static(__dirname + '/public'))

// Donde está el json??
const pathFile = __dirname + "/data/todos.json"

// TO DO CRUD - CREATE, READ, UPDATE, DELETE
// READ
app.get('/todos', async (req, res) => {
    try {
        const stringTodos = await readFile(pathFile, 'utf8')
        const todos = JSON.parse(stringTodos)
        return res.json(todos)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})

// CREATE
app.get('/todos/create', async (req, res) => {
    try {
        const title = req.query.title

        const newTodo = {
            title: title,
            completed: false,
            id: nanoid()
        }

        const stringTodos = await readFile(pathFile, 'utf8')
        const todos = JSON.parse(stringTodos)

        todos.push(newTodo)

        await writeFile(pathFile, JSON.stringify(todos))

        return res.json(todos)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})

// DELETE
app.get('/todos/delete/:id', async (req, res) => {
    try {

        const id = req.params.id

        const stringTodos = await readFile(pathFile, 'utf8')
        const todos = JSON.parse(stringTodos)

        const todo = todos.find(item => item.id === id)
        if (!todo) {
            return res.status(404).json({ ok: false, msg: "todo no encontrado" })
        }

        const newTodos = todos.filter((item) => item.id !== id)
        await writeFile(pathFile, JSON.stringify(newTodos))
        return res.json(newTodos)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})

// UPDATE
app.get('/todos/update/:id', async (req, res) => {
    try {

        const id = req.params.id
        const { title = "", completed = false } = req.query

        const stringTodos = await readFile(pathFile, 'utf8')
        const todos = JSON.parse(stringTodos)

        const todo = todos.find(item => item.id === id)
        if (!todo) {
            return res.status(404).json({ ok: false, msg: "todo no encontrado" })
        }

        todo.title = title
        todo.completed = completed

        await writeFile(pathFile, JSON.stringify(todos))
        return res.json(todos)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('server andando...'))


//BUENAS-PRACTICAS-BUENAS-PRACTICAS-BUENAS-PRACTICAS-BUENAS-PRACTICAS-BUENAS-PRACTICAS-BUENAS-PRACTICAS-BUENAS-PRACTICAS-
//TO DO CRUD: CREATE READ UPDATE DELETE
//READ
// app.get('/todos', async(req, res) => {
//     try{
//         const stringTodos = await readFile(pathFile, 'utf-8')
//         const todos = JSON.parse(stringTodos)
//         return res.json(todos)
//     }catch(error){
//         console.log(error)
//         return res.status(500).json({ok: false})
//     }
// })

// //CREATE
// app.post('/todos', async(req, res) => {
//     try{
//         const title = req.body.title

//         const newTodo = {
//             title: title,
//             completed: false,
//             id: nanoid()
//         }

//         // leer todos los todos antes de push   
//         const stringTodos = await readFile(pathFile, 'utf-8')
//         const todos = JSON.parse(stringTodos)

//         todos.push(newTodo)

//         await writeFile(pathFile, JSON.stringify(todos))

//         return res.json(todos)

//     }catch(error){
//         console.log(error)
//         return res.status(500).json({ok: false})
//     }
// })

// //DELETE
// app.delete('/todos/:id', async(req, res) => {
//     try{

//         const id = req.params.id
//         // leer todos los todos antes de delete 
//         const stringTodos = await readFile(pathFile, 'utf-8')
//         const todos = JSON.parse(stringTodos)

//         const todo = todos.find(item => item.id === id)
//         if(!todo){
//             return res.status(404).json({ok: false, msg: "todo no encontrado"})
//         }

//         const newTodos = todos.filter((item) => item.id !== id)

//         await writeFile(pathFile, JSON.stringify(newTodos))

//         return res.json(newTodos)

//     }catch(error){
//         console.log(error)
//         return res.status(500).json({ok: false})
//     }
// })

// //UPDATE
// app.put('/todos/:id', async(req, res) => {

//     try{

//         const id = req.params.id
//         const {title = "", completed = false} = req.body
//         // leer todos los todos antes de delete 
//         const stringTodos = await readFile(pathFile, 'utf-8')
//         const todos = JSON.parse(stringTodos)

//         const todo = todos.find(item => item.id === id)
//         if(!todo){
//             return res.status(404).json({ok: false, msg: "todo no encontrado"})
//         }

//         todo.title = title
//         todo.completed = completed

//         await writeFile(pathFile, JSON.stringify(todos))
//         return res.json(todo)

//     }catch(error){
//         console.log(error)
//         return res.status(500).json({ok: false})
//     }


// })

