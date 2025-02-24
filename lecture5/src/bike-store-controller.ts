import {Router, Request, Response} from "express";
import {BikeStoreRepository, CreateStore} from "./bike-store-repository";
import {HttpStatus} from "./http-status-codes";

const bikeStoreRepository = new BikeStoreRepository()

export const createBikeStore = async (req: Request, res: Response) => {
    const createStore = req.body as CreateStore
    const storeId = await bikeStoreRepository.create(createStore)
    res.status(HttpStatus.CREATED).json({ message: 'Store created', storeId });
}

export const findAllBikeStores = async (req: Request, res: Response) => {
    const allStores = await bikeStoreRepository.findAll()
    res.status(HttpStatus.OK).json(allStores)
}
