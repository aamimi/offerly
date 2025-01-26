import { Link } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import {ModeToggle} from "@/components/ModeToggle.tsx";

const Header = () => {
    return (
        <header className="bg-zinc-800 text-zinc-300 shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="text-zinc-400 text-xl font-bold">
                        OfferLY
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <Link to="/" className="text-zinc-300 hover:text-zinc-100">
                            Home
                        </Link>
                        <Link to="/categories" className="text-zinc-300 hover:text-zinc-100">
                            Categories
                        </Link>
                    </nav>

                    {/* Right side icons */}
                    <div className="flex items-center space-x-4">
                        <button
                            title="Search"
                            className="p-2 hover:text-zinc-100 hover:bg-zinc-700 rounded-full">
                            <Search size={20} />
                        </button>
                        <button
                            title="Profile"
                            className="p-2 hover:text-zinc-100 hover:bg-zinc-700 rounded-full">
                            <User size={20} />
                        </button>
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;