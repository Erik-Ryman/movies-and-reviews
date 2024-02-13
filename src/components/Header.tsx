import { AUTH } from "@/services/ApiService";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-screen">
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              MOVIES AND REVIEWS
            </span>
          </Link>
          <Link
            href="/login"
            onClick={() => {
              AUTH.logout();
            }}
            className="inline-flex items-center justify-center p-2 h-10 mr-4 sm:mr-2 text-sm bg-red-800 text-gray-200 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-hamburger"
            aria-expanded="false"
          >
            Sign out
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
