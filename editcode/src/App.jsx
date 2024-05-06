import { useContext, useState } from "react";
import "./App.css";
import userContext from "./components/userContext";
import { Outlet } from "react-router-dom";
import Navigacija from "./components/Navigacija";
import Footer from "./components/Footer";

function App() {
  const [korisnik, postaviKorisnika] = useState(false);
  const handleUserChange = (e) => {
    postaviKorisnika(e.target.checked);
  };

  return (
    <div>
      <userContext.Provider value={korisnik}>
        <Navigacija action={handleUserChange} />
        <Outlet />
        <Footer />
      </userContext.Provider>
    </div>
  );
}

export default App;
