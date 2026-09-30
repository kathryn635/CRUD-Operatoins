export class Order {
    constructor(id, userId, productIds, totalAmount) {
        this.id = id;
        this.userId = userId;
        this.productIds = productIds;
        this.totalAmount = totalAmount;
        this.status = 'pending';
    }
}