"use client";
import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaBars, FaTimes } from "react-icons/fa";

export default function AppointmentPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    occupation: "",
    gender: "",
    age: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ selectedDate, selectedTime, ...formData });
  };

  const availableTimes = [
    "9:00 AM", "9:30 AM", "10:00 AM", "11:30 AM", 
    "11:00 AM", "11:30 PM", "1:30 PM", "2:00 PM", 
    "2:30 PM", "3:00 PM", "3:30 PM"
  ];

  const calendarDays = [
    { day: "30", grayed: true }, { day: "31", grayed: true }, 
    { day: "1" }, { day: "2" }, { day: "3" }, { day: "4" }, { day: "5"},
    { day: "6" }, { day: "7" }, { day: "8" }, { day: "9" }, { day: "10" }, { day: "11" }, { day: "12" },
    { day: "13" }, { day: "14" }, { day: "15" }, { day: "16" }, { day: "17" }, { day: "18" }, { day: "19" },
    { day: "20" }, { day: "21" }, { day: "22" }, { day: "23" }, { day: "24" }, { day: "25" }, { day: "26" },
    { day: "27" }, { day: "28" }, { day: "29" }, { day: "30"}, 
    { day: "1", grayed: true }, { day: "2", grayed: true }, { day: "3", grayed: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed w-full top-0 bg-white shadow-md z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="h-18 w-18 rounded-full overflow-hidden border-2 border-none cursor-pointer ml-8">
              <Image 
                src="/images/WhelpsLogo.png"
                alt="WHELPS Logo"
                width={98}
                height={98}
              />
            </div>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block lg:hidden text-myOrage"
          >
            <FaBars className="text-2xl" />
          </button>

          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              <Link href="/dogs" className="text-myOrage hover:text-blue-600 transition-colors">
                DOGS
              </Link>
              <Link href="/cats" className="text-myOrage hover:text-blue-600 transition-colors">
                CATS
              </Link>
              <Link href="/about" className="text-myOrage hover:text-blue-600 transition-colors">
                ABOUT
              </Link>
              <Link href="/#contacts" className="text-myOrage hover:text-blue-600 transition-colors">
                CONTACTS
              </Link>
              <Link href="/appointments" className="text-myOrage hover:text-blue-600 transition-colors">
                APPOINTMENTS
              </Link>
            </div>
            
            <Link href="/login">
              <button className="bg-myOrage text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors ml-8">
                LOGIN
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${isMenuOpen ? 'block' : 'hidden'}`} onClick={() => setIsMenuOpen(false)}>
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg p-6" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="block lg:hidden text-myOrage mb-6"
          >
            <FaTimes className="text-2xl" />
          </button>
          <div className="flex flex-col space-y-4">
            <Link href="/dogs" className="text-myOrage hover:text-blue-600 transition-colors">
              DOGS
            </Link>
            <Link href="/cats" className="text-myOrage hover:text-blue-600 transition-colors">
              CATS
            </Link>
            <Link href="/about" className="text-myOrage hover:text-blue-600 transition-colors">
              ABOUT
            </Link>
            <Link href="/#contacts" className="text-myOrage hover:text-blue-600 transition-colors">
              CONTACTS
            </Link>
            <Link href="/appointments" className="text-myOrage hover:text-blue-600 transition-colors">
              APPOINTMENTS
            </Link>
            <Link href="/login">
              <button className="bg-myOrage text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                LOGIN
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-32 pb-16 px-4 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-4xl font-bold text-myOrage mb-16 text-center">Fur-ever Starts Here!</h1>
          
          {/* Calendar and Time Slots */}
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            {/* Calendar */}
            <div className="bg-myPink p-6 rounded-lg flex-1">
              <h2 className="text-3xl font-bold text-myOrage mb-4 text-left">April 2025</h2>
              
              <div className="grid grid-cols-7 gap-2 mb-6">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
                  <div key={day} className="text-center font-medium text-myOrage py-2">
                    {day}
                  </div>
                ))}
                
                {calendarDays.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => !item.grayed && setSelectedDate(item.day)}
                    className={`text-center py-2 rounded-full ${item.grayed ? "text-gray-400" : "hover:bg-myPink"} 
                      ${selectedDate === item.day ? "bg-myOrage text-white" : ""}`}
                    disabled={item.grayed}
                  >
                    {item.day}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Time Slots */}
            <div className="bg-myPink p-6 rounded-lg px-22">
              <h3 className="text-2xl font-semibold text-myOrage mb-4 text-center">Available Times</h3>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {availableTimes.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                      selectedTime === time ? "bg-myOrage text-white" : "bg-transparent"
                    }`}
                  >
                    <span className={`inline-block w-5 h-5 border-2 mr-3 rounded-xl ${
                      selectedTime === time 
                        ? 'bg-myPink flex items-center justify-center' 
                        : 'border-gray-500'
                    }`}>
                      {selectedTime === time && (
                        <span className="block w-3 h-3 bg-myOrage rounded-xl"></span>
                      )}
                    </span>
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Form Container */}
          <div className="max-w-2xl mx-auto bg-myPink p-6 rounded-lg flex-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full px-4 py-2 rounded-lg"
                  required
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      placeholder="Occupation"
                      className="w-full px-4 py-2 first:rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      placeholder="Gender"
                      className="w-full px-4 py-2 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Age"
                      className="w-full px-4 py-2 rounded-lg"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="w-full px-4 py-2 rounded-lg"
                  required
                />
                
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 rounded-lg"
                  required
                />
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-start mb-4">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="agreement"
                      checked={isAgreementChecked}
                      onChange={() => setIsAgreementChecked(!isAgreementChecked)}
                      className="w-4 h-4 text-myOrage border-gray-300 rounded focus:ring-myOrage"
                      required
                    />
                  </div>
                  <label htmlFor="agreement" className="ml-2 text-sm text-gray-500">
                    Coming to this appointment means you agree with our{' '}
                    <Link href="/privacy" className="text-myOrage underline hover:text-blue-600">
                      Privacy Policy
                    </Link>
                    ,{' '}
                    <Link href="/terms" className="text-myOrage underline hover:text-blue-600">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link href="/policies" className="text-myOrage underline hover:text-blue-600">
                      Shelter Policies
                    </Link>.
                  </label>
                </div>
                
                <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-myOrage text-white py-2 px-8 rounded-lg font-semibold hover:bg-blue-600 transition-colors w-64"
                    disabled={!selectedDate || !selectedTime || !isAgreementChecked}>
                    Confirm Appointment
                </button>
                </div>
                
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer id="contacts" className="bg-myOrage text-white py-6 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left"> 
          <div className="flex justify-center md:justify-start">
            <div className="h-32 w-32 md:h-48 md:w-48">
              <Image 
                src="/images/Whelpswhite.png"
                alt="WHELPS Logo"
                width={192}
                height={192}
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2 text-sm md:items-start items-center"> 
            <h4 className="text-lg font-bold">Contact Us</h4>
            <p className="flex items-center gap-2"><FaMapMarkerAlt /> Pullian, Bulacan</p>
            <p className="flex items-center gap-2"><FaEnvelope /> whelps@gmail.com</p>
            <p className="flex items-center gap-2"><FaPhone /> 0951 718 7064</p>
          </div>

          <div className="flex flex-col space-y-2 text-sm md:items-start items-center"> 
            <h4 className="text-lg font-bold">Information</h4>
            <Link href="/" className="hover:text-black">Home</Link>
            <Link href="/about" className="hover:text-black">About Us</Link>
            <Link href="/faqs" className="hover:text-black">FAQs</Link>
            <Link href="/privacy" className="hover:text-black">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-black">Terms of Service</Link>
            <Link href="/policies" className="hover:text-black">Shelter Policies</Link>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <h4 className="text-lg font-bold text-center md:text-left">
              Your Fur-ever <span className="block">Friend is Waiting!</span>
            </h4>
            <Link href="/assessment">
            <button className="bg-myOrage text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors">
                Start Matching
            </button>
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-gray-700 pt-3 text-center mt-3">
          <p className="text-[10px] text-gray-300">© 2025 WHELPS. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}