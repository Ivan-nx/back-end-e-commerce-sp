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
const PaymentService_1 = __importDefault(require("./PaymentService"));
class CheckoutService {
    // new CheckoutService()
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    process(cart, customer, payment) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: "puxar" os dados de snacks do BD
            // in: [1,2,3,4]
            const snacks = yield this.prisma.snack.findMany({
                where: {
                    id: {
                        in: cart.map((snack) => snack.id),
                    },
                },
            });
            // console.log(`snacks`, snacks)
            const snacksInCart = snacks.map((snack) => {
                var _a, _b;
                return (Object.assign(Object.assign({}, snack), { price: Number(snack.price), quantity: (_a = cart.find((item) => item.id === snack.id)) === null || _a === void 0 ? void 0 : _a.quantity, subTotal: ((_b = cart.find((item) => item.id === snack.id)) === null || _b === void 0 ? void 0 : _b.quantity) *
                        Number(snack.price) }));
            });
            // console.log(`snacksInCart`, snacksInCart)
            // TODO: registrar os dados do cliente no BD
            const customerCreated = yield this.createCustomer(customer);
            //console.log(`customerCreated`, customerCreated)
            // TODO: criar uma order orderitem
            const orderCreated = yield this.createOrder(snacksInCart, customerCreated);
            console.log(`orderCreated`, orderCreated);
            // TODO: processar o pagamento
            const transaction = yield new PaymentService_1.default().process(orderCreated, customerCreated, payment);
        });
    }
    createCustomer(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerCreated = yield this.prisma.customer.upsert({
                where: { email: customer.email },
                update: customer,
                create: customer,
            });
            return customerCreated;
        });
    }
    createOrder(snacksInCart, customer) {
        return __awaiter(this, void 0, void 0, function* () {
            const total = snacksInCart.reduce((acc, snack) => acc + snack.subTotal, 0);
            const orderCreated = yield this.prisma.order.create({
                data: {
                    total,
                    customer: {
                        connect: { id: customer.id }
                    },
                    orderItems: {
                        createMany: {
                            data: snacksInCart.map((snack) => ({
                                snackId: snack.id,
                                quantity: snack.quantity,
                                subTotal: snack.subTotal,
                            }))
                        }
                    }
                },
                include: {
                    customer: true,
                    orderItems: { include: { snack: true } }
                }
            });
            return orderCreated;
        });
    }
}
exports.default = CheckoutService;
