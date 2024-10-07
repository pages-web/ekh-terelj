'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AuthForm() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass , setShowConfirmPass] = useState(false)

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassVisibility = () => {
    setShowConfirmPass(!showConfirmPass);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            variant={isSignIn ? "default" : "outline"}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </Button>
          <Button
            variant={!isSignIn ? "default" : "outline"}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </Button>
        </div>

        <form className="space-y-4">
          {!isSignIn && (
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <Input
                type="text"
                id="firstName"
                placeholder="Enter your First Name"
                required
              />
            </div>
          )}
          {!isSignIn && (
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <Input
                type="text"
                id="lastName"
                placeholder="Enter your Last Name"
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••••"
                required
              />
              <Button
                type="button"
                className="absolute inset-y-0 right-0 px-3 text-sm text-white"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </div>
          </div>
          {!isSignIn && (
            <>
              <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
            </label>
            <div className="relative">
              <Input
                type={showConfirmPass ? "text" : "password"}
                id="confirmPassword"
                placeholder="••••••••••"
                required
              />
              <Button
                type="button"
                className="absolute inset-y-0 right-0 px-3 text-white text-sm "
                onClick={toggleConfirmPassVisibility}
              >
                {showConfirmPass ? "Hide" : "Show"}
              </Button>
            </div>
          </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Enter your Phone Number"
                  required
                />
              </div>
            </>
          )}
          <Button type="submit" className="w-full bg-green-800 text-white">
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
      </div>
    </div>
  );
}