const express = require('express')
const router = express.Router();
import OwnerController from "../controllers/OwnerController";


router.route("/createowner").post(OwnerController.createOwner);
router.route("/display").get(OwnerController.getOwnerData);

const OwnerRoute = router;

export default OwnerRoute;