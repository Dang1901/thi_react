export interface IProduct {
    id? : string | number;
    name: string,
    image: string,
    price: number,
    description: string
}
export type FormProduct = Pick<IProduct,'name'|'image'|'price'|'description'>