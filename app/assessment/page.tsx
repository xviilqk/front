"use client";
import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaBars, FaTimes } from "react-icons/fa";

export default function AssessmentPage() {
  const [answers, setAnswers] = useState<Record<number, string | null>>({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const questions = [
    {
      id: 1,
      question: "How would you describe yourself?",
      options: [
        "Calm and easygoing",
        "Social and outgoing",
        "Adventurous and active",
        "Independent and low-key"
      ]
    },
    {
      id: 2,
      question: "How do you like to spend your free time?",
      options: [
        "Relaxing at home",
        "Spending time with friends and family",
        "Exploring outdoors or traveling",
        "Working on hobbies or projects"
      ]
    },
    {
      id: 3,
      question: "What energy level do you prefer in a pet?",
      options: [
        "Low - relaxed and independent",
        "Medium - playful but calm",
        "High - active and always ready for fun"
      ]
    },
    {
      id: 4,
      question: "How affectionate do you want your pet to be?",
      options: [
        "Very cuddly - loves affection",
        "Balanced - affectionate but not clingy",
        "Independent - doesn't need constant attention"
      ]
    }
  ];

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const isAllAnswered = Object.keys(answers).length === questions.length;

  const handleSubmit = () => {
    console.log("Submitted answers:", answers);
    // Redirect to results page or show matches
  };

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
                CONTAC
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

      {/* Assessment Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-myOrage mb-2">
              Find your Fur-fect Match
            </h1>
            <p className="text-myOrage">
              Answer these quick questions to help us find a pet that fits your personality!
            </p>
          </div>

          {/* All Questions */}
          <div className="space-y-8">
            {questions.map((q) => (
              <div key={q.id} className="mb-8">
                <h2 className="text-3xl font-semibold mb-4 text-myOrage text-center">
                  {q.id}. {q.question}
                </h2>
                
                <div className="grid grid-cols-1 gap-3 px-20">
                  {q.options.map((option, index) => (
                    <button
                      key={index}
                      className={`p-2 rounded-lg transition-all text-center text-[22px] ${
                        answers[q.id] === option 
                          ? 'bg-myOrage text-white font-medium' 
                          : 'bg-myPink text-myOrage hover:bg-pink-100'
                      }`}
                      onClick={() => handleAnswerSelect(q.id, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-12">
            <button
              onClick={handleSubmit}
              disabled={!isAllAnswered}
              className={`px-20 py-3 rounded-full flex items-center text-lg ${
                !isAllAnswered 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-myOrage text-white hover:bg-orange-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </section>

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
            <button className="bg-white text-myOrage px-8 py-3 rounded-full font-semibold hover:bg-orange-600 hover:text-white transition-colors">
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