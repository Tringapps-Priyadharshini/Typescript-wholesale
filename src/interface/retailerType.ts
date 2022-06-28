export type productDetails = {
    productName:string,
    quantity:number
}
export type retailerType = [
    {
        name:string,
        address:string,
        products:productDetails[]
    },
    {
        name:string,
        address:string,
        products:productDetails[]
    },
    {
        name:string,
        address:string,
        products:productDetails[]
    }
]

