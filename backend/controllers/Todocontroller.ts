import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
//retrieve all Item data
async function GetAllData(req: Request, res: Response) {
  try {
    const data = await prisma.todo.findMany();
    return res.json(data); 
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
//push all unsaved data to database
async function pushAlltoDB(req: Request, res: Response) {
    try {
        const todos = req.body;
        const createdTodos = await Promise.all(todos.map(async (todo: any) => {
            const result = await prisma.todo.create({
                data: {
                    owner: todo.owner,
                    task: todo.task
                },
            });
            return result;
        }));

        res.status(200).json(createdTodos);
    } catch (error) {
        console.error('Error creating todos:', error);
        res.status(500).json({ message: 'Error creating todos', error });
    }
}
//push only selected item to database
async function pushSelectedTodotoDB(req: Request, res: Response) {
    try {
        const owner = req.body;
            const result = await prisma.todo.create({
                data: {
                    owner: owner.owner,
                    task: owner.task
                },
            });
            return result;
        res.status(200).json(result);
    } catch (error) {
        console.error('Error creating todos:', error);
        res.status(500).json({ message: 'Error creating todos', error });
    }
}
//update by id
async function updateTodo(req: Request, res: Response) {
    const todoId = req.params.id;
    const selectedTodo = req.body;
    try {
      const updatedTodo = await prisma.todo.update({
        where: {
          id: todoId,
        },
        data: {
          owner: selectedTodo.owner,
          task: selectedTodo.task,
        },
      });
      return res.status(200).json(updatedTodo);
    } catch (error) {
      console.error('Error updating todo:', error);
      return res.status(500).json({ message: 'Error updating todo', error });
    }
  }
  //delete by id
async function  deleteTodo(req: Request, res: Response) {
    const todoid = req.params.id;
    try{
    const updateTodo = await prisma.todo.delete({
        where:{
          id: todoid
        }
      });
      return updateTodo;
    res.status(200).json(updateTodo);
    }
    catch (error) {
        console.error('Error creating todos:', error);
        res.status(500).json({ message: 'Error creating todos', error });
    }
}
//delete items associated with ownerid
async function  deleteTodobyOwner(req: Request, res: Response) {
  const ownerId = req.params.ownerId;
  try{
  const deletedTodos = await prisma.todo.deleteMany({
    where: { owner: ownerId }
  });
    return updateTodo;
  res.status(200).json(updateTodo);
  }
  catch (error) {
      console.error('Error creating todos:', error);
      res.status(500).json({ message: 'Error creating todos', error });
  }
}
//put in list for export
const TodoController = { pushAlltoDB,pushSelectedTodotoDB, GetAllData, updateTodo , deleteTodo, deleteTodobyOwner};

export default TodoController;
