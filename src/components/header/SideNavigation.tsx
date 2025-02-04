import React from 'react';
import { Link } from 'react-router-dom';
import { Home, LayoutGrid, User, X } from 'lucide-react';
import { Button } from "@ui/button";

interface SideNavigationProps {
    isVisible: boolean;
    onClose: () => void;
}

export const SideNavigation: React.FC<SideNavigationProps> = ({ isVisible, onClose }) => {
    return (
        <>
            {/* Backdrop */}
            {isVisible && (<div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>)}
            {/* Navigation */}
            <div className={`main-nav ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-row justify-between items-center bg-zinc-100 dark:bg-zinc-900 h-16 px-6">
                    <span className="text-2xl font-bold">Menu</span>
                    <X size="26" className="cursor-pointer" onClick={onClose} />
                </div>
                <div className="px-6">
                    <nav className="flex flex-col items-start gap-2 py-6">
                        <Button asChild variant={'link'} className={`p-0 text-md`}>
                            <Link to="/" aria-label="Home page" onClick={onClose}><Home/> Home</Link>
                        </Button>
                        <Button asChild variant={'link'} className={`p-0 text-md`}>
                            <Link
                                to="/categories"
                                aria-label="Categories page"
                                onClick={onClose}>
                                <LayoutGrid/> Categories
                            </Link>
                        </Button>
                    </nav>
                    <div className="flex flex-col items-start border-t border-zinc-400 py-4">
                        <Button variant='link' className="p-0 text-md" aria-label="Profile" onClick={onClose}>
                            <User/> Profile
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};