import { FastifyReply, FastifyRequest } from "fastify";
import { createOrder } from "@composition/container";

export const OrdersController = {
    async create(req: FastifyRequest, reply: FastifyReply) {
        const { orderId, customerId } = req.body as any;
        const out = await createOrder().execute({orderId, customerId});
        return reply.status(201).send(out);
    }
}