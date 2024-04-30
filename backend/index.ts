import express from 'express'
import { PrismaClient } from '@prisma/client'
const cors = require('cors');
const bodyParser = require('body-parser');


const prisma = new PrismaClient()
const app = express()
app.use(cors());
app.use(bodyParser.json());

app.post('/task', async (req, res) => {
  try {
    const { owner, task } = req.body
    const item = await prisma.todo.create({
      data: {
        owner,
        task
      },
    })
    res.json(item)
  } catch (error) {
    console.error('Error adding item:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// app.delete('/deleteitem/:id', async(req,res) =>{
//   const itemid = req.params.id;
//   const deleteItem = await prisma.item.delete({
//     where:{
//       id: itemid
//     }
//   })
//   console.log("Item is deleted" + deleteItem)
// })

// app.put('/updateitem/:id', async(req,res) =>{
//   const itemid = req.params.id;
//   const { name } = req.body;
//   const deleteItem = await prisma.item.update({
//     where:{
//       id: itemid
//     },
//     data:{
//       name
//     },
//   })
//   console.log("Item is deleted" + deleteItem)
// })

// app.get('/display', async (req, res) => {
//   const items = await prisma.item.findMany();
//   res.json(items);
// });


// const server = app.listen(3000, () => {
//   console.log('Server is running on port 3000')
// })

