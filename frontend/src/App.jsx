import Header from "./components/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/Home";

function App() {
    return (
        <div className="min-h-screen flex flex-col bg-light text-dark">
            <Header />

            <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10">
                <Home />
            </main>

            <Footer />
        </div>
    );
}

export default App;