const express = require('express')
const router = express.Router();
import OwnerController from "../controllers/OwnerController";


router.route("/createowner").post(OwnerController.createOwner);
router.route("/display").get(OwnerController.getOwnerData);
router.route("/update/:id").put(OwnerController.updateOwner);
router.route("/delete/:id").delete(OwnerController.deleteOwner);
const OwnerRoute = router;

export default OwnerRoute;