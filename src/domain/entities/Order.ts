import { Price } from "../value-objects/Price";
import { SKU } from "../value-objects/SKU";
import { Quantity } from "../value-objects/Quantity";

type OrderItem = Readonly <{sku: SKU, unit: Price, qty: Quantity}>;

export class Order {
    private readonly items: OrderItem[] = [];
    private readonly domainEvents: DomainEvent[] = [];
    constructor(readonly id: OrderId, readonly curtomerId: CustomerId) {}

    static create(id: OrderId, customerId: CustomerId) {
        const order = new Order(id, customerId);
        order.record(new OrderCreated({orderId: id, customerId}));
        return order;
    }
}
