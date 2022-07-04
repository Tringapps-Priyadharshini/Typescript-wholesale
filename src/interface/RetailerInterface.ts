export interface product {
    id: string,
    productName: string,
    quantity: number,
    price:number,
    date:string
}

export interface retailer {
    retailers: {
        name: string,
        address: string,
        products: product[],
    }[]
}