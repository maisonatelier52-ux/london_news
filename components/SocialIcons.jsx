"use client";

import { FaReddit, FaInstagram, FaLinkedin, FaTelegram, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function SocialIcons({ className = "" }) {
  return (
    <div className={`flex gap-4 text-white text-xl ${className}`}>
      <FaReddit className="cursor-pointer transition-all duration-300 hover:text-orange-500 hover:scale-110" />
      <FaInstagram className="cursor-pointer transition-all duration-300 hover:text-pink-500 hover:scale-110" />
      <FaXTwitter className="cursor-pointer transition-all duration-300 hover:text-gray-300 hover:scale-110" />
      <FaLinkedin className="cursor-pointer transition-all duration-300 hover:text-blue-500 hover:scale-110" />
      <FaTelegram className="cursor-pointer transition-all duration-300 hover:text-sky-400 hover:scale-110" />
      <FaFacebook className="cursor-pointer transition-all duration-300 hover:text-blue-600 hover:scale-110" />
    </div>
  );
}