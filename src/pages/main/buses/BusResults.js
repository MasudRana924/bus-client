import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bus, Clock, MapPin, Calendar, ArrowLeft, Edit, AlertCircle } from "lucide-react";

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
      <div className="min-h-screen  flex items-center justify-center p-4 mt-12 md:mt-0">
        <div className="bg-white shadow-2xl rounded-lg border border-gray-100 p-12 text-center w-full max-w-md transform hover:scale-102 transition-all duration-300">
          <div className="flex justify-center mb-8">
            <div className="bg-red-50 p-4 rounded-full">
              <AlertCircle className="text-red-500" size={48} strokeWidth={1.5} />
            </div>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            No Buses Found
          </h3>
          <p className="text-gray-600 mb-8">
            We couldn't find any buses from{" "}
            <span className="font-semibold text-blue-600">{fromLocation}</span>{" "}
            to <span className="font-semibold text-blue-600">{toLocation}</span>.
          </p>
          <div className="space-y-6">
            <p className="text-red-500 font-medium">Try adjusting your search:</p>
            <ul className="text-sm text-gray-600 space-y-3 bg-gray-50 rounded-2xl p-6">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Check spelling of locations</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Try different dates</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Expand search radius</span>
              </li>
            </ul>
            <Link to="/">
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg hover:shadow-lg hover:opacity-90 transition-all duration-300 font-medium">
                Modify Search
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  mt-16 lg:mt-24">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex justify-between space-x-4">
              <button className="p-2  rounded-xl text-blue-600 hover:bg-blue-200 transition-colors">
                <ArrowLeft size={20} />
              </button>
              <div className="">
                <p className="text-sm text-gray-500 mb-1">Your Route</p>
                <h3 className="text-md text-center  font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {fromLocation} → {toLocation}
                </h3>
              </div>
            </div>
            <Link to="/">
              <button className="flex items-center space-x-2  rounded-xl text-blue-600  transition-all">
                <Edit size={15} />
                <span className="font-medium">Modify</span>
              </button>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {buses.map((bus) => (
            <div
              key={bus.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                      <Bus className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {bus.busName}
                      </h4>
                      <div className="flex items-center space-x-2 text-gray-500 mt-1">
                        <Clock size={16} />
                        <span className="text-sm">{bus.journeyTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2 ">
                    <span className="text-green-600 font-medium text-sm">Available</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        <MapPin className="text-blue-600" size={18} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 text-start">From</p>
                        <p className="font-semibold text-gray-800 mt-1 text-start">{bus.from}</p>
                        <p className="text-blue-600 font-medium mt-1 text-start">{bus.depTime}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        <MapPin className="text-red-600" size={18} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 text-start">To</p>
                        <p className="font-semibold text-gray-800 mt-1 text-start">{bus.to}</p>
                        <p className="text-blue-600 font-medium mt-1 text-start">{bus.arrTime}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleBusClick(bus._id)}
                  className="w-full bg-blue-500  text-white py-2 rounded-lg  flex items-center justify-center space-x-2 font-medium"
                >
                  <Calendar size={20} />
                  <span>Book Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusResults;