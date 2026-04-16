import { Outlet } from "react-router-dom";

// Components
import Header from "./components/Header";

const App = () => {
    return (
        <div className="app">
            <Header />
            <Outlet /> {/* Content of the page. */}
        </div>
    );
};

export default App;
