"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LoginForm from "./login-form"
import RegisterForm from "./register-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Star, Shield, Award, Heart } from "lucide-react"
import Image from "next/image"

interface AuthContainerProps {
  initialView?: "login" | "signup"
}

const AuthContainer = ({ initialView = "login" }: AuthContainerProps) => {
  const [currentView, setCurrentView] = useState<"login" | "signup">(
    initialView
  )

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  const [direction, setDirection] = useState(0)

  const switchToSignup = () => {
    setDirection(1)
    setCurrentView("signup")
  }

  const switchToLogin = () => {
    setDirection(-1)
    setCurrentView("login")
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
      <div className='w-full max-w-7xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20'>
        {/* Desktop Layout - 50/50 Grid */}
        <div className='hidden md:grid md:grid-cols-2 min-h-[700px]'>
          {/* Left Side - Image & Content */}
          <div className='relative overflow-hidden'>
            {/* Background Image */}
            <div className='absolute inset-0'>
              <Image
                src={
                  currentView === "login"
                    ? "/images/gallery/terelj1.jpg"
                    : "/images/gallery/terelj15.jpg"
                }
                alt='Terelj Resort'
                fill
                className='object-cover'
                priority
              />
              <div className='absolute inset-0 bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-indigo-900/60'></div>
            </div>

            {/* Content Overlay */}
            <div className='relative z-10 p-8 lg:p-12 flex flex-col justify-center h-full text-white'>
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className='space-y-6 lg:space-y-8'
              >
                {currentView === "login" ? (
                  <div className='space-y-6 lg:space-y-8'>
                    <div className='space-y-4 lg:space-y-6'>
                      <div className='flex items-center gap-2 lg:gap-3'>
                        <Star className='h-5 w-5 lg:h-6 lg:w-6 text-yellow-400 fill-current' />
                        <span className='text-sm lg:text-base font-semibold text-blue-100'>
                          Premium Experience
                        </span>
                      </div>
                      <div className='space-y-3 lg:space-y-4'>
                        <h1 className='text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight'>
                          Welcome Back to
                          <span className='block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent'>
                            Terelj Resort
                          </span>
                        </h1>
                        <p className='text-base lg:text-lg text-blue-100 leading-relaxed max-w-sm lg:max-w-md'>
                          Continue your luxurious journey with us and access
                          exclusive member benefits in Mongolia&apos;s most
                          beautiful destination.
                        </p>
                      </div>
                    </div>

                    <div className='space-y-4 lg:space-y-6'>
                      <div className='flex items-start gap-3 lg:gap-4'>
                        <div className='flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center backdrop-blur-sm'>
                          <Shield className='h-5 w-5 lg:h-6 lg:w-6 text-blue-200' />
                        </div>
                        <div className='space-y-1 lg:space-y-2'>
                          <h3 className='text-sm lg:text-base font-bold text-white'>
                            Secure Bookings
                          </h3>
                          <p className='text-xs lg:text-sm text-blue-100 leading-relaxed'>
                            Your reservations and personal data are protected
                            with industry-leading security.
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start gap-3 lg:gap-4'>
                        <div className='flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center backdrop-blur-sm'>
                          <Award className='h-5 w-5 lg:h-6 lg:w-6 text-blue-200' />
                        </div>
                        <div className='space-y-1 lg:space-y-2'>
                          <h3 className='text-sm lg:text-base font-bold text-white'>
                            VIP Member Benefits
                          </h3>
                          <p className='text-xs lg:text-sm text-blue-100 leading-relaxed'>
                            Enjoy priority booking, special rates, and exclusive
                            access to premium amenities.
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start gap-3 lg:gap-4'>
                        <div className='flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center backdrop-blur-sm'>
                          <Heart className='h-5 w-5 lg:h-6 lg:w-6 text-blue-200' />
                        </div>
                        <div className='space-y-1 lg:space-y-2'>
                          <h3 className='text-sm lg:text-base font-bold text-white'>
                            Personalized Service
                          </h3>
                          <p className='text-xs lg:text-sm text-blue-100 leading-relaxed'>
                            Our team remembers your preferences for a truly
                            personalized experience.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='space-y-6 lg:space-y-8'>
                    <div className='space-y-4 lg:space-y-6'>
                      <div className='flex items-center gap-2 lg:gap-3'>
                        <Star className='h-5 w-5 lg:h-6 lg:w-6 text-yellow-400 fill-current' />
                        <span className='text-sm lg:text-base font-semibold text-blue-100'>
                          Join Our Family
                        </span>
                      </div>
                      <div className='space-y-3 lg:space-y-4'>
                        <h1 className='text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight'>
                          Discover Paradise at
                          <span className='block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent'>
                            Terelj Resort
                          </span>
                        </h1>
                        <p className='text-base lg:text-lg text-blue-100 leading-relaxed max-w-sm lg:max-w-md'>
                          Create your account and unlock exclusive access to
                          Mongolia&apos;s premier luxury resort experience.
                        </p>
                      </div>
                    </div>

                    <div className='space-y-4 lg:space-y-6'>
                      <div className='flex items-start gap-3 lg:gap-4'>
                        <div className='flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center backdrop-blur-sm'>
                          <Star className='h-5 w-5 lg:h-6 lg:w-6 text-blue-200' />
                        </div>
                        <div className='space-y-1 lg:space-y-2'>
                          <h3 className='text-sm lg:text-base font-bold text-white'>
                            Member Exclusive Rates
                          </h3>
                          <p className='text-xs lg:text-sm text-blue-100 leading-relaxed'>
                            Save up to 25% on all bookings with special member
                            pricing.
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start gap-3 lg:gap-4'>
                        <div className='flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center backdrop-blur-sm'>
                          <Award className='h-5 w-5 lg:h-6 lg:w-6 text-blue-200' />
                        </div>
                        <div className='space-y-1 lg:space-y-2'>
                          <h3 className='text-sm lg:text-base font-bold text-white'>
                            Priority Access
                          </h3>
                          <p className='text-xs lg:text-sm text-blue-100 leading-relaxed'>
                            Be the first to book premium suites and exclusive
                            experiences.
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start gap-3 lg:gap-4'>
                        <div className='flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center backdrop-blur-sm'>
                          <Heart className='h-5 w-5 lg:h-6 lg:w-6 text-blue-200' />
                        </div>
                        <div className='space-y-1 lg:space-y-2'>
                          <h3 className='text-sm lg:text-base font-bold text-white'>
                            Wellness & Spa Access
                          </h3>
                          <p className='text-xs lg:text-sm text-blue-100 leading-relaxed'>
                            Complimentary access to our world-class spa and
                            wellness facilities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Decorative Elements */}
              <div className='absolute top-8 right-8 w-24 h-24 bg-white/5 rounded-full backdrop-blur-sm'></div>
              <div className='absolute bottom-8 left-8 w-16 h-16 bg-white/5 rounded-full backdrop-blur-sm'></div>
              <div className='absolute top-1/3 right-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse'></div>
              <div className='absolute bottom-1/3 left-1/4 w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-1000'></div>
            </div>
          </div>

          {/* Right Side - Forms */}
          <div className='flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-white to-gray-50 p-12'>
            <AnimatePresence mode='wait' custom={direction}>
              <motion.div
                key={currentView}
                custom={direction}
                variants={slideVariants}
                initial='enter'
                animate='center'
                exit='exit'
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
                className='w-full space-y-8'
              >
                {currentView === "login" ? (
                  <div className='space-y-8'>
                    <LoginForm />
                    <div className='text-center space-y-4'>
                      <p className='text-gray-600 text-sm'>
                        Don&apos;t have an account yet?
                      </p>
                      <Button
                        onClick={switchToSignup}
                        variant='outline'
                        className='rounded-xl px-8 py-3 hover:bg-blue-50 border-2 border-blue-200 text-blue-600 font-semibold transition-all duration-200 hover:shadow-md hover:border-blue-300'
                      >
                        Create Account <ArrowRight className='ml-2 h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className='space-y-8'>
                    <RegisterForm />
                    <div className='text-center space-y-4'>
                      <p className='text-gray-600 text-sm'>
                        Already have an account?
                      </p>
                      <Button
                        onClick={switchToLogin}
                        variant='outline'
                        className='rounded-xl px-8 py-3 hover:bg-blue-50 border-2 border-blue-200 text-blue-600 font-semibold transition-all duration-200 hover:shadow-md hover:border-blue-300'
                      >
                        <ArrowLeft className='mr-2 h-4 w-4' /> Sign In
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className='md:hidden'>
          {/* Mobile Header */}
          <div className='relative h-64 overflow-hidden'>
            <Image
              src={
                currentView === "login"
                  ? "/images/gallery/terelj1.jpg"
                  : "/images/gallery/terelj15.jpg"
              }
              alt='Terelj Resort'
              fill
              className='object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-800/50 to-blue-900/60'></div>

            <div className='relative z-10 p-6 text-white h-full flex flex-col justify-center text-center'>
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='space-y-4'
              >
                <div className='flex items-center justify-center gap-2'>
                  <Star className='h-6 w-6 text-yellow-400 fill-current' />
                  <span className='text-sm font-semibold text-blue-100'>
                    Premium Resort
                  </span>
                </div>
                <h1 className='text-2xl font-bold'>
                  {currentView === "login"
                    ? "Welcome Back!"
                    : "Join Terelj Resort"}
                </h1>
                <p className='text-blue-100 text-sm leading-relaxed'>
                  {currentView === "login"
                    ? "Access your exclusive member account"
                    : "Discover luxury in Mongolia&apos;s nature"}
                </p>
              </motion.div>

              {/* Mobile Navigation Dots */}
              <div className='flex justify-center mt-6 space-x-3'>
                <button
                  onClick={switchToLogin}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentView === "login" ? "bg-white w-8" : "bg-white/50 w-2"
                  }`}
                />
                <button
                  onClick={switchToSignup}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentView === "signup"
                      ? "bg-white w-8"
                      : "bg-white/50 w-2"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Mobile Form Section */}
          <div className='p-6 bg-gradient-to-br from-white to-gray-50'>
            <AnimatePresence mode='wait' custom={direction}>
              <motion.div
                key={currentView}
                custom={direction}
                variants={slideVariants}
                initial='enter'
                animate='center'
                exit='exit'
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className='w-full space-y-6'
              >
                {currentView === "login" ? (
                  <div className='space-y-6'>
                    <LoginForm />
                    <div className='text-center'>
                      <Button
                        onClick={switchToSignup}
                        variant='link'
                        className='text-blue-600 font-semibold'
                      >
                        Don&apos;t have an account? Sign up
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className='space-y-6'>
                    <RegisterForm />
                    <div className='text-center'>
                      <Button
                        onClick={switchToLogin}
                        variant='link'
                        className='text-blue-600 font-semibold'
                      >
                        Already have an account? Sign in
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthContainer
