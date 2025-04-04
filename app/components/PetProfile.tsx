"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pet } from '@/app/data/mockData';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaBars, FaTimes } from "react-icons/fa";
import { useState } from 'react';

interface PetProfileProps {
  pet: Pet;
}

const PetProfile: React.FC<PetProfileProps> = ({ pet }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed w-full top-0 bg-white shadow-md z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Round Logo */}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block lg:hidden text-myOrage"
          >
            <FaBars className="text-2xl" />
          </button>

          {/* Navigation Links */}
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

      {/* Main Content - Adjusted for nav height */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Pet Image */}
            <div className="md:w-1/3 relative aspect-square">
              <Image 
                src={pet.image} 
                alt={`Photo of ${pet.name} the ${pet.breed}`}
                className="rounded-lg object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>
            
            {/* Pet Details */}
            <div className="md:w-2/3">
              <header className="mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">{pet.name}</h1>
                
                {/* Status Badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                  pet.status === "Available" ? "bg-green-100 text-green-800" :
                  pet.status === "In Trial" ? "bg-yellow-100 text-yellow-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {pet.status}
                </span>
              </header>
              
              {/* Pet Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Breed</h3>
                  <p className="text-gray-800 mt-1">{pet.breed}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Age</h3>
                  <p className="text-gray-800 mt-1">{pet.age}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</h3>
                  <p className="text-gray-800 mt-1">{pet.gender}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Size</h3>
                  <p className="text-gray-800 mt-1">{pet.size}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Color/Markings</h3>
                  <p className="text-gray-800 mt-1">{pet.color}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Health Condition</h3>
                  <p className="text-gray-800 mt-1">{pet.healthCondition || 'None'}</p>
                </div>
              </div>
              
              {/* Schedule Button */}
              <Link href="/appointments">
                <button 
                  className="w-full sm:w-auto bg-myOrage hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg mb-6 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  aria-label={`Schedule a visit to meet ${pet.name}`}
                >
                  Schedule a Visit
                </button>
              </Link>
              
              {/* Pet Story */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">{pet.name} Story</h2>
                <div className="prose prose-sm text-gray-600">
                  <p>{pet.story}</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Sections */}
      <footer id="contacts" className="bg-myOrage text-white py-6 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left"> 
          {/* Logo Column */}
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

          {/* Contact Us Column */}
          <div className="flex flex-col space-y-2 text-sm md:items-start items-center"> 
            <h4 className="text-lg font-bold">Contact Us</h4>
            <p className="flex items-center gap-2"><FaMapMarkerAlt /> Pullian, Bulacan</p>
            <p className="flex items-center gap-2"><FaEnvelope /> whelps@gmail.com</p>
            <p className="flex items-center gap-2"><FaPhone /> 0951 718 7064</p>
          </div>

          {/* Information Column */}
          <div className="flex flex-col space-y-2 text-sm md:items-start items-center"> 
            <h4 className="text-lg font-bold">Information</h4>
            <Link href="/" className="hover:text-black">Home</Link>
            <Link href="/about" className="hover:text-black">About Us</Link>
            <Link href="/faqs" className="hover:text-black">FAQs</Link>
            <Link href="/privacy" className="hover:text-black">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-black">Terms of Service</Link>
            <Link href="/policies" className="hover:text-black">Shelter Policies</Link>
          </div>

          {/* CTA Column */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <h4 className="text-lg font-bold text-center md:text-left">
              Your Fur-ever <span className="block">Friend is Waiting!</span>
            </h4>
            <Link href="/assessment">
              <button className="bg-white text-myOrage px-8 py-3 rounded-full font-semibold hover:bg-orange-600 hover:text-white transition-colors">
                Start Matching
              </button>
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-6xl mx-auto border-t border-gray-700 pt-3 text-center mt-3">
          <p className="text-[10px] text-gray-300">© 2025 WHELPS. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PetProfile;