"use client";
import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image'
import { FaHeart } from "react-icons/fa";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaBars, FaTimes } from "react-icons/fa";

interface Pet {
  id: number;
  name: string;
  details: string;
  image: string;
  type: "dog" | "cat";
}

export default function HomePage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]); // Store favorite pet IDs
  const [isLoading, setIsLoading] = useState(true); // New state to track loading
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  useEffect(() => {
    fetch("/api/pets")
      .then((res) => res.json())
      .then((data: Pet[]) => {
        setPets(data);
        setIsLoading(false); // Set loading to false when data is ready
      })
      .catch((err) => {
        console.error("Error fetching pets:", err);
        setIsLoading(false); // Ensure it stops loading even if there's an error
      });
  }, []);

  const toggleFavorite = (petId: number) => {
    setFavorites((prev) =>
      prev.includes(petId) ? prev.filter((id) => id !== petId) : [...prev, petId]
    );
  };
  
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

      {/* New Hero Section */}
      <section className="pt-16 pb-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image Container - Left Side */}
          <div className="h-auto md:h-[500px] lg:h-[600px] overflow-hidden md:-ml-8 lg:-ml-24 transform md:translate-x-4">
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Image
                src="/images/FrontpagePet.png"
                alt="Happy pet"
                className="w-full h-auto md:w-[500px] lg:w-[600px]"
                width={800}
                height={600}
              />
            </div>
          </div>

          {/* Text Content - Right Side */}
          <div className="text-left space-y-6 md:ml-8 lg:ml-32 transform md:-translate-x-4">
            <h1 className="text-4xl md:text-5xl font-bold text-myOrage">
              Find your
              <span className="block mt-2 text-myOrage">Fur-fect Match</span>
            </h1>
            <p className="text-xl text-black">
              Discover pets that match your personality and lifestyle.
            </p>
            <div className="flex justify-center md:justify-start">
            <Link href="/assessment">
              <button className="bg-myOrage text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors">
                Start Matching
              </button>
            </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 px-4 bg-myOrage">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content - Left Side */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              WELCOME TO
              <span className="block text-white mt-2">WHELPS</span>
            </h2>
            <p className="text-xl text-white">
              A non-profit organization that aims to create a safe and happy environment for cats & dogs.
            </p>
          </div>

          {/* Image Container - Right Side */}
          <div className="h-64 md:h-96 overflow-hidden order-first md:order-last">
            <Image
              src="/images/WelcomePhoto.png"
              alt="Our shelter animals"
              className="w-full h-full object-cover"
              width={800}
              height={600}
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-4 bg-myPink">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl text-myOrage font-bold mb-12 text-center">How it Works?</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 items-center justify-center">
            {[
              {
                image: "/images/Matching.png",
                text: "Take the Compatibility Test",
              },
              {
                image: "/images/Matched.png",
                text: "Get Matched with a Pet",
              },
              {
                image: "/images/Profile.png",
                text: "View Pet Profile & Availability",
              },
              {
                image: "/images/Appointment.png",
                text: "Schedule a Meet-Up",
              },
            ].map((step, index) => (
              <div key={index} className="text-center p-4">
                <Image
                  src={step.image}
                  alt={step.text}
                  width={150} // Made bigger
                  height={150}
                  className="mx-auto mb-6"
                />
                <p className="text-myOrage font-bold text-lg">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Pets Grid */}
      <section className="py-12 px-4">
        <h3 className="text-2xl text-myOrage font-bold mb-8 text-center">Who are Waiting for You?</h3>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading pets...</p>
        ) : (
          <>
            {/* Dogs Grid (Show only 3 dogs) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {pets
                .filter((pet) => pet.type === "dog") // Filter only dogs
                .slice(0, 3) // Show only the first 3 dogs
                .map((pet) => (
                  <div key={pet.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg relative">
                    <Image src={pet.image} alt={pet.name} width={300} height={200} className="w-full h-64 object-cover" />
                    <div className="p-6 bg-myOrage text-white relative">
                      <h4 className="text-xl font-semibold">{pet.name}</h4>
                      <p className="text-sm">{pet.details}</p>
                      <button onClick={() => toggleFavorite(pet.id)} className="absolute top-4 right-4 text-2xl">
                        <FaHeart className={favorites.includes(pet.id) ? "text-red-500" : "text-white"} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* More Dogs Button */}
            <div className="text-center mt-6 mb-12">
              <Link href="/dogs"> {/* Navigate to the dogs page */}
                <button className="bg-myOrage text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors">
                  MORE
                </button>
              </Link>
            </div>

            {/* Cats Grid (Show only 3 cats) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
              {pets
                .filter((pet) => pet.type === "cat") // Filter only cats
                .slice(0, 3) // Show only the first 3 cats
                .map((pet) => (
                  <div key={pet.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg relative">
                    <Image src={pet.image} alt={pet.name} width={300} height={200} className="w-full h-64 object-cover" />
                    <div className="p-6 bg-myOrage text-white relative">
                      <h4 className="text-xl font-semibold">{pet.name}</h4>
                      <p className="text-sm">{pet.details}</p>
                      <button onClick={() => toggleFavorite(pet.id)} className="absolute top-4 right-4 text-2xl">
                        <FaHeart className={favorites.includes(pet.id) ? "text-red-500" : "text-white"} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* More Cats Button */}
            <div className="text-center mt-6">
              <Link href="/cats"> {/* Navigate to the cats page */}
                <button className="bg-myOrage text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors">
                  MORE
                </button>
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Footer Sections */}
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