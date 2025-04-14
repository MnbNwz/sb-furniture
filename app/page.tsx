"use client";

import type React from "react";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  MessageSquareText as WhatsApp,
  X,
  CheckCircle,
  PhoneCall,
} from "lucide-react";

export default function Home() {
  // Refs for scrolling
  const homeRef = useRef<HTMLElement>(null);
  const carpetsRef = useRef<HTMLElement>(null);
  const vinylRef = useRef<HTMLElement>(null);

  const furnitureRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active section state
  const [activeSection, setActiveSection] = useState("home");

  // Form state
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  // Form errors state
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  // Form submission state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Function to scroll to section
  const scrollToSection = (
    ref: React.RefObject<HTMLElement>,
    section: string
  ) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
      setActiveSection(section);
    }
  };

  // Function to check which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id) {
              setActiveSection(id);
            }
          }
        });
      },
      { threshold: 0.3 } // Lower threshold to detect sections earlier
    );

    if (homeRef.current) {
      homeRef.current.id = "home";
      observer.observe(homeRef.current);
    }
    if (carpetsRef.current) {
      carpetsRef.current.id = "carpets";
      observer.observe(carpetsRef.current);
    }
    if (vinylRef.current) {
      vinylRef.current.id = "vinyl";
      observer.observe(vinylRef.current);
    }
    if (furnitureRef.current) {
      furnitureRef.current.id = "furniture";
      observer.observe(furnitureRef.current);
    }
    if (aboutRef.current) {
      aboutRef.current.id = "about";
      observer.observe(aboutRef.current);
    }
    if (contactRef.current) {
      contactRef.current.id = "contact";
      observer.observe(contactRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // WhatsApp message
  const whatsappMessage =
    "Hello, I am interested in your carpets and furniture products.";
  const whatsappNumber = "447525900400";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  // Validate form
  const validateForm = () => {
    let isValid = true;
    const errors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    };

    // Validate first name
    if (!formState.firstName.trim()) {
      errors.firstName = "First name is required";
      isValid = false;
    }

    // Validate last name
    if (!formState.lastName.trim()) {
      errors.lastName = "Last name is required";
      isValid = false;
    }

    // Validate email
    if (!formState.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate phone
    if (!formState.phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else if (
      !/^[0-9+\-\s()]{10,15}$/.test(formState.phone.replace(/\s/g, ""))
    ) {
      errors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    // Validate message
    if (!formState.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    } else if (formState.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        setFormSubmitted(true);

        setFormState({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });

        setTimeout(() => {
          setFormSubmitted(false);
        }, 5000);
      } else {
        console.error(
          "Form submission error:",
          data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Server error:", error);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/new-logo.jpeg"
              alt="SB Carpet and Furniture Logo"
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection(homeRef, "home")}
              className={`text-sm font-medium transition-colors ${
                activeSection === "home"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-slate-600 hover:text-teal-600"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection(carpetsRef, "carpets")}
              className={`text-sm font-medium transition-colors ${
                activeSection === "carpets"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-slate-600 hover:text-teal-600"
              }`}
            >
              Carpets
            </button>
            <button
              onClick={() => scrollToSection(vinylRef, "vinyl")}
              className={`text-sm font-medium transition-colors ${
                activeSection === "vinyl"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-slate-600 hover:text-teal-600"
              }`}
            >
              Vinyl
            </button>
            <button
              onClick={() => scrollToSection(furnitureRef, "furniture")}
              className={`text-sm font-medium transition-colors ${
                activeSection === "furniture"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-slate-600 hover:text-teal-600"
              }`}
            >
              Furniture
            </button>
            <button
              onClick={() => scrollToSection(aboutRef, "about")}
              className={`text-sm font-medium transition-colors ${
                activeSection === "about"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-slate-600 hover:text-teal-600"
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection(contactRef, "contact")}
              className={`text-sm font-medium transition-colors ${
                activeSection === "contact"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-slate-600 hover:text-teal-600"
              }`}
            >
              Contact Us
            </button>

            <div className="flex items-center gap-8 ml-8">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-teal-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-teal-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-teal-600 transition-colors"
              >
                <WhatsApp className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-700 hover:text-teal-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 py-4 px-6 shadow-md">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection(homeRef, "home")}
                className={`text-sm font-medium py-2 transition-colors ${
                  activeSection === "home"
                    ? "text-teal-600 font-semibold"
                    : "text-slate-600 hover:text-teal-600"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection(carpetsRef, "carpets")}
                className={`text-sm font-medium py-2 transition-colors ${
                  activeSection === "carpets"
                    ? "text-teal-600 font-semibold"
                    : "text-slate-600 hover:text-teal-600"
                }`}
              >
                Carpets
              </button>
              <button
                onClick={() => scrollToSection(vinylRef, "vinyl")}
                className={`text-sm font-medium transition-colors ${
                  activeSection === "vinyl"
                    ? "text-teal-600 font-semibold"
                    : "text-slate-600 hover:text-teal-600"
                }`}
              >
                Vinyl
              </button>

              <button
                onClick={() => scrollToSection(furnitureRef, "furniture")}
                className={`text-sm font-medium py-2 transition-colors ${
                  activeSection === "furniture"
                    ? "text-teal-600 font-semibold"
                    : "text-slate-600 hover:text-teal-600"
                }`}
              >
                Furniture
              </button>
              <button
                onClick={() => scrollToSection(aboutRef, "about")}
                className={`text-sm font-medium py-2 transition-colors ${
                  activeSection === "about"
                    ? "text-teal-600 font-semibold"
                    : "text-slate-600 hover:text-teal-600"
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection(contactRef, "contact")}
                className={`text-sm font-medium py-2 transition-colors ${
                  activeSection === "contact"
                    ? "text-teal-600 font-semibold"
                    : "text-slate-600 hover:text-teal-600"
                }`}
              >
                Contact Us
              </button>

              <div className="flex items-center justify-center gap-12 sm:gap-4 pt-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-teal-600 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-teal-600 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-teal-600 transition-colors"
                >
                  <WhatsApp className="h-5 w-5" />
                  <span className="sr-only">WhatsApp</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          ref={homeRef}
          className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-teal-800 to-teal-700 text-white"
        >
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none text-white">
                      Elevate Your Home With Exquisite Carpets & Furniture
                    </h1>
                    <p className="max-w-[600px] text-teal-100 text-lg md:text-xl">
                      Discover the perfect blend of tradition and luxury at SB
                      Carpet and Furniture. Our handcrafted pieces bring warmth,
                      style, and comfort to every corner of your home.
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-xl font-semibold text-white">
                      Visit our showroom today and transform your living space!
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=550&width=550"
                    width={550}
                    height={550}
                    alt="Elegant living room with carpet and furniture"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover w-full max-w-[550px] lg:order-last shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Carpets Section */}
        <section
          ref={carpetsRef}
          className="w-full py-12 md:py-24 lg:py-32 bg-slate-50"
        >
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm text-teal-800 mb-2">
                    Premium Collection
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-slate-800">
                    <span className="text-teal-700">Our Premium</span> Carpet
                    Collection
                  </h2>
                  <p className="max-w-[900px] text-slate-600 text-base md:text-xl/relaxed">
                    Handcrafted carpets made with the finest materials to add
                    warmth and style to your home.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid gap-6 sm:gap-8 py-8 sm:py-12 grid-cols-1 sm:grid-cols-2">
                {/* Carpet 1 */}
                <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-teal-300">
                  <div className="absolute top-0 right-0 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded-bl-lg z-10">
                    Best Seller
                  </div>
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    width={600}
                    height={400}
                    alt="Persian Wool Carpet"
                    className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-slate-800">
                      Persian Wool Carpet
                    </h3>
                    <p className="text-slate-600">
                      Hand-knotted with premium wool, featuring traditional
                      Persian patterns.
                    </p>
                    {/* <div className="mt-2">
                      <span className="text-lg font-bold text-teal-700">
                        £1,299
                      </span>
                    </div> */}
                  </div>
                </div>

                {/* Carpet 2 */}
                <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-teal-300">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    width={600}
                    height={400}
                    alt="Modern Geometric Carpet"
                    className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-slate-800">
                      Modern Geometric Carpet
                    </h3>
                    <p className="text-slate-600">
                      Contemporary design with bold geometric patterns in
                      neutral tones.
                    </p>
                    {/* <div className="mt-2">
                      <span className="text-lg font-bold text-teal-700">
                        £899
                      </span>
                    </div> */}
                  </div>
                </div>

                {/* Carpet 3 */}
                <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-teal-300">
                  <div className="absolute top-0 right-0 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded-bl-lg z-10">
                    Premium
                  </div>
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    width={600}
                    height={400}
                    alt="Luxury Silk Blend Carpet"
                    className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-slate-800">
                      Luxury Silk Blend Carpet
                    </h3>
                    <p className="text-slate-600">
                      Exquisite silk blend with intricate floral patterns and
                      rich colors.
                    </p>
                    {/* <div className="mt-2">
                      <span className="text-lg font-bold text-teal-700">
                        £1,599
                      </span>
                    </div> */}
                  </div>
                </div>

                {/* Carpet 4 */}
                <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-teal-300">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    width={600}
                    height={400}
                    alt="Vintage Distressed Carpet"
                    className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-slate-800">
                      Vintage Distressed Carpet
                    </h3>
                    <p className="text-slate-600">
                      Artfully distressed design with a vintage feel and durable
                      construction.
                    </p>
                    {/* <div className="mt-2">
                      <span className="text-lg font-bold text-teal-700">
                        £999
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vinyl Section */}
        <section
          ref={vinylRef}
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-slate-100 to-white"
        >
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm text-teal-800 mb-2">
                    Premium Flooring
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-slate-800">
                    <span className="text-teal-700">Luxury</span> Vinyl
                    Collection
                  </h2>
                  <p className="max-w-[900px] text-slate-600 text-base md:text-xl/relaxed">
                    High-performance vinyl flooring that delivers style,
                    durability, and easy maintenance for modern spaces.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid gap-6 sm:gap-8 py-8 sm:py-12 grid-cols-1 sm:grid-cols-2">
                {/* Vinyl 1 */}
                <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-teal-300">
                  <div className="absolute top-0 right-0 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded-bl-lg z-10">
                    Popular
                  </div>
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    width={600}
                    height={400}
                    alt="Textured Oak Vinyl"
                    className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-slate-800">
                      Textured Oak Vinyl
                    </h3>
                    <p className="text-slate-600">
                      Authentic wood-grain finish with waterproof durability and
                      easy installation.
                    </p>
                  </div>
                </div>

                {/* Vinyl 2 */}
                <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-teal-300">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    width={600}
                    height={400}
                    alt="Herringbone Vinyl Plank"
                    className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-slate-800">
                      Herringbone Vinyl Plank
                    </h3>
                    <p className="text-slate-600">
                      Stylish pattern with scratch-resistant surface and
                      long-lasting performance.
                    </p>
                  </div>
                </div>

                {/* Vinyl 3 */}
                <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-teal-300">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    width={600}
                    height={400}
                    alt="Stone Effect Vinyl"
                    className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-slate-800">
                      Stone Effect Vinyl
                    </h3>
                    <p className="text-slate-600">
                      Elegant stone visuals with soft underfoot feel and easy
                      upkeep.
                    </p>
                  </div>
                </div>

                {/* Vinyl 4 */}
                <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-teal-300">
                  <div className="absolute top-0 right-0 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded-bl-lg z-10">
                    New Arrival
                  </div>
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    width={600}
                    height={400}
                    alt="Matte Finish Vinyl Tiles"
                    className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-slate-800">
                      Matte Finish Vinyl Tiles
                    </h3>
                    <p className="text-slate-600">
                      Sleek matte finish with anti-slip surface, perfect for
                      high-traffic areas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Furniture Section */}
        <section
          ref={furnitureRef}
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-slate-100 to-white"
        >
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm text-teal-800 mb-2">
                    Luxury Selection
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-slate-800">
                    <span className="text-teal-700">Luxury</span> Furniture
                    Collection
                  </h2>
                  <p className="max-w-[900px] text-slate-600 text-base md:text-xl/relaxed">
                    Expertly crafted furniture pieces that combine style,
                    comfort, and durability.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid gap-6 sm:gap-8 py-8 sm:py-12 grid-cols-1 sm:grid-cols-2">
                {/* Furniture 1 */}
                <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-teal-300">
                  <div className="absolute top-0 right-0 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded-bl-lg z-10">
                    Popular
                  </div>
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    width={600}
                    height={400}
                    alt="Modern Sectional Sofa"
                    className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-slate-800">
                      Modern Sectional Sofa
                    </h3>
                    <p className="text-slate-600">
                      Modular design with premium upholstery and comfortable
                      cushioning.
                    </p>
                    {/* <div className="mt-2">
                      <span className="text-lg font-bold text-teal-700">
                        £2,499
                      </span>
                    </div> */}
                  </div>
                </div>

                {/* Furniture 2 */}
                <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-teal-300">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    width={600}
                    height={400}
                    alt="King Size Platform Bed"
                    className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-slate-800">
                      King Size Platform Bed
                    </h3>
                    <p className="text-slate-600">
                      Solid wood frame with sleek design and built-in storage
                      options.
                    </p>
                    {/* <div className="mt-2">
                      <span className="text-lg font-bold text-teal-700">
                        £1,899
                      </span>
                    </div> */}
                  </div>
                </div>

                {/* Furniture 3 */}
                <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-teal-300">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    width={600}
                    height={400}
                    alt="Accent Lounge Chair"
                    className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-slate-800">
                      Accent Lounge Chair
                    </h3>
                    <p className="text-slate-600">
                      Ergonomic design with premium leather upholstery and solid
                      wood legs.
                    </p>
                    {/* <div className="mt-2">
                      <span className="text-lg font-bold text-teal-700">
                        £799
                      </span>
                    </div> */}
                  </div>
                </div>

                {/* Furniture 4 */}
                <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-teal-300">
                  <div className="absolute top-0 right-0 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded-bl-lg z-10">
                    New Arrival
                  </div>
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    width={600}
                    height={400}
                    alt="Dining Table Set"
                    className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-slate-800">
                      Dining Table Set
                    </h3>
                    <p className="text-slate-600">
                      Solid oak table with six matching chairs, perfect for
                      family gatherings.
                    </p>
                    {/* <div className="mt-2">
                      <span className="text-lg font-bold text-teal-700">
                        £2,199
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section
          ref={aboutRef}
          className="w-full py-12 md:py-24 lg:py-32 bg-slate-50"
        >
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm text-teal-800 mb-2">
                      Our Story
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-slate-800">
                      <span className="text-teal-700">About</span> Us
                    </h2>
                    <p className="text-slate-600 text-base md:text-xl/relaxed">
                      For more than 30 years, SB Carpet and Furniture has been
                      providing premium quality carpets and furniture to
                      discerning customers. Our commitment to craftsmanship,
                      quality materials, and exceptional customer service has
                      made us a trusted name in home furnishings.
                    </p>
                    <p className="text-slate-600 text-base md:text-xl/relaxed">
                      We carefully source our products from skilled artisans and
                      reputable manufacturers around the world, ensuring that
                      each piece meets our high standards for quality and
                      design.
                    </p>
                    <p className="font-medium text-base md:text-xl/relaxed text-teal-700">
                      We are approved from locals and proud to be a community
                      favorite!
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-teal-700 flex items-center">
                    <span className="inline-block w-8 h-1 bg-teal-600 mr-3"></span>
                    Our Craftsmanship
                  </h3>
                  <div className="grid gap-6">
                    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:border-teal-300 transition-colors">
                      <h4 className="text-lg font-semibold text-teal-700 mb-2">
                        Quality Materials
                      </h4>
                      <p className="text-slate-600">
                        We use only the finest materials, from premium wool and
                        silk for our carpets to solid hardwoods and top-grain
                        leathers for our furniture.
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:border-teal-300 transition-colors">
                      <h4 className="text-lg font-semibold text-teal-700 mb-2">
                        Traditional Techniques
                      </h4>
                      <p className="text-slate-600">
                        Our artisans employ time-honored techniques passed down
                        through generations, ensuring each piece is crafted with
                        care and attention to detail.
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:border-teal-300 transition-colors">
                      <h4 className="text-lg font-semibold text-teal-700 mb-2">
                        Sustainability Commitment
                      </h4>
                      <p className="text-slate-600">
                        We're committed to sustainable practices, from
                        responsibly sourced materials to eco-friendly
                        manufacturing processes that minimize environmental
                        impact.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section
          ref={contactRef}
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-teal-700 to-teal-800 text-white"
        >
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-teal-600 px-3 py-1 text-sm text-white mb-2">
                    Get In Touch
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Contact Us
                  </h2>
                  <p className="max-w-[900px] text-teal-100 text-base md:text-xl/relaxed">
                    Have questions or need assistance? Reach out to our team and
                    we'll get back to you as soon as possible.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid gap-8 py-12 md:grid-cols-2">
                <div className="space-y-6">
                  <a
                    href="https://www.google.com/maps?q=65+Doncaster+Rd,+Scunthorpe+DN15+7RG,+UK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="rounded-lg overflow-hidden border border-teal-600 h-[300px] w-full shadow-md">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d948.9759938321787!2d-0.6600289!3d53.5905969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4878db1f8949b5bb%3A0xc20555cbefadbd84!2s65%20Doncaster%20Rd%2C%20Scunthorpe%20DN15%207RG%2C%20UK!5e0!3m2!1sen!2suk!4v1713001234567!5m2!1sen!2suk"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </a>

                  <div className="space-y-4">
                    <a
                      href="https://www.google.com/maps?q=65+Doncaster+Rd,+Scunthorpe+DN15+7RG,+UK"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-teal-100 hover:text-white transition-colors"
                    >
                      <MapPin className="h-5 w-5 text-teal-200" />
                      <div>
                        <h3 className="font-medium text-white">Our Location</h3>
                        <p>65 Doncaster Rd, Scunthorpe DN15 7RG, UK</p>
                      </div>
                    </a>

                    <a
                      href="tel:+441724289198"
                      className="flex items-center gap-3 text-teal-100 hover:text-white transition-colors"
                    >
                      <PhoneCall className="h-5 w-5 text-teal-200" />
                      <div>
                        <h3 className="font-medium text-white">Telephone</h3>
                        <p>01724 289198</p>
                      </div>
                    </a>

                    <a
                      href="tel:+447525900400"
                      className="flex items-center gap-3 text-teal-100 hover:text-white transition-colors"
                    >
                      <Phone className="h-5 w-5 text-teal-200" />
                      <div>
                        <h3 className="font-medium text-white">Mobile</h3>
                        <p>07525 900400</p>
                      </div>
                    </a>

                    <a
                      href="mailto:southbankcarpetandfurniture@gmail.com"
                      className="flex items-center gap-3 text-teal-100 hover:text-white transition-colors"
                    >
                      <Mail className="h-5 w-5 text-teal-200" />
                      <div>
                        <h3 className="font-medium text-white">Email</h3>
                        <p>southbankcarpetandfurniture@gmail.com</p>
                      </div>
                    </a>
                  </div>

                  <div className="rounded-lg border border-teal-600 p-4 bg-teal-700/50">
                    <h3 className="font-medium text-white">Store Hours</h3>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-teal-100">
                      <span>Monday - Friday:</span>
                      <span>9:00 - 17:00</span>
                      <span>Saturday:</span>
                      <span>09:30 - 17:00</span>
                      {/* <span>Sunday:</span>
                      <span>11:00 AM - 5:00 PM</span> */}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {formSubmitted ? (
                    <div className="rounded-lg border border-teal-600 p-6 bg-teal-700/50 shadow-md flex flex-col items-center justify-center space-y-4 h-full min-h-[300px]">
                      <CheckCircle className="h-16 w-16 text-teal-200" />
                      <h3 className="text-xl font-bold text-white">
                        Message Sent!
                      </h3>
                      <p className="text-teal-100 text-center">
                        Thank you for contacting us. We'll get back to you as
                        soon as possible.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-4 rounded-lg border border-teal-600 p-6 bg-teal-700/50 shadow-md"
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label
                            htmlFor="firstName"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            First name
                          </label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formState.firstName}
                            onChange={handleInputChange}
                            placeholder="Enter your first name"
                            className={`border-teal-600 bg-teal-700/30 text-white placeholder:text-teal-200/50 ${
                              formErrors.firstName ? "border-red-400" : ""
                            }`}
                          />
                          {formErrors.firstName && (
                            <p className="text-red-300 text-xs mt-1">
                              {formErrors.firstName}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="lastName"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Last name
                          </label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formState.lastName}
                            onChange={handleInputChange}
                            placeholder="Enter your last name"
                            className={`border-teal-600 bg-teal-700/30 text-white placeholder:text-teal-200/50 ${
                              formErrors.lastName ? "border-red-400" : ""
                            }`}
                          />
                          {formErrors.lastName && (
                            <p className="text-red-300 text-xs mt-1">
                              {formErrors.lastName}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          className={`border-teal-600 bg-teal-700/30 text-white placeholder:text-teal-200/50 ${
                            formErrors.email ? "border-red-400" : ""
                          }`}
                        />
                        {formErrors.email && (
                          <p className="text-red-300 text-xs mt-1">
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Phone
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formState.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          className={`border-teal-600 bg-teal-700/30 text-white placeholder:text-teal-200/50 ${
                            formErrors.phone ? "border-red-400" : ""
                          }`}
                        />
                        {formErrors.phone && (
                          <p className="text-red-300 text-xs mt-1">
                            {formErrors.phone}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleInputChange}
                          placeholder="Enter your message"
                          className={`min-h-[120px] border-teal-600 bg-teal-700/30 text-white placeholder:text-teal-200/50 ${
                            formErrors.message ? "border-red-400" : ""
                          }`}
                        />
                        {formErrors.message && (
                          <p className="text-red-300 text-xs mt-1">
                            {formErrors.message}
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-white hover:bg-slate-100 text-teal-800"
                        disabled={formSubmitting}
                      >
                        {formSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Updated to single row layout */}
      <footer className="w-full border-t border-slate-200 bg-white py-4">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          <div className="flex md:flex-row items-center justify-between gap-y-4 md:gap-y-0 md:gap-x-8">
            {/* Logo */}
            <div className="hidden md:block">
              <img
                // src="/main-logo.png"
                src="/new-logo.jpeg"
                alt="SB Carpet and Furniture Logo"
                className="h-12"
              />
            </div>

            {/* Copyright */}
            <div className="text-md text-slate-500 text-center md:text-right">
              © {new Date().getFullYear()} SB Carpet and Furniture Ltd. All
              rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
