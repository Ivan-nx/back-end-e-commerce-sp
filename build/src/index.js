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
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const CheckoutService_1 = __importDefault(require("./services/CheckoutService"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    const { message } = req.body;
    if (!message)
        return res.status(400).send({ error: "Message is required" });
    res.send({ message });
});
app.get('/snacks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { snack } = req.query;
    if (!snack)
        return res.status(400).send({ error: "Snack is required" });
    const snacks = yield prisma.snack.findMany({
        where: {
            snack: {
                equals: snack,
            }
        }
    });
    res.send(snacks);
}));
app.get('/orders/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const order = yield prisma.order.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            customer: true,
            orderItems: { include: { snack: true } }
        }
    });
    if (!order)
        return res.status(400).send({ error: "Order not found" });
    res.send(order);
}));
app.post('/checkout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cart, customer, payment } = req.body;
    const checkoutService = new CheckoutService_1.default();
    checkoutService.process(cart, customer, payment);
    res.send({ message: "Checkout completed" });
}));
app.listen(port, () => {
    console.log(`Sever runnig on port ${port}`);
});
