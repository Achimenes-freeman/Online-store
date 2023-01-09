import { Routes, Route } from 'react-router-dom';
import { CartPage } from './components/CartPage/CartPage';
import ProductPage from './components/ProductPage/ProductPage';
import { Layout } from './components/Layout/Layout';
import MainPage from './components/MainPage/MainPage';

function App() {
    const arrayOfCartProducts = {
        1: { amount: 2, price: 100 },
        2: { amount: 3, price: 150 },
        3: { amount: 1, price: 200 },
        4: { amount: 7, price: 300 },
    };
    localStorage.setItem('cart-data', JSON.stringify(arrayOfCartProducts));

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path="/:productId" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
            </Route>
        </Routes>
    );
}

export default App;
