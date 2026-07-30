import Food from "../models/Food.js";
import Order from "../models/Order.js";

export const getDashboard = async (req, res) => {
  try {
    // Food Counts
    const totalFoodsPromise = Food.countDocuments();
    const availableFoodsPromise = Food.countDocuments({ isAvailable: true });
    const unavailableFoodsPromise = Food.countDocuments({ isAvailable: false });

    // Orders
    const totalOrdersPromise = Order.countDocuments();
    const pendingOrdersPromise = Order.countDocuments({
      status: "Pending",
    });

    // Meal Availability
    const breakfastPromise = Food.countDocuments({
      availableIn: "Breakfast",
      isAvailable: true,
    });

    const lunchPromise = Food.countDocuments({
      availableIn: "Lunch",
      isAvailable: true,
    });

    const dinnerPromise = Food.countDocuments({
      availableIn: "Dinner",
      isAvailable: true,
    });

    // Recent Orders
    const recentOrdersPromise = Order.find()
      .populate("items.Food", "name image")
      .sort({ createdAt: -1 });

    const [
      totalFoods,
      availableFoods,
      unavailableFoods,
      totalOrders,
      pendingOrders,
      breakfast,
      lunch,
      dinner,
      recentOrders,
    ] = await Promise.all([
      totalFoodsPromise,
      availableFoodsPromise,
      unavailableFoodsPromise,
      totalOrdersPromise,
      pendingOrdersPromise,
      breakfastPromise,
      lunchPromise,
      dinnerPromise,
      recentOrdersPromise,
    ]);

    res.status(200).json({
      success: true,
      dashboard: {
        cards: {
          totalFoods,
          availableFoods,
          totalOrders,
          pendingOrders,
        },

        mealAvailability: {
          breakfast,
          lunch,
          dinner,
        },

        quickSummary: {
          totalFoods,
          availableFoods,
          unavailableFoods,
          totalOrders,
        },

        recentOrders,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};