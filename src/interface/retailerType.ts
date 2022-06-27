export type productDetails = {
    productName:string,
    quantity:number
}
export type retailerType = [
    {
        cname:string,
        address:string,
        products:productDetails[]
    },
    {
        cname:string,
        address:string,
        products:productDetails[]
    },
    {
        cname:string,
        address:string,
        products:productDetails[]
    }
]

