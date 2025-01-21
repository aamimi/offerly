import {Outlet} from 'react-router-dom';
import Header from './Header';
import Footer from "./Footer";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-zinc-100">
            <Header/>
            <main className="flex flex-row gap-3 container mx-auto py-4">
                <aside className="w-64 bg-zinc-50 pt-4 rounded-lg h-fit hidden lg:block">
                    <div className="text-center mb-3 px-4"><span>Advertisements</span></div>
                    <div className="flex flex-col gap-2" style={{ height: '75vh' }}>
                        <div id="advertisement-g-first" className="h-full">
                            <img
                                src="https://placehold.co/190x800"
                                alt="Advertisement"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </aside>
                <Outlet/>
                <aside className="w-96 bg-zinc-50 pt-4 rounded-lg h-fit hidden lg:block">
                    <div className="text-center mb-3 px-4"><span>Advertisements</span></div>
                    <div className="flex flex-col gap-2 h-60">
                        <div id="advertisement-g-first" className="h-full">
                            <img
                                src="https://placehold.co/380x320"
                                alt="Advertisement"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </aside>
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;