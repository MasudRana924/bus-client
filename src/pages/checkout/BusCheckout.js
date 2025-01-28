import React, { useState } from 'react';
import { Bus, Clock, MapPin, CreditCard, ArrowRight } from 'lucide-react';

const BusCheckout = () => {
    const [paymentMethod, setPaymentMethod] = useState(null);

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
        <div className="min-h-screen  py-12 px-4 mt-16 w-full max-w-lg mx-auto">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md mx-auto border border-gray-100">
                {/* Bus Details Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3 flex-grow">
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <Bus className="text-blue-600" size={24} />
                            </div>
                            <h4 className="text-xl font-bold text-gray-800 truncate">
                                {bus.busName}
                            </h4>
                        </div>
                        <div className="bg-gray-100 px-3 py-1.5 rounded-full flex items-center space-x-2">
                            <Clock size={16} className="text-gray-600" />
                            <span className="font-medium text-gray-700">{bus.journeyTime}</span>
                        </div>
                    </div>

                    {/* Route Details */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-green-100 p-1.5 rounded-full">
                                            <MapPin className="text-green-600" size={16} />
                                        </div>
                                        <p className="text-sm text-gray-600">From</p>
                                    </div>
                                    <p className="font-bold text-gray-800 text-start">{bus.from}</p>
                                    <p className="text-sm font-medium text-gray-500 mt-1 text-start">{bus.depTime}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-red-100 p-1.5 rounded-full">
                                            <MapPin className="text-red-600" size={16} />
                                        </div>
                                        <p className="text-sm text-gray-600">To</p>
                                    </div>
                                    <p className="font-bold text-gray-800 text-start">{bus.to}</p>
                                    <p className="text-sm font-medium text-gray-500 mt-1 text-start">{bus.arrTime}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seat Details */}
                <div className="bg-blue-50 p-6 rounded-xl mb-8">
                    <h4 className="font-semibold mb-4 text-gray-800">Selected Seats</h4>
                    <div className="flex flex-wrap gap-2">
                        {selectedSeats.map(seat => (
                            <span 
                                key={seat} 
                                className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium shadow-sm border border-blue-100"
                            >
                                Seat {seat}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Payment Options */}
                <div className="mb-8">
                    <h4 className="font-semibold text-gray-800 mb-4">Select Payment Method</h4>
                    <div className="grid grid-cols-3 gap-4">
                        {paymentOptions.map(option => (
                            <button
                                key={option.name}
                                onClick={() => setPaymentMethod(option.name)}
                                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                                    paymentMethod === option.name 
                                        ? 'bg-blue-50 border-blue-500 shadow-md' 
                                        : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-blue-200'
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
                <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex justify-between mb-6">
                        <span className="text-gray-600 font-medium">Total Price</span>
                        <span className="text-2xl font-bold text-blue-600">
                            ${totalPrice.toFixed(2)}
                        </span>
                    </div>
                    <button 
                        disabled={!paymentMethod}
                        className={`w-full py-4 rounded-xl transition-all flex items-center justify-center space-x-2 font-medium ${
                            paymentMethod 
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200' 
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        <span>Proceed to Payment</span>
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BusCheckout;