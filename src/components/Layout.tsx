import {Outlet} from 'react-router-dom';
import Header from './Header';
import Footer from "./Footer";
import LeftAside from "@components/LeftAside.tsx";
import RightAside from "@components/RightAside.tsx";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-zinc-100 dark:bg-zinc-900">
            <Header/>
            <main className="flex flex-row gap-3 container mx-auto py-4 px-4 lg:px-0">
                <LeftAside/>
                <Outlet/>
                <RightAside/>
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;