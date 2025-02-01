import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from "./components/Layout";
import Products from "./pages/Products";
import CreateReview from "./pages/CreateReview";
import ProductDetails from "./pages/ProductDetails";
import Categories from "@/pages/Categories";
import './App.css'
import CategoryDetails from "@/pages/CategoryDetails.tsx";



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Products />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/products/:id/create-review" element={<CreateReview />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/categories/:slug" element={<CategoryDetails />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
