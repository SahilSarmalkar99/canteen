import { useEffect, useMemo, useState } from "react";
import { Search, User, CheckCircle } from "lucide-react";
import { getFoods } from "../api/foodApi";
import { createOrder } from "../api/orderApi";

export default function UserOrder() {
  const [foods, setFoods] = useState([]);
  const [userName, setUserName] = useState("");
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    try {
      const res = await getFoods();

      setFoods(
        res.data.foods ||
        res.data.data ||
        []
      );
    } catch (err) {
      console.log(err);
    }
  };

  const toggle = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const submit = async () => {
    if (!userName.trim()) {
      return alert("Please enter your name.");
    }

    if (selected.length === 0) {
      return alert("Please select at least one food.");
    }

    const items = selected.map((id) => ({
      Food: id,
    }));

    try {
      await createOrder({
        userName,
        items,
      });

      alert("Order submitted successfully!");

      setUserName("");
      setSelected([]);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredFoods = useMemo(() => {
    return foods.filter((food) =>
      food.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [foods, search]);

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto p-6">

        {/* Sticky Header */}

        <div className=" top-0 z-20 bg-white rounded-2xl shadow-lg p-6 mb-8">

          <h1 className="text-3xl font-bold">
            🍽 Place Your Order
          </h1>

          <p className="text-gray-500 mt-1">
            Choose your favorite food and place your order.
          </p>

          <div className="grid lg:grid-cols-2 gap-4 mt-6">

            <div className="relative">

              <User
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <div className="relative">

              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">

            <div className="flex gap-3">

              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                Selected: {selected.length}
              </span>

              <span className="bg-gray-100 px-4 py-2 rounded-full text-gray-600">
                {filteredFoods.length} Foods
              </span>

            </div>

            <button
              onClick={submit}
              disabled={!userName || selected.length === 0}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              Submit Order
            </button>

          </div>

        </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredFoods.map((food) => {
  const active = selected.includes(food._id);

  return (
    <div
      key={food._id}
      onClick={() => {
        if (food.available) {
          toggle(food._id);
        }
      }}
      className={`relative overflow-hidden rounded-2xl bg-white border transition-all duration-300
      ${
        food.available
          ? "cursor-pointer hover:-translate-y-1 hover:shadow-xl"
          : "opacity-60 cursor-not-allowed"
      }
      ${
        active
          ? "border-blue-600 ring-2 ring-blue-200"
          : "border-gray-200"
      }`}
    >

      {/* Selected Badge */}

      {active && (
        <div className="absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
          <CheckCircle size={20} />
        </div>
      )}

      {/* Availability */}

      <div className="absolute top-3 right-3 z-10">

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            food.available
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {food.available
            ? "Available"
            : "Unavailable"}
        </span>

      </div>

      {/* Image */}

      <div className="overflow-hidden">

        <img
          src={
            food.image ||
            "https://placehold.co/600x400?text=Food"
          }
          alt={food.name}
          className="w-full h-56 object-cover transition duration-500 hover:scale-105"
        />

      </div>

      {/* Body */}

      <div className="p-5">

        <h2 className="text-xl font-bold">
          {food.name}
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Freshly prepared and served.
        </p>

        <div className="flex flex-wrap gap-2 mt-4">

          {(food.availableIn || []).map((time) => (

            <span
              key={time}
              className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium capitalize"
            >
              {time}
            </span>

          ))}

        </div>

        <button
          type="button"
          disabled={!food.available}
          className={`mt-6 w-full py-3 rounded-xl font-semibold transition ${
            active
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } ${
            !food.available &&
            "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200"
          }`}
        >
          {active
            ? "Selected"
            : food.available
            ? "Select Food"
            : "Not Available"}
        </button>

      </div>

    </div>
  );
      })}
</div>

{/* Empty State */}

{filteredFoods.length === 0 && (

  <div className="bg-white rounded-2xl shadow p-16 text-center mt-8">

    <div className="text-6xl mb-5">
      🍽
    </div>

    <h2 className="text-2xl font-bold">
      No Foods Found
    </h2>

    <p className="text-gray-500 mt-2">
      Try searching with a different keyword.
    </p>

  </div>

)}

</div>

</div>
);
}