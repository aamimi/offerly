import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import { ModeToggle } from "@ui/elements/ModeToggle";
import { Button } from "@ui/button";
import { SearchComponent } from "@components/header/search/SearchComponent.tsx";
import { SideNavigation } from '@components/header/SideNavigation';

const Header: React.FC = () => {
    const [isNavVisible, setIsNavVisible] = useState<boolean>(false);
    const showNavigation = () => setIsNavVisible(true);
    const hideNavigation = () => setIsNavVisible(false);

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
                                  className="text-xl font-bold focus:outline-none focus:border focus:border-zinc-400">
                                OfferLY
                            </Link>
                        </div>
                        {/* Search input */}
                        <div className="w-6/12 relative ml-4 sm:ml-0">
                            <SearchComponent/>
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

            <SideNavigation isVisible={isNavVisible} onClose={hideNavigation}/>
        </>
    );
};

export default Header;