const express = require('express')
const router = express.Router();
import TodoController from "../controllers/Todocontroller";

router.route("/create").post(TodoController.CreateList);


const TodoRouter = router;

export default TodoRouter;