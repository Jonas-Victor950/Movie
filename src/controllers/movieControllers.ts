import { body } from 'express-validator';
import { Request, Response } from "express";

// Model
import { MovieModel } from "../models/Movie";

// Logger
import Logger from "../../config/logger";

export async function createMovie(req: Request, res: Response) {
    try {
        const data = req.body
        const movie = await MovieModel.create(data)
        return res.status(201).json(movie)
    } catch (error: any) {
        Logger.error(`Pane no sistema: ${error.message}`)
    }
}

export async function findMovieById(req: Request, res: Response) {

    try {
        
        const id = req.params.id
        const movie = await MovieModel.findById(id)

        if(!movie) {
            return res.status(404).json({error: "O filme não existe."})
        }

        return res.status(200).json(movie)
    } catch (error: any) {
        Logger.error(`Pane no sistema: ${error.message}`)
    }
}

export async function getAllMovies(req: Request, res: Response) {
    try {
        const allMovies = await MovieModel.find()
        return res.status(200).json(allMovies)
    } catch (error: any) {
        Logger.error(`Pane no sistema: ${error.message}`)
    }
}

export async function deleteOneMovie(req: Request, res: Response) {
    try {
        const id = req.params.id 
        const movie = await MovieModel.findById(id)

        if(!movie) {
            return res.status(404).json({error: "O filme não existe."})
        }

        await movie.delete();
        return res.status(200).json("O filme foi deletado")

    } catch (error: any) {
        Logger.error(`Pane no sistema: ${error.message}`)
    }
}

export async function updateOneMovie(req: Request, res: Response) {
    try {
        const id = req.params.id 
        const data = req.body;
        const movie = await MovieModel.findById(id)

        if(!movie) {
            return res.status(404).json({error: "O filme não existe."})
        }

        await MovieModel.updateOne({ _id: id }, data)
        return res.status(200).json(data)

    } catch (error: any) {
        Logger.error(`Pane no sistema: ${error.message}`)
    }
}