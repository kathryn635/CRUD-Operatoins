
export const products = [];
export const users = [];
export const orders = [];

let counter = 1;

export function nextId() {
    return (counter++).toString();
}