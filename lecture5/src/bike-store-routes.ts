import {createBikeStore, findAllBikeStores} from "./bike-store-controller";
import {Router} from "express";

const router = Router()
router.post("/", createBikeStore);
router.get("/", findAllBikeStores);

export default router
