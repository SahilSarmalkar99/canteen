import Food from "../models/Food.js";

// Add Food
export const addFood = async (req, res) => {
  try {
    const { name, image, isAvailable, availableIn } = req.body;

    const food = await Food.create({
      name,
      image,
      isAvailable,
      availableIn,
    });

    res.status(201).json({
      success: true,
      message: "Food added successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Foods
export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ name: 1 });

    res.json({
      success: true,
      foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Food
export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.json({
      success: true,
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update Food
export const updateFood = async (req, res) => {
  try {
    const { name, image, isAvailable, availableIn } = req.body;

    const food = await Food.findByIdAndUpdate(
      req.params.id,
      {
        name,
        image,
        isAvailable,
        availableIn,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.json({
      success: true,
      message: "Food updated successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete Food
export const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.json({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Dashboard API
export const dashboard = async (req, res) => {
  try {
    const totalFoods = await Food.countDocuments();

    const availableFoods = await Food.countDocuments({
      isAvailable: true,
    });

    const unavailableFoods = await Food.countDocuments({
      isAvailable: false,
    });

    const breakfast = await Food.countDocuments({
      availableIn: "Breakfast",
    });

    const lunch = await Food.countDocuments({
      availableIn: "Lunch",
    });

    const dinner = await Food.countDocuments({
      availableIn: "Dinner",
    });

    res.json({
      success: true,
      dashboard: {
        totalFoods,
        availableFoods,
        unavailableFoods,
        breakfast,
        lunch,
        dinner,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};