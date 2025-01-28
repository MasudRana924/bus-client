import React, { useEffect, useState } from "react";
import { Armchair } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const BusSeatSelector = () => {
  const { busId } = useParams();
  const _id = busId;
  const [seatData, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch seat data
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await fetch(`http://localhost:5000/bus/${_id}/seats`);
        if (!response.ok) {
          throw new Error("Failed to fetch seat data");
        }
        const data = await response.json();
        setSeats(data.seats || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
    const interval = setInterval(fetchSeats, 30000); // Refresh seat data every 30 seconds
    return () => clearInterval(interval);
  }, [_id]);

  // Handle seat selection and hold
  const handleSeatSelect = async (seatNumber) => {
    if (!seatData.find((seat) => seat.seatNumber === seatNumber)?.isBooked) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/buses/${_id}/seats/${seatNumber}/hold`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to hold seat");
        }
        setSelectedSeats((prev) =>
          prev.includes(seatNumber)
            ? prev.filter((seat) => seat !== seatNumber)
            : [...prev, seatNumber]
        );
      } catch (err) {
        alert(err.message || "Error occurred while holding seat");
      }
    }
  };
  return (
    // <div className="mt-28 bg-gray-100 rounded-xl p-8 w-full max-w-md mx-auto">
    //   <div className="flex justify-between">
    //     <h2 className="text-md font-medium mb-4 text-start">Select Seat</h2>
    //   </div>
    //   <div className="flex gap-4">
    //     <button className="bg-red-500 px-2 py-1 rounded text-xs text-white font-medium hover:bg-red-600 transition-colors">
    //       Booked
    //     </button>

    //     <button className="bg-yellow-500 px-2 py-1 rounded text-xs text-white font-medium hover:bg-yellow-600 transition-colors">
    //       Hold
    //     </button>
    //   </div>

    //   <div className="flex justify-between mt-4">
    //     {/* Left Side Seats */}
    //     <div className="grid grid-cols-2 gap-4 mr-4">
    //       {seatData
    //         .filter((seat) => seat.seatNumber <= 20)
    //         .map((seat) => (
    //           <button
    //             key={seat._id}
    //             onClick={() => handleSeatSelect(seat.seatNumber)}
    //             disabled={seat.isBooked || (seat.holdUntil && new Date(seat.holdUntil) > new Date())}
    //             className={`p-1 rounded-md transition-colors ${seat.isBooked
    //               ? "bg-red-500 text-white cursor-not-allowed"
    //               : selectedSeats.includes(seat.seatNumber)
    //                 ? "bg-blue-500 text-white"
    //                 : seat.holdUntil && new Date(seat.holdUntil) > new Date()
    //                   ? "bg-yellow-500 text-black"
    //                   : "bg-white hover:bg-gray-200"
    //               }`}
    //           >
    //             <Armchair />
    //             <span className="block text-xs font-bold">{seat.seatNumber}</span>
    //           </button>
    //         ))}
    //     </div>

    //     {/* Right Side Seats */}
    //     <div className="grid grid-cols-2 gap-4 ml-4">
    //       {seatData
    //         .filter((seat) => seat.seatNumber > 20)
    //         .map((seat) => (
    //           <button
    //             key={seat._id}
    //             onClick={() => handleSeatSelect(seat.seatNumber)}
    //             disabled={seat.isBooked || (seat.holdUntil && new Date(seat.holdUntil) > new Date())}
    //             className={`p-1 rounded-md transition-colors ${seat.isBooked
    //               ? "bg-red-500 text-white cursor-not-allowed"
    //               : selectedSeats.includes(seat.seatNumber)
    //                 ? "bg-blue-500 text-white"
    //                 : seat.holdUntil && new Date(seat.holdUntil) > new Date()
    //                   ? "bg-yellow-500 text-black"
    //                   : "bg-white hover:bg-gray-200"
    //               }`}
    //           >
    //             <Armchair />
    //             <span className="block text-xs font-bold">{seat.seatNumber}</span>
    //           </button>
    //         ))}
    //     </div>
    //   </div>

    //   {/* Selected Seats Summary */}
    //   <div className="mt-4 text-center">
    //     <Link to="/checkout">
    //       <button
    //         className="bg-blue-500 h-12 w-3/4 mx-auto text-white border border-blue-500 rounded-md"
    //       >
    //         Continue
    //       </button>
    //     </Link>
    //   </div>
    // </div>


    <div className="mt-24 bg-gray-100 rounded-lg p-4 w-3/4  max-w-sm mx-auto">
    <div className="flex justify-between">
      <h2 className="text-sm font-medium mb-2 text-start">Select Seat</h2>
    </div>
    
    <div className="flex gap-2">
      <button className="bg-red-500 px-1.5 py-0.5 rounded text-xs text-white font-medium hover:bg-red-600 transition-colors">
        Booked
      </button>

      <button className="bg-yellow-500 px-1.5 py-0.5 rounded text-xs text-white font-medium hover:bg-yellow-600 transition-colors">
        Hold
      </button>
    </div>

    <div className="flex justify-between mt-2">
      {/* Left Side Seats - Increased size */}
      <div className="grid grid-cols-2 gap-3 mr-3">
        {seatData
          .filter((seat) => seat.seatNumber <= 20)
          .map((seat) => (
            <button
              key={seat._id}
              onClick={() => handleSeatSelect(seat.seatNumber)}
              disabled={seat.isBooked || (seat.holdUntil && new Date(seat.holdUntil) > new Date())}
              className={`p-2 rounded-md transition-colors ${
                seat.isBooked
                  ? "bg-red-500 text-white cursor-not-allowed"
                  : selectedSeats.includes(seat.seatNumber)
                    ? "bg-blue-500 text-white"
                    : seat.holdUntil && new Date(seat.holdUntil) > new Date()
                      ? "bg-yellow-500 text-black"
                      : "bg-white hover:bg-gray-200"
              }`}
            >
              <Armchair size={20} />
              <span className="block text-xs font-medium mt-0.5">{seat.seatNumber}</span>
            </button>
          ))}
      </div>

      {/* Right Side Seats - Increased size */}
      <div className="grid grid-cols-2 gap-3 ml-3">
        {seatData
          .filter((seat) => seat.seatNumber > 20)
          .map((seat) => (
            <button
              key={seat._id}
              onClick={() => handleSeatSelect(seat.seatNumber)}
              disabled={seat.isBooked || (seat.holdUntil && new Date(seat.holdUntil) > new Date())}
              className={`p-2 rounded-md transition-colors ${
                seat.isBooked
                  ? "bg-red-500 text-white cursor-not-allowed"
                  : selectedSeats.includes(seat.seatNumber)
                    ? "bg-blue-500 text-white"
                    : seat.holdUntil && new Date(seat.holdUntil) > new Date()
                      ? "bg-yellow-500 text-black"
                      : "bg-white hover:bg-gray-200"
              }`}
            >
              <Armchair size={20} />
              <span className="block text-xs font-medium mt-0.5">{seat.seatNumber}</span>
            </button>
          ))}
      </div>
    </div>

    {/* Selected Seats Summary */}
    <div className="mt-2 text-center">
      <Link to="/checkout">
        <button className="bg-blue-500 h-8 w-3/4 mx-auto text-xs font-medium text-white border border-blue-500 rounded hover:bg-blue-600 transition-colors">
          Continue
        </button>
      </Link>
    </div>
  </div>
  );
};

export default BusSeatSelector;
