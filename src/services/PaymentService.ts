import { Customer, Order, OrderStatus } from "@prisma/client"

import { PaymentData } from "../interface/PaymentData"

import { api } from "../lib/api"


export default class PaymentService {
    async process(order: Order, customer: Customer, payment: PaymentData): Promise<{transactionId: string; status: OrderStatus}> {
        try {
            // TODO: criar o customer
            const customerId = await this.createCustomer(customer)
            // TODO: processar a transação
            const transaction = await this.createTransaction(customerId, order, customer, payment)
            return {
                transactionId: transaction.transactionId,
                status: OrderStatus.PAID,
            }

        } catch (error) {
            console.error(
                "ERROR ON PROCESS PAYMENT: ",
                JSON.stringify(error, null, 2)
            )
            return {
                transactionId: "",
                status: OrderStatus.CANCELED,
            }
        }

    }

    private async createCustomer(customer: Customer): Promise<string> {
        const customerResponse = await api.get(`/customers?email=${customer.email}`)

        if (customerResponse.data?.data?.length > 0) {
            return customerResponse.data?.data[0]?.id
        }

        const customerParams = {
            name: customer.fullName,
            email: customer.email,
            mobilePhone: customer.mobile,
            cpfCnpj: customer.document,
            postalCode: customer.zipCode,
            address: customer.street,
            addressNumber: customer.number,
            complement: customer.complement,
            province: customer.neighborhood,
            notificationDisabled: true,
        }

        const response = await api.post("/customers", customerParams)

        return response.data?.id
    }

    private async createTransaction(
        customerId: string,
        order: Order,
        customer: Customer,
        payment: PaymentData
    ): Promise<{ transactionId: string, gatewayStatus: string }> {
        const paymentParams = {
            customer: customerId,
            billingType: "CREDIT_CARD",
            dueDate: new Date().toISOString(),
            value: order.total,
            description: `Pedido #${order.id}`,
            externalReference: order.id.toString(),
            creditCard: {
                holderName: payment.creditCardHolder,
                number: payment.creditCardNumber,
                expiryMonth: payment.creditCardExpiration?.split("/")[0],
                expiryYear: payment.creditCardExpiration?.split("/")[1],
                ccv: payment.creditCardSecurityCode,
            },
            creditCardHolderInfo: {
                name: customer.fullName,
                email: customer.email,
                cpfCnpj: customer.document,
                postalCode: customer.zipCode,
                addressNumber: customer.number,
                addressComplement: customer.complement,
                mobilePhone: customer.mobile,
            },
        }

        const response = await api.post("/payments", paymentParams)

        return {
            transactionId: response.data?.id,
            gatewayStatus: response.data?.status,
        }
    }

}