import {Link, useNavigate} from 'react-router-dom';
import {Home, LayoutGrid, Menu, Search, User, X} from 'lucide-react';
import {ModeToggle} from "@ui/elements/ModeToggle";
import {Button} from "@ui/button";
import {useEffect, useRef, useState} from 'react';

const Header = () => {
    const navigate = useNavigate();
    const [searchResult, setSearchResult] = useState({categories: [], products: []});
    const [searchQuery, setSearchQuery] = useState('');
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [isSearchResultVisible, setIsSearchResultVisible] = useState(false);
    const searchResultRef = useRef<HTMLDivElement>(null);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        let result = {
            categories: [
                {slug: 'apple', name: 'Apple'},
                {slug: 'banana', name: 'Banana'},
                {slug: 'orange', name: 'Orange'},
                {slug: 'mango', name: 'Mango'},
                {slug: 'grape', name: 'Grape'}
            ],
            products: [
                {
                    slug: 'iphone-13',
                    title: 'iaphone 13',
                    price: 1000,
                    rating: 4.5,
                    thumbnail: 'https://placehold.co/150x150'
                },
                {
                    slug: 'iphone-12',
                    title: 'iaphone 12',
                    price: 900,
                    rating: 4.3,
                    thumbnail: 'https://placehold.co/150x150'
                },
                {
                    slug: 'iphone-11',
                    title: 'iaphone 11',
                    price: 800,
                    rating: 4.1,
                    thumbnail: 'https://placehold.co/150x150'
                },
                {
                    slug: 'iphone-x',
                    title: 'iaphone X',
                    price: 700,
                    rating: 4.0,
                    thumbnail: 'https://placehold.co/150x150'
                },
                {
                    slug: 'iphone-8',
                    title: 'iaphone 8',
                    price: 600,
                    rating: 3.9,
                    thumbnail: 'https://placehold.co/150x150'
                }
            ]
        };
        // filter the result based on the search query
        result = {
            categories: result.categories.filter((item) => item.name.toLowerCase().includes(event.target.value.toLowerCase())),
            products: result.products.filter((item) => item.title.toLowerCase().includes(event.target.value.toLowerCase()))
        };
        console.log(result);
        setSearchResult(result);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate(`projects?q=${searchQuery}`);
    };

    const showNavigation = () => {
        setIsNavVisible(true);
    }

    const hideNavigation = () => {
        setIsNavVisible(false);
    }

    const handleSearchFocus = () => {
        setIsSearchResultVisible(true);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (searchResultRef.current && !searchResultRef.current.contains(event.target as Node)) {
            setIsSearchResultVisible(false);
        }
    };

    useEffect(() => {
        if (isNavVisible) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isNavVisible]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                        <div className="w-6/12 relative ml-4 sm:ml-0">
                            <form onSubmit={handleSearchSubmit}>
                                <div
                                    onClick={handleSearchFocus}
                                    role="button"
                                    className="flex flex-row pl-2 py-1.5 rounded-md bg-transparent border border-zinc-300 shadow-sm">
                                    <Search size={24} className="text-zinc-400"/>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        placeholder="Search..."
                                        className="w-full px-2 rounded-md bg-transparent font-semibold placeholder:font-normal placeholder-zinc-400 focus:outline-none"
                                        aria-label="Search input"
                                    />
                                </div>
                            </form>
                            {isSearchResultVisible && (
                                <div id="search-result" ref={searchResultRef}
                                     className="base-card rounded-md shadow-md absolute max-h-96 w-full mx-auto mt-1 z-50 overflow-y-auto">
                                    <div>
                                        {searchResult.categories.length === 0 && searchResult.products.length === 0 && (
                                            <div className="px-6 py-3">
                                                No result found
                                            </div>
                                        )}
                                        <div>
                                            {searchResult.categories.length > 0 && (
                                                <div>
                                                    <div className="bg-zinc-200 dark:bg-zinc-900 px-6 py-3 font-bold">
                                                        Categories
                                                    </div>
                                                    {searchResult.categories.map((item: {
                                                        slug: number,
                                                        name: string
                                                    }) => (
                                                        <div key={item.slug}
                                                             className="px-6 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-700">
                                                            {item.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {searchResult.products.length > 0 && (
                                                <div>
                                                    <div className="bg-zinc-200 dark:bg-zinc-900 px-6 py-3 font-bold">
                                                        Products
                                                    </div>
                                                    {searchResult.products.map((item: {
                                                        slug: number,
                                                        thumbnail: string,
                                                        title: string,
                                                        price: number,
                                                        rating: number
                                                    }) => (
                                                        <div key={item.slug}
                                                             className="px-6 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-700">
                                                            <img src={item.thumbnail} alt={item.title}
                                                                 className="w-8 h-8"/>
                                                            {item.title}/{item.price}/{item.rating}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
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