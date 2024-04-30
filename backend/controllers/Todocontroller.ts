import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

async function CreateList(req: Request, res: Response) {
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


const TodoController = { CreateList };

export default TodoController;
