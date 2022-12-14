import { Router, Request, Response} from "express";
import { createMovie, deleteOneMovie, findMovieById, getAllMovies, updateOneMovie } from "./controllers/movieControllers";

// Validations
import { validate } from "./middleware/handleValidation";
import { movieCreateValidation } from "./middleware/movieValidation";

const router = Router()

export default router.get("/test", (req:Request, res:Response) => {
    res.status(200).send("Api Working")
})
.post("/movie", movieCreateValidation(), validate, createMovie)
.get("/movie/:id", findMovieById)
.get("/movie", getAllMovies)
.delete("/movie/:id", deleteOneMovie)
.patch("/movie/:id", movieCreateValidation(), validate, updateOneMovie)