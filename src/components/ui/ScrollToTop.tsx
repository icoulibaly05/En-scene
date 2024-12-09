"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const footer = document.querySelector("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const isFooterVisible = footerRect.top <= window.innerHeight;
        setIsVisible(isFooterVisible);
      }
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-0 right-0 mb-16 mr-14 z-[9999] ${
        !isVisible ? "hidden" : ""
      } 
      transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      role="complementary"
    >
      <div className="group relative">
        <button
          onClick={scrollToTop}
          className={`
            p-4 bg-indigo-600/90 text-white
            hover:bg-indigo-800
            rounded-full 
            shadow-lg hover:shadow-2xl
            backdrop-blur-sm
            transition-all duration-300
            focus-visible:outline-none focus-visible:ring-2 
            focus-visible:ring-indigo-300 focus-visible:ring-offset-2
            hover:scale-105 
            border-2 border-indigo-400
          `}
          aria-label="Retour en haut de la page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
        <span
          className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 whitespace-nowrap 
          invisible group-hover:visible opacity-0 group-hover:opacity-100
          bg-indigo-900 text-white 
          text-sm font-medium py-2 px-4 rounded-lg
          transition-all duration-200
          shadow-lg backdrop-blur-sm bg-opacity/90"
          role="tooltip"
        >
          Retour en haut
        </span>
      </div>
    </div>
  );
}
