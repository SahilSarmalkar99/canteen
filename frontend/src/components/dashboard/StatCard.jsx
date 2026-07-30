import React from "react";

export default function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div
      className={`rounded-2xl shadow-lg p-6 text-white ${color}
      transition duration-300 hover:scale-105 hover:shadow-2xl`}
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="text-sm opacity-90">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div className="text-5xl opacity-80">
          {icon}
        </div>

      </div>
    </div>
  );
}