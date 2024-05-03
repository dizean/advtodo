const express = require('express')
const router = express.Router();
import OwnerController from "../controllers/OwnerController";


router.route("/createowner").post(OwnerController.createOwner); // create
router.route("/display").get(OwnerController.getOwnerData); //retrieve
router.route("/update/:id").put(OwnerController.updateOwner); // update
router.route("/delete/:id").delete(OwnerController.deleteOwner); //delete
const OwnerRoute = router;

export default OwnerRoute;