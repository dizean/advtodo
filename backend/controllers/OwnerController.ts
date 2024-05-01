import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
async function createOwner(req: Request, res: Response) {
    try {
        const name = req.body;
            const result = await prisma.owner.create({
                data: {
                    name: name.owner
                },
            });
            return result;
        res.status(200).json(result);
    } catch (error) {
        console.error('Error creating owner:', error);
        res.status(500).json({ message: 'Error creating todos', error });
    }
}
async function getOwnerData(req: Request, res: Response) {
    try {
      const data = await prisma.owner.findMany();
      return res.json(data); 
    } catch (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
const OwnerController = { createOwner, getOwnerData};

export default OwnerController;