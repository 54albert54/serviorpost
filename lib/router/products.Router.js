"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import data from "../data";
const products_Services_1 = require("../service/products.Services");
const express_1 = __importDefault(require("express"));
const service = new products_Services_1.productsServices();
const router = express_1.default.Router();
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = _req.query.id;
        if (typeof id == 'string') {
            const numId = parseInt(id);
            const response = yield service.showbyID(numId);
            if (!response) {
                res.json({ Alert: `no se encontro el id ${id}` });
            }
            else {
                res.json(response);
            }
        }
        else {
            const response = yield service.showAll();
            res.json(response);
        }
    }
    catch (error) {
        console.log(error);
    }
}));
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req;
    console.log('body', body.body);
    try {
        res.status(201).json({ body: "en espera" });
    }
    catch (error) {
        next(error);
    }
}));
const productsRouter = router;
exports.default = productsRouter;
// router.get('/:id',
//   validatorHandler(getProductSchema, 'params'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const product = await service.findOne(id);
//       res.json(product);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// router.post('/',
//   validatorHandler(createProductSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const body = req.body;
//       const newProduct = await service.create(body);
//       res.status(201).json(newProduct);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// router.patch('/:id',
//   validatorHandler(getProductSchema, 'params'),
//   validatorHandler(updateProductSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       const product = await service.update(id, body);
//       res.json(product);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// router.delete('/:id',
//   validatorHandler(getProductSchema, 'params'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       await service.delete(id);
//       res.status(201).json({id});
//     } catch (error) {
//       next(error);
//     }
//   }
// );
