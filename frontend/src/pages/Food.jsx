import { useEffect, useMemo, useState } from "react";
import {
  addFood,
  getFoods,
  updateFood,
  deleteFood,
} from "../api/foodApi";

const TIME_OPTIONS = [
  "evergreen",
  "morning",
  "afternoon",
  "evening",
];

export default function Food() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    image: "",
    isAvailable: true,
    availableIn: ["evergreen"],
  });

  const fetchFoods = async () => {
    try {
      const res = await getFoods();

      const data =
        res.data.foods ||
        res.data.data ||
        res.data ||
        [];

      setFoods(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleTime = (time) => {
    if (form.availableIn.includes(time)) {
      setForm({
        ...form,
        availableIn: form.availableIn.filter((t) => t !== time),
      });
    } else {
      setForm({
        ...form,
        availableIn: [...form.availableIn, time],
      });
    }
  };

 const submit = async (e) => {
  e.preventDefault();

  try {
    if (editId) {
      await updateFood(editId, form);
    } else {
      await addFood(form);
    }

    setForm({
      name: "",
      image: "",
      isAvailable: true,
      availableIn: ["evergreen"],
    });

    setEditId(null);
    setShowModal(false);

    fetchFoods();
  } catch (err) {
    console.log(err);
  }
    };
    
const handleEdit = (food) => {
  setEditId(food._id);

  setForm({
    name: food.name,
    image: food.image,
    isAvailable: food.isAvailable,
    availableIn: food.availableIn || [],
  });

  setShowModal(true);
    };
    
    const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this food?"
  );

  if (!confirmDelete) return;

  try {
    await deleteFood(id);
    fetchFoods();
  } catch (err) {
    console.log(err);
  }
}; 

  const filteredFoods = useMemo(() => {
    return foods.filter((food) =>
      food.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [foods, search]);

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

        <h1 className="text-3xl font-bold">
          🍽 Food Management
        </h1>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-3 w-72 bg-white"
          />

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg font-semibold"
          >
            + Add Food
          </button>

        </div>

      </div>

      {/* Food Grid */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredFoods.map((food) => (

          <div
            key={food._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >

            <img
              src={
                food.image ||
                "https://placehold.co/600x400?text=Food"
              }
              alt={food.name}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">

              <div className="flex justify-between items-start">

                <h2 className="font-bold text-xl">
                  {food.name}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    food.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {food.available
                    ? "Available"
                    : "Unavailable"}
                </span>

              </div>

              <div className="flex flex-wrap gap-2 mt-4">

                {(food.availableIn || []).map((item) => (

                  <span
                    key={item}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm capitalize"
                  >
                    {item}
                  </span>

                ))}

              </div>

              <div className="flex gap-3 mt-6">

                <button
  onClick={() => handleEdit(food)}
  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg py-2"
>
  Edit
</button>

                <button
  onClick={() => handleDelete(food._id)}
  className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2"
>
  Delete
</button>

              </div>

            </div>

          </div>

        ))}

          </div>
            {/* Add Food Modal */}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl">

            {/* Header */}

            <div className="flex justify-between items-center border-b p-5">

              <h2 className="text-xl font-bold">
  {editId ? "Edit Food" : "Add Food"}
</h2> 

              <button
                onClick={() => {
  setShowModal(false);
  setEditId(null);
  setForm({
    name: "",
    image: "",
    isAvailable: true,
    availableIn: ["evergreen"],
  });
}}
                className="text-2xl font-bold hover:text-red-500"
              >
                ×
              </button>

            </div>

            {/* Form */}

            <form
              onSubmit={submit}
              className="p-6 space-y-5"
            >

              <div>

                <label className="block mb-2 font-semibold">
                  Food Name
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="Pizza"
                  className="w-full border rounded-lg p-3"
                  required
                />

              </div>

              <div>

                <label className="block mb-2 font-semibold">
                  Image URL
                </label>

                <input
                  type="text"
                  value={form.image}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      image: e.target.value,
                    })
                  }
                  placeholder="https://example.com/image.jpg"
                  className="w-full border rounded-lg p-3"
                />

              </div>

              {form.image && (

                <img
                  src={form.image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border"
                />

              )}

              <div>

                <label className="flex items-center gap-3">

                  <input
                    type="checkbox"
                    checked={form.isAvailable}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        isAvailable: e.target.checked,
                      })
                    }
                  />

                  <span className="font-semibold">
                    Available
                  </span>

                </label>

              </div>

              <div>

                <label className="block mb-3 font-semibold">
                  Available During
                </label>

                <div className="flex flex-wrap gap-2">

                  {TIME_OPTIONS.map((time) => {

                    const active =
                      form.availableIn.includes(time);

                    return (
                      <button
                        type="button"
                        key={time}
                        onClick={() => handleTime(time)}
                        className={`px-4 py-2 rounded-full border transition ${
                          active
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white hover:bg-gray-100"
                        }`}
                      >
                        {time}
                      </button>
                    );

                  })}

                </div>

              </div>

              <div className="flex justify-end gap-3 pt-4">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 rounded-lg border"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                  {editId ? "Update Food" : "Add Food"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}