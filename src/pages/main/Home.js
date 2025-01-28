import React, { useState } from 'react';
import { Button, DatePicker, Select } from 'antd';
import { MapPin, Calendar, Search } from 'lucide-react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import useBusData from '../../hooks/useBusData';  // Import your custom hook

const { Option } = Select;

const Home = () => {
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [travelDate, setTravelDate] = useState(null);
  const locations = ['Dhanmondi', 'Uttara', 'Savar', 'Narayanganj', 'Tongi'];
  const { data: buses, isLoading, error } = useBusData(fromLocation, toLocation);

  const handleSearch = () => {
    if (fromLocation && toLocation && travelDate) {
      if (buses) {
        console.log('Filtered Buses:', buses);
        navigate('/results', { state: { buses, from: fromLocation, to: toLocation } });
      }
    } else {
      console.log('Please select all fields');
    }
  };

  return (
    // <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    //   <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
    //     <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Find Your Bus</h2>
    //     <div className="space-y-4">
    //       <div>
    //         <label className="block mb-2 text-sm font-medium text-gray-700 text-start">From</label>
    //         <Select
    //           value={fromLocation}
    //           onChange={(value) => setFromLocation(value)}
    //           placeholder="Select starting location"
    //           className="w-full"
    //           suffixIcon={<MapPin size={18} className="text-blue-600" />}
    //         >
    //           {locations.map((location) => (
    //             <Option key={location} value={location} disabled={location === toLocation}>
    //               {location}
    //             </Option>
    //           ))}
    //         </Select>
    //       </div>

    //       <div>
    //         <label className="block mb-2 text-sm font-medium text-gray-700 text-start">To</label>
    //         <Select
    //           value={toLocation}
    //           onChange={(value) => setToLocation(value)}
    //           placeholder="Select destination"
    //           className="w-full"
    //           suffixIcon={<MapPin size={18} className="text-blue-600" />}
    //         >
    //           {locations.map((location) => (
    //             <Option key={location} value={location} disabled={location === fromLocation}>
    //               {location}
    //             </Option>
    //           ))}
    //         </Select>
    //       </div>

    //       <div>
    //         <label className="block mb-2 text-sm font-medium text-gray-700 text-start">Travel Date</label>
    //         <DatePicker
    //           value={travelDate}
    //           onChange={setTravelDate}
    //           className="w-full"
    //           suffixIcon={<Calendar size={18} className="text-blue-600" />}
    //           disabledDate={(current) => current && current.isBefore(dayjs(), 'day')}
    //           allowClear={false}
    //         />
    //       </div>

    //       <Button
    //         type="primary"
    //         icon={<Search size={18} />}
    //         className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
    //         onClick={handleSearch}
    //         loading={isLoading}  // Button shows a spinner when loading
    //         disabled={!(fromLocation && toLocation && travelDate)}
    //       >
    //         Find Buses
    //       </Button>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Find Your Bus</h2>
          <p className="text-gray-500 mt-2">Search for available buses and book your journey</p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">From</label>
              <Select
                value={fromLocation}
                onChange={(value) => setFromLocation(value)}
                placeholder="Select starting location"
                className="w-full hover:border-blue-400"
                suffixIcon={<MapPin size={18} className="text-blue-600" />}
                style={{ height: '45px' }}
              >
                {locations.map((location) => (
                  <Option key={location} value={location} disabled={location === toLocation}>
                    {location}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">To</label>
              <Select
                value={toLocation}
                onChange={(value) => setToLocation(value)}
                placeholder="Select destination"
                className="w-full hover:border-blue-400"
                suffixIcon={<MapPin size={18} className="text-blue-600" />}
                style={{ height: '45px' }}
              >
                {locations.map((location) => (
                  <Option key={location} value={location} disabled={location === fromLocation}>
                    {location}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Travel Date</label>
              <DatePicker
                value={travelDate}
                onChange={setTravelDate}
                className="w-full hover:border-blue-400"
                suffixIcon={<Calendar size={18} className="text-blue-600" />}
                disabledDate={(current) => current && current.isBefore(dayjs(), 'day')}
                allowClear={false}
                style={{ height: '45px' }}
              />
            </div>
          </div>

          <Button
            type="primary"
            icon={<Search size={18} />}
            className="w-full h-16 mt-6 bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-base font-medium rounded-xl shadow-lg shadow-blue-200"
            onClick={handleSearch}
            loading={isLoading}
            disabled={!(fromLocation && toLocation && travelDate)}
          >
            Search Available Buses
          </Button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              100+ Routes
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              24/7 Support
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              Instant Booking
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
