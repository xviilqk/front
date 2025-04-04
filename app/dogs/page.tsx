"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaBars, FaTimes } from "react-icons/fa";

interface Pet {
  id: number;
  name: string;
  breed: string;
  age: string;
  gender: string;
  size: string;
  color: string;
  healthCondition: string;
  details: string;
  image: string;
  status: "Available" | "In Trial" | "Adopted";
  type: "dog" | "cat";
  story: string;
}

export default function DogsPage() {
  const [dogs, setDogs] = useState<Pet[]>([]);
  const [filteredDogs, setFilteredDogs] = useState<Pet[]>([]);
  const [activeTab, setActiveTab] = useState<"All" | "Available" | "In Trial" | "Adopted">("All");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 9;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/api/pets")
      .then((res) => res.json())
      .then((data: Pet[]) => {
        const dogList = data.filter((pet) => pet.type === "dog");
        setDogs(dogList);
        setFilteredDogs(dogList);
      })
      .catch((err) => console.error("Error fetching dogs:", err));
  }, []);

  useEffect(() => {
    if (activeTab === "All") {
      setFilteredDogs(dogs);
    } else {
      setFilteredDogs(dogs.filter((dog) => dog.status === activeTab));
    }
    setCurrentPage(1);
  }, [activeTab, dogs]);

  const toggleFavorite = (petId: number) => {
    setFavorites((prev) =>
      prev.includes(petId) ? prev.filter((id) => id !== petId) : [...prev, petId]
    );
  };

  const totalPages = Math.ceil(filteredDogs.length / dogsPerPage);
  const displayedDogs = filteredDogs.slice(
    (currentPage - 1) * dogsPerPage,
    currentPage * dogsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="fixed w-full top-0 bg-white shadow-md z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-none cursor-pointer ml-8">
              <Image 
                src="/images/WhelpsLogo.png"
                alt="WHELPS Logo"
                width={48}
                height={48}
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
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${isMenuOpen ? 'block' : 'hidden'}`} 
        onClick={() => setIsMenuOpen(false)}
      >
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

      {/* Filter Tabs */}
      <div className="flex justify-center space-x-6 mt-28">
        {["All", "Available", "In Trial", "Adopted"].map((tab) => (
          <button
            key={tab}
            className={`text-lg font-semibold ${
              activeTab === tab 
                ? "text-myOrage border-b-2 border-myOrage" 
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab as "All" | "Available" | "In Trial" | "Adopted")}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dogs Grid */}
      <section className="px-4 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-24">
          {displayedDogs.map((dog) => (
            <div key={dog.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg relative">
              {/* Dog Image with Link */}
              <Link href={`/pets/${dog.id}`} className="block">
                <Image 
                  src={dog.image} 
                  alt={dog.name} 
                  width={300} 
                  height={200} 
                  className="w-full h-64 object-cover" 
                />
              </Link>

              {/* Status Tag */}
              <div className="absolute top-3 right-3 bg-myOrage text-white text-sm px-3 py-1 rounded-lg">
                {dog.status}
              </div>

              {/* Dog Details */}
              <div className="p-6 bg-myOrage text-white relative">
                <h4 className="text-xl font-semibold">{dog.name}</h4>
                <p className="text-sm">{dog.details}</p>

                {/* Heart Favorite Button */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(dog.id);
                  }} 
                  className="absolute top-4 right-4 text-2xl"
                >
                  <FaHeart className={favorites.includes(dog.id) ? "text-red-500" : "text-white"} />
                </button>

                {/* Meet Button */}
                <Link
                  href={`/pets/${dog.id}`}
                  className="w-full mt-4 py-2 bg-white text-myOrage font-semibold rounded-full hover:bg-gray-200 transition duration-200 block text-center"
                >
                  Meet {dog.name}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2 mb-12">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full font-semibold ${
                  currentPage === index + 1 
                    ? "bg-myOrage text-white" 
                    : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer id="contacts" className="bg-myOrage text-white py-6 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left"> 
        {/* Logo Column */}
        <div className="flex justify-center md:justify-start">
            <div className="h-32 w-32 md:h-48 md:w-48"> {/* Increased size */}
                <Image 
                src="/images/Whelpswhite.png"
                alt="WHELPS Logo"
                width={192} // Increased width
                height={192} // Increased height
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
}