import {Link} from 'react-router-dom';
import {Home, LayoutGrid, Menu, Search, User, X} from 'lucide-react';
import {ModeToggle} from "@ui/elements/ModeToggle.tsx";
import {Button} from "@ui/button.tsx";
import {useEffect, useState} from 'react';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isNavVisible, setIsNavVisible] = useState(false);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle search submit logic here
        console.log('Search query:', searchQuery);
    };

    const showNavigation = () => {
        setIsNavVisible(true);
    }

    const hideNavigation = () => {
        setIsNavVisible(false);
    }

    useEffect(() => {
        if (isNavVisible) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isNavVisible]);

    return (
        <>
            <header className="header">
                <div className="container mx-auto flex flex-row justify-between">
                    <div className='w-72 h-16 hidden lg:block'></div>
                    <div className="flex flex-row items-center justify-between h-16 w-full px-4">
                        <div className="flex flex-row items-center gap-4">
                            <Menu size={26} className="cursor-pointer" onClick={showNavigation}/>
                            <Link to="/"
                                  className="text-xl font-bold focus:outline-none focus:border focus:border-zinc-400 px-1">
                                OfferLY
                            </Link>
                        </div>
                        {/* Search input */}
                        <form onSubmit={handleSearchSubmit}>
                            <div
                                className="flex flex-row px-2 py-1.5 ml-4 w-52 md:w-96 rounded-full bg-transparent border border-zinc-300 shadow-sm">
                                <Search size={28} className="text-zinc-400"/>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Search..."
                                    className="w-full px-2 rounded-full bg-transparent font-semibold placeholder:font-normal placeholder-zinc-400 focus:outline-none"
                                    aria-label="Search input"
                                />
                            </div>
                        </form>
                        {/* Right side icons */}
                        <div className="hidden lg:flex flex-row items-center">
                            <Button variant='link' size='icon' aria-label="Profile">
                                <User/>
                            </Button>
                            <ModeToggle/>
                        </div>
                    </div>
                    <div className='w-80 h-16 hidden lg:block'></div>
                </div>
            </header>
            {/* Backdrop */}
            {isNavVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={hideNavigation}></div>
            )}
            {/* Navigation */}
            <div className={`main-nav ${isNavVisible ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-row justify-between items-center bg-zinc-100 dark:bg-zinc-900 h-16 px-6">
                    <span className="text-2xl font-bold">Menu</span>
                    <X size="26" className="cursor-pointer" onClick={hideNavigation}/>
                </div>
                <div className="px-6">
                    <nav className="flex flex-col items-start gap-2 py-6">
                        <Button asChild variant={'link'} className={`p-0 text-md`}>
                            <Link to="/" aria-label="Home page"><Home/> Home</Link>
                        </Button>
                        <Button asChild variant={'link'} className={`p-0 text-md`}>
                            <Link to="/categories" aria-label="Categories page"><LayoutGrid/> Categories</Link>
                        </Button>
                    </nav>
                    <div className="flex flex-col items-start border-t border-zinc-400 py-4">
                        <Button variant='link' className="p-0 text-md" aria-label="Profile">
                            <User/> Profile
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;