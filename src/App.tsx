import { Routes, Route } from 'react-router-dom';
import ProductPage from './components/ProductPage/ProductPage';
import { Layout } from './components/Layout/Layout';
import MainPage from './components/MainPage/MainPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path="/:productId" element={<ProductPage />} />
            </Route>
        </Routes>
    );
}

export default App;
