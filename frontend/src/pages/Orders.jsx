import { useEffect, useState } from "react";
import {
  completeOrder,
  getOrders,
} from "../api/orderApi";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const load = async () => {
    try {
      const res = await getOrders();

      setOrders(
        (res.data.orders || []).filter(
          (order) => !order.closed
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const done = async (id) => {
    try {
      await completeOrder(id);
      load();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto p-8">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">

          <div>

            <h1 className="text-3xl font-bold">
              📋 Active Orders
            </h1>

            <p className="text-gray-500 mt-1">
              Manage customer orders
            </p>

          </div>

          <div className="bg-blue-600 text-white px-5 py-3 rounded-xl shadow mt-4 md:mt-0">
            Total Orders : {orders.length}
          </div>

        </div>

        {orders.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-16 text-center">

            <div className="text-6xl mb-4">
              🍽
            </div>

            <h2 className="text-2xl font-bold">
              No Active Orders
            </h2>

            <p className="text-gray-500 mt-2">
              All customer orders have been completed.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition-all p-6"
              >

                <div className="flex items-center gap-4 mb-5">

                  <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">

                    {order.userName.charAt(0).toUpperCase()}

                  </div>

                  <div>

                    <h2 className="text-xl font-bold">
                      {order.userName}
                    </h2>

                    <p className="text-gray-500 text-sm">
                      Customer
                    </p>

                  </div>

                </div>

                <h3 className="font-semibold mb-3">
                  Ordered Items
                </h3>

                <div className="flex flex-wrap gap-2 mb-6">

                  {order.items.map((item) => (

                    <span
                      key={item._id}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      🍽 {item.Food?.name}
                    </span>

                  ))}

                </div>

                <button
                  onClick={() => done(order._id)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
                >
                  ✅ Mark as Done
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}