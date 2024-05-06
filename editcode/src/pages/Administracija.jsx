import { Outlet } from "react-router-dom";
import NavigacijaAdmin from "../components/administracijaComponents/NavigacijaAdmin";
import { useContext, useState } from "react";
import Dodaj from "../components/administracijaComponents/Dodaj";
import userContext from "../components/userContext";

function Administracija(props) {
  const [activeLink, setActiveLink] = useState("");
  const [dodaj, setDodaj] = useState(false);

  const user = useContext(userContext);

  return (
    <div>
      {user ? (
        <div className="flex flex-col gap-4 px-24 pt-4 pb-20 font-inter">
          <NavigacijaAdmin
            setActiveLink={setActiveLink}
            dodaj={dodaj}
            setDodaj={setDodaj}
          />
          {dodaj ? (
            <Dodaj activeLink={activeLink} dodaj={dodaj} setDodaj={setDodaj} />
          ) : (
            <Outlet />
          )}
        </div>
      ) : (
        <p>Niste ovlasteni za pristup ovoj stranici</p>
      )}
    </div>
  );
}

export default Administracija;
