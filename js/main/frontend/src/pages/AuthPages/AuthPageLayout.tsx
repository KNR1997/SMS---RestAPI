import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          {/* <div className="relative flex items-center justify-center z-1">
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <Link to="/" className="block mb-4">
                <img
                  width={231}
                  height={48}
                  className="dark:hidden"
                  src="/images/logo/yma-logo.svg"
                  alt="Logo"
                />
                <img
                  width={231}
                  height={48}
                  className="hidden dark:block"
                  src="/images/logo/yma-logo-dark-mode.svg"
                  alt="Logo"
                />
              </Link>
              <p className="text-center text-gray-400 dark:text-white/60">
                Find your Eduaction path with us...
              </p>
            </div>
          </div> */}
          <div className="relative flex items-center justify-center w-full h-full z-1">
            <Link to="/" className="block w-full h-full">
              <img
                className="w-full h-full object-contain hidden dark:block"
                src="/images/logo/yma-logo.svg"
                alt="Logo"
              />
              <img
                className="w-full h-full object-contain dark:hidden"
                src="/images/logo/yma-logo-dark-mode.svg"
                alt="Logo"
              />
            </Link>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
