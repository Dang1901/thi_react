import React, { createContext, useEffect, useState } from 'react'
import { FormProduct, IProduct } from '../Interface/product'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

type Props = {
    children: React.ReactNode
}

export const ProductCT = createContext({} as any)

const ProductContext = ({children}: Props) => {
    const [products, setProducts] = useState<IProduct[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get('http://localhost:3000/products');
                setProducts(data)
                return data
            } catch (error) {
                console.log(error);
                
            }
        })()
    },[]) 

    const onAdd  = async (productdata: FormProduct ) => {
        try {
            const {data} = await axios.post('http://localhost:3000/products', productdata)
            setProducts([...products, data])
            alert('Them san pham thanh cong')
            navigate('/')
        } catch (error) {
            console.log(error);
            
        }
    }

    const onUpdate = async (productdata: FormProduct, id: string | number ) => {
        try {
            const {data} = await axios.put('http://localhost:3000/products/'+id, productdata)
            const newproducts = products.map(product => (product.id==id)?data:product)
            setProducts(newproducts);
            alert('Cap nhat san pham thanh cong')
        } catch (error) {
            console.log(error);
            
        }
    }

    const onRemove = async (id: string | number) => {
        if(confirm('Ban chac chan muon xoa')) {
            try {
                const {data} = await axios.delete('http://localhost:3000/products/'+id)
                const newproduct = products.filter(product=> product.id!==id);
                setProducts(newproduct)
                alert('Xoa san pham thanh cong')
            } catch (error) {
                console.log(error);
                
            }
        }
    }
  return (
    <ProductCT.Provider value={{products, onAdd, onUpdate, onRemove}}>{children}</ProductCT.Provider>
  )
}

export default ProductContext