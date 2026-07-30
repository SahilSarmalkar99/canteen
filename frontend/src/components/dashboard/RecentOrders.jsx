export default function RecentOrders({ orders = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recent Orders</h2>

        <span className="text-sm text-gray-500">{orders.length} Orders</span>
      </div>

      <div className="overflow-x-auto overflow-y-auto max-h-[450px] border rounded-xl">
        <table className="min-w-full">
          <thead className="sticky top-0 bg-slate-50 z-10">
            <tr className="border-b">
              <th className="text-left px-4 py-3">Customer</th>

              <th className="text-left px-4 py-3">Foods</th>

              <th className="text-left px-4 py-3">Status</th>

              <th className="text-left px-4 py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="px-4 py-4 font-semibold">{order.userName}</td>

                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
                        >
                          {item.Food?.name}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
