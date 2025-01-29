import {Link, useLocation} from 'react-router-dom';
import {ArrowDownCircle, ArrowUpCircle, XCircle} from "lucide-react";
import {useEffect, useState} from "react";
import {scrollTo} from "@lib/scrollUtils";

const SCROLL_THRESHOLD = 300;

const Footer = () => {
    const [showFooterActions, setShowFooterActions] = useState(false);
    const [showFooter, setShowFooter] = useState(false);
    const [withInfiniteScroll, setWithInfiniteScroll] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setShowFooterActions(window.scrollY > SCROLL_THRESHOLD);
            if (window.scrollY <= SCROLL_THRESHOLD) {
                setShowFooter(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setWithInfiniteScroll(location.pathname === '/');
    }, [location.pathname]);

    return (
        <>
            <footer className={`footer ${ withInfiniteScroll ? 'fixed bottom-0 left-0 right-0' : '' } ${showFooter || !withInfiniteScroll ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="container mx-auto px-4 pt-8 pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-bold mb-4">OfferLY</h3>
                            <p className="text-gray-400">
                                Your one-stop shop for all your needs.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold mb-4">Company</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/about" className="text-gray-400 hover:text-white">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="text-gray-400 hover:text-white">
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/faq" className="text-gray-400 hover:text-white">
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                        <p>© 2024 OfferLY. All rights reserved.</p>
                    </div>
                </div>
            </footer>
            <div className={`footer-actions ${showFooterActions && withInfiniteScroll ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <button
                        onClick={() => scrollTo(0)}
                        className="btn-base btn-link btn-icon"
                        aria-label="Scroll to top"
                    >
                        <ArrowUpCircle size={20}/>
                        Back to Top
                    </button>

                    <button
                        onClick={() => setShowFooter(!showFooter)}
                        className="btn-base btn-link btn-icon"
                        aria-label="Show footer"
                    >
                        {showFooter ? <XCircle size={20}/> : <ArrowDownCircle size={20}/>}
                        {showFooter ? 'Hide' : 'Show'} Footer
                    </button>
                </div>
            </div>
        </>
    );
};

export default Footer;