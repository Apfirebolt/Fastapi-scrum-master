import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

const Scheduler = () => {
  const [monthDays, setMonthDays] = useState([]);

  useEffect(() => {
    let days = [];
    let now = dayjs();

    for (let i = 0; i < 30; i += 1) {
      let currentDate = now.add(i, "day");
      days.push(currentDate.format("MMMM D, YYYY"));
    }
    setMonthDays(days);
  }, []);

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">Scheduler</h1>
        </div>
      </div>
      <div class="grid grid-cols-7 px-2 gap-2">
        {monthDays.map((item, index) => {
          return (
            <div class="p-6 my-2 bg-blue-300 text-gray-700 text-center shadow-inner">
              <p>{item}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Scheduler;
