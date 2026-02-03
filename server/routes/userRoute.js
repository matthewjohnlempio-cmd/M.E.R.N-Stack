import express from "express";
import { 
    create, 
    deleteUser, 
    getAllUsers, 
    getUserById, 
    update,
    login  // import login controller
} from "../controller/userController.js";

const router = express.Router();

// Register & Get All Users
router
    .route("/")
    .post(create)
    .get(getAllUsers);

// Single user actions
router
    .route("/:id")
    .get(getUserById)
    .put(update)
    .delete(deleteUser);

// Login route
router.post("/login", login);

export default router;
