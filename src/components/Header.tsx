import { Link } from 'react-router-dom';
import {Search, User} from 'lucide-react';
import {ModeToggle} from "@ui/elements/ModeToggle.tsx";
import {Button} from "@ui/button.tsx";

const Header = () => {
    return (
        <header className="bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-700">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold">
                        OfferLY
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex">
                        <Button asChild variant={'link'}>
                            <Link to="/" aria-label="Home page">Home</Link>
                        </Button>
                        <Button asChild variant={'link'}>
                            <Link to="/categories" aria-label="Categories page">Categories</Link>
                        </Button>
                    </nav>

                    {/* Right side icons */}
                    <div className="flex items-center">
                        <Button variant='link' size='icon' aria-label="Search">
                            <Search/>
                        </Button>
                        <Button variant='link' size='icon' aria-label="Profile">
                            <User/>
                        </Button>
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;