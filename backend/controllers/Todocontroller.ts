import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

async function CreateList(req: Request, res: Response) {
    const { owner, task } = req.body;
    const result = await prisma.todo.create({
        data: {
            owner: owner,
            task: task
        },
    });
    if (!result) {
        res.status(500).json({ message: 'Error creating todo', result });
    } else {
        res.status(200).json(result);
    }
}

const TodoController = { CreateList };

export default TodoController;
