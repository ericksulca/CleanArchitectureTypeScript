import { Price } from "@domain/value-objects/Price";
import { SKU } from "@domain/value-objects/SKU";
import { Currency } from "@domain/value-objects/Currency";

export interface PricingService {
    getPrice(sku: SKU, currency: Currency): Promise<Price | null>;
}