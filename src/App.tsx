import { Routes, Route } from 'react-router-dom';
import ProductPage from './components/ProductPage/ProductPage';
import { Layout } from './components/Layout/Layout';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/:productId" element={<ProductPage />} />
            </Route>
        </Routes>
    );
}

export default App;
