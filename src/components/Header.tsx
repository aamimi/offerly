import { Link } from 'react-router-dom';
import {Search, User} from 'lucide-react';
import {ModeToggle} from "@ui/elements/ModeToggle.tsx";
import {Button} from "@ui/button.tsx";

const Header = () => {
    return (
        <header className="header">
            <div className="container mx-auto flex flex-row justify-between">
                <div className='w-72 h-16 hidden lg:block'></div>
                <div className="flex flex-row items-center justify-between h-16 w-full px-4">
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
                    <div className="flex flex-row items-center">
                        <Button variant='link' size='icon' aria-label="Search">
                            <Search/>
                        </Button>
                        <Button variant='link' size='icon' aria-label="Profile">
                            <User/>
                        </Button>
                        <ModeToggle />
                    </div>
                </div>
                <div className='w-80 h-16 hidden lg:block'></div>
            </div>
        </header>
    );
};

export default Header;