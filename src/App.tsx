import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from "./components/Layout";
import Products from "./pages/Products";
import CreateReview from "./pages/CreateReview";
import ProductDetails from "./pages/ProductDetails";
import './App.css'


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/products/:id/create-review" element={<CreateReview />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
