import React, { useState } from 'react';
import { Bus, Clock, MapPin, CreditCard } from 'lucide-react';

const BusCheckout = () => {
    const [paymentMethod, setPaymentMethod] = useState(null);

    // Dummy Data
    const bus = {
        busName: 'Sunrise Express',
        journeyTime: '5h 30m',
        from: 'Dhaka',
        to: 'Chittagong',
        depTime: '08:00 AM',
        arrTime: '01:30 PM'
    };

    const selectedSeats = [3, 7, 12];
    const totalPrice = 45.50;

    const paymentOptions = [
        { 
            name: 'bKash', 
            logo: 'https://www.bssnews.net/assets/news_photos/2024/06/08/image-194040-1717851006.jpg',
            fee: 0.5 
        },
        { 
            name: 'Nagad', 
            logo: '/path/to/nagad-logo.png',
            fee: 0.4 
        },
        { 
            name: 'TakaX', 
            logo: 'https://cdn-icons-png.flaticon.com/128/12854/12854132.png',
            fee: 0.3 
        }
    ];

    return (
        <div className="min-h-screen bg-white py-12 px-4 mt-16 w-full max-w-lg mx-auto">
            <div className="bg-white shadow-lg rounded-xl p-6 max-w-md mx-auto">
                {/* Bus Details Section */}
                <div className="mb-6">
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

                    {/* Route Details */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <MapPin className="text-green-600" size={20} />
                                <p className="text-sm text-gray-600">From</p>
                            </div>
                            <p className="font-semibold text-start mt-2">{bus.from}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 text-end">Departure</p>
                            <p className="font-semibold text-end mt-2">{bus.depTime}</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <MapPin className="text-red-600" size={20} />
                                <p className="text-sm text-gray-600">To</p>
                            </div>
                            <p className="font-semibold text-start mt-2">{bus.to}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 text-end">Arrival</p>
                            <p className="font-semibold text-end mt-2">{bus.arrTime}</p>
                        </div>
                    </div>
                </div>

                {/* Seat Details */}
                <div className="bg-blue-50 p-4 rounded-lg mb-2">
                    <h4 className="font-semibold mb-2 text-start ">Selected Seats</h4>
                    <div className="flex flex-wrap gap-2">
                        {selectedSeats.map(seat => (
                            <span 
                                key={seat} 
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                            >
                                Seat {seat}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Payment Options */}
                <div>
                    <h4 className="font-semibold text-start mb-2 ">Select Payment Method</h4>
                    <div className="grid grid-cols-3 gap-4">
                        {paymentOptions.map(option => (
                            <button
                                key={option.name}
                                onClick={() => setPaymentMethod(option.name)}  // Set payment method when clicked
                                className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                                    paymentMethod === option.name 
                                        ? 'bg-blue-100 border-blue-500' 
                                        : 'bg-white hover:bg-gray-50 border-gray-200'
                                }`}
                            >
                                <div className="flex items-center space-x-4">
                                    <img src={option.logo} alt={option.name} className="h-10 w-20 object-contain" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Total Price and Checkout */}
                <div className="mt-6">
                    <div className="flex justify-between mb-4">
                        <span className="font-semibold">Total Price</span>
                        <span className="text-xl font-bold text-blue-600">
                            ${totalPrice.toFixed(2)}
                        </span>
                    </div>
                    <button 
                        disabled={!paymentMethod}  // Button disabled if no payment method is selected
                        className={`w-full py-3 rounded-lg transition-all ${
                            paymentMethod 
                                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BusCheckout;
