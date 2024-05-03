import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import userContext from "./components/userContext";
import Radionice from "./pages/Radionice";
import Predavaci from "./pages/Predavaci";
import Administracija from "./pages/Administracija";
import Navigacija from "./components/Navigacija";

function App() {
  const [korisnik, postaviKorisnika] = useState(false);
  const handleUserChange = (e) => {
    postaviKorisnika(e.target.checked);
  };

  return (
    <div>
      <userContext.Provider value={korisnik}>
        <Navigacija action={handleUserChange} />
        <Routes>
          <Route path="/" element={<Radionice />} />
          <Route path="/predavaci" element={<Predavaci />} />
          <Route path="/predavaci/:imepredavaca" element={<Radionice />} />
          <Route path="/administracija" element={<Administracija />} />
        </Routes>
      </userContext.Provider>
    </div>
  );
}

export default App;
