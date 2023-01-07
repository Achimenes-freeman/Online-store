// import styles from './App.module.scss';
import { Routes, Route } from 'react-router-dom';
import { CartPage } from './components/CartPage/CartPage';
import ProductPage from './components/ProductPage/ProductPage';
import { Layout } from './components/Layout/Layout';

function App() {
    // const arrayOfCartProducts = [
    //     { productId: 1, amount: 1 },
    //     { productId: 2, amount: 1 },
    //     { productId: 3, amount: 1 },
    //     { productId: 4, amount: 1 },
    // ];

    // localStorage.setItem('cart-products', JSON.stringify(arrayOfCartProducts));

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/:productId" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
            </Route>
        </Routes>
    );
}

export default App;
