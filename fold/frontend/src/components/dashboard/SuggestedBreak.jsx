import { useEffect, useState } from "react";

export default function SuggestedBreak({ bri, stress }) {

  const [message, setMessage] = useState("");

  useEffect(() => {

    if (bri < 30) {

      setMessage("You're doing great. Keep focusing!");

    } else if (bri < 60) {

      setMessage("Consider taking a short 5-10 minute break.");

    } else if (bri < 80) {

      setMessage("Take a 20-minute break to reduce cognitive load.");

    } else {

      setMessage("High burnout risk detected. Step away and rest for a while.");

    }

  }, [bri]);

  return (

    <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-800">

      <h3 className="text-lg font-semibold mb-2">
        Suggested Break
      </h3>

      <p className="text-gray-300 text-sm">
        {message}
      </p>

    </div>

  );

}