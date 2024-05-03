    const express = require('express')
    const router = express.Router();
    import TodoController from "../controllers/Todocontroller";

    router.route("/pushList").post(TodoController.pushAlltoDB); //create
    router.route("/pushTodo").post(TodoController.pushSelectedTodotoDB);
    router.route("/display").get(TodoController.GetAllData);//retrieve
    router.route("/update/:id").put(TodoController.updateTodo); //update
    router.route("/delete/:id").delete(TodoController.deleteTodo); //delete
    router.route("/deleteowner/:ownerId").delete(TodoController.deleteTodobyOwner); 

    const TodoRouter = router;

    export default TodoRouter;