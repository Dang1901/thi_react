import { useContext, useEffect } from 'react'
import { ProductCT } from '../Context/productContext'
import { useForm } from 'react-hook-form';
import { FormProduct } from '../Interface/product';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
    const {onUpdate} = useContext(ProductCT);
    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormProduct>()
    const params = useParams();
    useEffect (() => {
      (async () =>{
          try {
              const {data} = await axios.get(`http://localhost:3000/products/${params.id}`);
              reset({
                  name:data.name,
                  image:data.image,
                  price:data.price,
                  description:data.description,
              })
          } catch (error) {
              // console.log(error);
              
           }
      })()
  },[])
    const onSubmit = (productdata: FormProduct) => {
        onUpdate(productdata, params.id)
    }
  return (
    <>
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Cap nhat san pham</h1>
    </div>
    <form className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Tên sach</label>
        <input {...register("name", { required: true, minLength: 6 })}
          className="border rounded-lg p-2 w-full bg-gray-100 text-lg focus:outline-none focus:border-blue-500" type="text" id="title" placeholder="Tên sản phẩm" />
        {errors.name && <span className="text-red-500 text-sm mt-1">Không được để trống và nhỏ hơn 6 ký tự</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Giá sach</label>
        <input {...register("price", { required: true, pattern: /^\d+$/ })}
          className="border rounded-lg p-2 w-full bg-gray-100 text-lg focus:outline-none focus:border-blue-500" type="text" id="price" placeholder="Giá sản phẩm" />
        {errors.price && <span className="text-red-500 text-sm mt-1">Giá phải là số và không âm</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="images" className="block text-gray-700 font-bold mb-2">Ảnh sach</label>
        <input {...register("image")}
          className="border rounded-lg p-2 w-full bg-gray-100 text-lg focus:outline-none focus:border-blue-500" type="text" id="images" placeholder="Ảnh sản phẩm" />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Mô tả</label>
        <textarea {...register("description")}
          className="border rounded-lg p-2 w-full bg-gray-100 text-lg focus:outline-none focus:border-blue-500" id="description" placeholder="Mô tả sản phẩm" />
      </div>

      <div className="text-left">
        <button type="submit" className="bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600">
          Thêm mới
        </button>
        <Link to={"/"} className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-600 ml-2">
          Về danh sách
        </Link>
      </div>
    </form>
  </>
  )
}

export default EditProduct