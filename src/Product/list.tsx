import { useContext } from "react";
import { ProductCT } from "../Context/productContext";
import { Link } from "react-router-dom";
import { IProduct } from "../Interface/product";

const ListProducts = () => {
  const { products, onRemove } = useContext(ProductCT);

  return (
    <div className="h-screen mx-auto px-4 py-8">
      <div className="mb-4">
        <Link to="/add">
          <button className="bg-cyan-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Add
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <div className="-mx-4 sm:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-8 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-400 text-gray-600 uppercase text-sm">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-gray-600 text-sm font-light">
                  {products.map((product: IProduct, index: number) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={product.image}
                          width={50}
                          height={100}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium flex space-x-2">
                        <Link
                          to={`/edit/${product.id}`}
                          className="text-indigo-500 hover:text-indigo-700"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            onRemove(product.id);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProducts;
