    const express = require('express')
    const router = express.Router();
    import TodoController from "../controllers/Todocontroller";


    router.route("/display").get(TodoController.GetAllData);
    router.route("/pushList").post(TodoController.pushAlltoDB);
    router.route("/pushTodo").post(TodoController.pushSelectedTodotoDB);
    router.route("/update/:id").put(TodoController.updateTodo); 
    router.route("/delete/:id").delete(TodoController.deleteTodo); 


    const TodoRouter = router;

    export default TodoRouter;