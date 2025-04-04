"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import mockUsers from "@/app/data/mockUsers";  // Import mock data
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaBars, FaTimes } from "react-icons/fa";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [users, setUsers] = useState(mockUsers); // Store mock users in state
  const [loggedInUser, setLoggedInUser] = useState<typeof users[0] | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false); // State for checkbox agreement

  // Function to show a temporary message
  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000); // Hide after 3 seconds
  };

  // Sign Up Function
  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) {
      showMessage("Please agree to the terms and policies");
      return;
    }
    showMessage("Account created successfully!");
    const formData = new FormData(e.currentTarget);
    const newUser = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      age: formData.get("age") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      profilePic: "/images/default-profile.png",
    };

    setUsers([...users, newUser]);
    alert("Sign-up successful! You can now log in.");
    setActiveTab("login");
  };

  // Log In Function
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showMessage("Login successful!");
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      setLoggedInUser(user);
      alert("Login successful!");
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <nav className="fixed w-full top-0 bg-white shadow-md z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Round Logo */}
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
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="block lg:hidden text-myOrage">
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
            {loggedInUser ? (
              <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-none cursor-pointer ml-8">
                <Image src={loggedInUser.profilePic} alt="Profile" width={40} height={40} />
              </div>
            ) : (
              <Link href="/login">
                <button className="bg-myOrage text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors ml-8">
                  LOGIN
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Success Message Popup */}
      {message && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
          {message}
        </div>
      )}

      {/* Sidebar for Mobile */}
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
      <div className="flex-grow flex justify-center items-center mt-52 mb-20 px-4 sm:px-8 lg:px-16">
        <div className="relative bg-myOrage p-10 rounded-xl shadow-lg w-full max-w-2xl text-center flex flex-col items-center">
          {/* Tab Switch */}
          <div className="absolute -top-6 left-0 right-0 flex">
            <button className={`w-1/2 py-3 text-lg font-bold transition-colors rounded-t-xl ${activeTab === "login" ? "bg-myOrage text-white shadow-lg" : "bg-orange-100 text-myOrage"}`} onClick={() => setActiveTab("login")}>
              Log In
            </button>
            <button className={`w-1/2 py-3 text-lg font-bold transition-colors rounded-t-xl ${activeTab === "signup" ? "bg-myOrage text-white shadow-lg" : "bg-orange-100 text-myOrage"}`} onClick={() => setActiveTab("signup")}>
              Sign Up
            </button>
          </div>

          {/* Log In Form */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin} className="mt-12 space-y-4 w-full flex flex-col">
              <input name="email" type="email" placeholder="Email" className="w-full px-4 py-3 rounded bg-orange-200 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
              <input name="password" type="password" placeholder="Password" className="w-full px-4 py-3 rounded bg-orange-200 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
              <button className="w-full py-3 bg-white text-myOrage font-semibold rounded-full shadow-lg hover:bg-gray-200 transition">
                Log In
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {activeTab === "signup" && (
            <form onSubmit={handleSignUp} className="mt-12 space-y-4 w-full">
              <div className="grid grid-cols-3 gap-4">
                <input name="firstName" type="text" placeholder="First Name" className="w-full px-4 py-3 rounded bg-orange-200 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
                <input name="lastName" type="text" placeholder="Last Name" className="w-full px-4 py-3 rounded bg-orange-200 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
                <select name="age" className="w-full px-4 py-3 rounded bg-orange-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400" required>
                  <option value="">Age</option>
                  <option>18-24</option>
                  <option>25-34</option>
                  <option>35-44</option>
                  <option>45+</option>
                </select>
              </div>
              <input name="email" type="email" placeholder="Email" className="w-full px-4 py-3 rounded bg-orange-200 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
              <input name="password" type="password" placeholder="Create Password" className="w-full px-4 py-3 rounded bg-orange-200 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
              <input name="password" type="password" placeholder="Repeat Password" className="w-full px-4 py-3 rounded bg-orange-200 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
              
              {/* Agreement Checkbox */}
              <div className="flex items-start mt-4">
                <div className="flex items-center h-5">
                  <input 
                    id="agreement" 
                    name="agreement" 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 text-myOrage focus:ring-myOrage" 
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    required
                  />
                </div>
                <label htmlFor="agreement" className="ml-2 text-sm text-white">
                  Creating this account means you agree with our <Link href="/privacy" className="underline hover:text-gray-200">Privacy Policy</Link>, <Link href="/terms" className="underline hover:text-gray-200">Terms of Service</Link> and <Link href="/policies" className="underline hover:text-gray-200">Shelter Policies</Link>
                </label>
              </div>
              
              <button 
                type="submit" 
                className={`py-3 px-32 bg-white text-myOrage font-semibold rounded-full shadow-lg hover:bg-gray-200 transition mt-4 ${
                  !agreed ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!agreed}
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>

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