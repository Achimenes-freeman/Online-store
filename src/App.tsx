import styles from './App.module.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';

function App() {
    return (
        <div className={styles.App} >
            <Header />
            <MainPage />
            <Footer />
        </div>
    )
}

export default App;
