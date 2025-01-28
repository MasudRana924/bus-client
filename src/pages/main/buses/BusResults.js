// src/BusResults.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Bus, Clock, MapPin, Calendar, ArrowLeft, Edit } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton, Button } from "antd"; // Importing Ant Design Skeleton and Button

const BusResults = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const buses = state?.buses || [];
  const fromLocation = state?.from;
  const toLocation = state?.to;

  const handleBusClick = (busId) => {
    console.log("id", busId);
    navigate(`/bus/${busId}`);
  };

  if (buses.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
        <div className="bg-white shadow-2xl rounded-2xl border border-gray-200 p-10 text-center w-full max-w-md transform transition-all hover:scale-105 duration-300">
          <div className="flex justify-center mb-6">
            <AlertCircle className="text-red-500" size={64} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            No Buses Found
          </h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any buses from{" "}
            <span className="font-semibold text-blue-600">{fromLocation}</span>{" "}
            to <span className="font-semibold text-blue-600">{toLocation}</span>
            .
          </p>
          <div className="space-y-4">
            <p className="text-red-500 font-semibold">
              Please try adjusting your search criteria:
            </p>
            <ul className="text-sm text-gray-600 space-y-2 text-left px-6">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Check spelling of locations</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Try different dates</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Expand search radius</span>
              </li>
            </ul>
            <Link to="/">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Modify Search
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 mt-24 w-full max-w-lg mx-auto">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button className="text-blue-600 hover:text-gray-800">
              <ArrowLeft size={24} />
            </button>
            <h3 className="text-xl font-medium text-gray-800">
              {fromLocation} to {toLocation}
            </h3>
          </div>
          <Link to="/">
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
              <Edit size={20} />
              <span className="text-sm font-medium">Modify</span>
            </button>
          </Link>
        </div>

        {/* Skeleton Loader for Bus Results */}
        {buses.length === 0 ? (
          <div className="space-y-6">
            {[...Array(1)].map((_, index) => (
              <div key={index} className="bg-white shadow-md rounded-xl p-6 mb-6">
                <Skeleton loading={true} active avatar paragraph={{ rows: 3 }} />
              </div>
            ))}
          </div>
        ) : (
          buses.map((bus) => (
            <div
              key={bus.id}
              className="bg-white shadow-md rounded-xl p-6 mb-6 hover:shadow-xl transition-all duration-300 w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3 flex-grow">
                  <Bus className="text-blue-600" size={24} />
                  <h4 className="text-xl font-bold text-blue-600 truncate">
                    {bus.busName}
                  </h4>
                </div>
                <div className="text-gray-500 flex items-center space-x-2">
                  <Clock size={18} />
                  <span className="font-medium">{bus.journeyTime}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="flex gap-2">
                    <MapPin className="text-red-600" size={20} />
                    <p className="text-sm text-gray-600">From</p>
                  </div>
                  <p className="font-semibold text-start mt-2">{bus.from}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 text-end">Departure</p>
                  <p className="font-semibold text-end mt-2">{bus.depTime}</p>
                </div>
                <div>
                  <div className="flex gap-2">
                    <MapPin className="text-red-600" size={20} />
                    <p className="text-sm text-gray-600">To</p>
                  </div>
                  <p className="font-semibold text-start mt-2">{bus.to}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 text-end ">Arrival</p>
                  <p className="font-semibold text-end mt-2">{bus.arrTime}</p>
                </div>
              </div>

              <div className="mt-4">
                <Button
                  type="primary"
                  block
                  icon={<Calendar size={20} />}
                  onClick={() => handleBusClick(bus._id)}
                >
                  Book Now
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BusResults;
