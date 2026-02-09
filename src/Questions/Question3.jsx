import { useState } from "react";

export default function Products() {
  const products = [
    { id: 1, name: "Mobile", price: 15000 },
    { id: 2, name: "Fridge", price: 10000 },
    { id: 3, name: "AC", price: 30000 }
  ];

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const toggleCart = (product) => {
    if (cart.includes(product.id)) {

      setCart(cart.filter(id => id !== product.id));
      setTotal(total - product.price);
    } else {
      
      setCart([...cart, product.id]);
      setTotal(total + product.price);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start p-10 bg-white">
      <div>
        <h2 className="text-xl font-bold text-center mb-4">
          Product List
        </h2>

        <table className="border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="border px-4 py-2">{p.name}</td>
                <td className="border px-4 py-2">{p.price}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => toggleCart(p)}
                    className={`px-3 py-1 rounded text-white ${
                      cart.includes(p.id)
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {cart.includes(p.id)
                      ? "Remove from Cart"
                      : "Add to Cart"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 bg-gray-200 p-4 text-center font-bold rounded">
          Total Price: {total}
        </div>
      </div>
    </div>
  );
}
