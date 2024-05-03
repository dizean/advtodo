import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

//create new owner request name
async function createOwner(req: Request, res: Response) {
    try {
        const {name} = req.body;
            const result = await prisma.owner.create({
                data: {
                    name
                },
            });
            return result;
        res.status(200).json(result);
    } catch (error) {
        console.error('Error creating owner:', error);
        res.status(500).json({ message: 'Error creating todos', error });
    }
}
//retrieve all data
async function getOwnerData(req: Request, res: Response) {
    try {
      const data = await prisma.owner.findMany();
      return res.json(data); 
    } catch (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
//update owner request id and name
  async function updateOwner(req: Request, res: Response) {
    const ownerid = req.params.id;
    const  name  = req.body;
    try {
      const updatedOwner = await prisma.owner.update({
        where: {
          id: ownerid,
        },
        data: {
          name: name.name
        },
      });
      return res.status(200).json(updatedOwner);
    } catch (error) {
      console.error('Error updating owner:', error);
      return res.status(500).json({ message: 'Error updating owner', error });
    }
  }
//delete owner by id
  async function  deleteOwner(req: Request, res: Response) {
    const todoid = req.params.id;
    try{
    const deleteOwner = await prisma.owner.delete({
        where:{
          id: todoid
        }
      });
      return deleteOwner;
    res.status(200).json(deleteOwner);
    }
    catch (error) {
        console.error('Error deleting owner:', error);
        res.status(500).json({ message: 'Error deleting owner', error });
    }
}
//put in a list for export
const OwnerController = { createOwner, getOwnerData , updateOwner, deleteOwner};

export default OwnerController;