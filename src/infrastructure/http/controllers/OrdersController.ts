import { FastifyReply, FastifyRequest } from "fastify";
import { AddItemToOrder } from "@application/use-cases/AddItemToOrderUseCase";
import { AppError } from "@application/errors";

export const makeOrdersController = (uc: AddItemToOrder) => ({
    addItem: async (req: FastifyRequest, reply: FastifyReply) => {
        const body = req.body as any;
        const res = await uc.execute({
            orderId: req.parans["orderId"] as string,
            sku: body.sku, qty: body.qty, currency: body.currency
        });
        if (!res.ok){
            const {status, body} = mapAppErrorToHttp(res.error);
            return reply.code(status).send(body);
        }
        return reply.code(200).send(res.value);
    }
})

    function mapAppErrorToHttp(e: AppError) {
        switch (e.type) {
            case "validation":
                return {status: 400, body: e};
            case "not_found":
                return {status: 404, body: e};
            case "conflict":
                return {status: 409, body: e};
            default:
                return {status: 503, body: e};
        }
    }