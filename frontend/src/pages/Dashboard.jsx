import { useEffect, useState } from "react";

import {
  FaHamburger,
  FaCheckCircle,
  FaClipboardList,
  FaClock,
} from "react-icons/fa";

import { getDashboard } from "../api/dashboardApi";

import StatCard from "../components/dashboard/StatCard";
import FoodChart from "../components/dashboard/FoodChart";
import RecentOrders from "../components/dashboard/RecentOrders";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  const loadDashboard = async () => {
    try {
      const res = await getDashboard();

      console.log(res.data);

      setDashboard(res.data.dashboard);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (!dashboard) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const { cards, mealAvailability, quickSummary, recentOrders } = dashboard;

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Dashboard</h1>

          <p className="text-gray-500 mt-2">Food Ordering System Overview</p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            title="Total Foods"
            value={cards.totalFoods}
            icon={<FaHamburger />}
            color="bg-gradient-to-r from-blue-500 to-blue-700"
          />

          <StatCard
            title="Available"
            value={cards.availableFoods}
            icon={<FaCheckCircle />}
            color="bg-gradient-to-r from-green-500 to-green-700"
          />

          <StatCard
            title="Total Orders"
            value={cards.totalOrders}
            icon={<FaClipboardList />}
            color="bg-gradient-to-r from-purple-500 to-purple-700"
          />

          <StatCard
            title="Pending Orders"
            value={cards.pendingOrders}
            icon={<FaClock />}
            color="bg-gradient-to-r from-orange-500 to-red-500"
          />
        </div>


        {/* Recent Orders */}

        <div className="mt-8">
          <RecentOrders orders={recentOrders} />
        </div>


      </div>
    </div>
  );
}
