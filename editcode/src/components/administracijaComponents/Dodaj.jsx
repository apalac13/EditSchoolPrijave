import { useState, useEffect } from "react";
import axios from "axios";
import FormRadionica from "../radioniceComponents/FormRadionica";
import FormPredavac from "../predavaciComponents/FormPredavac";
import FormOrganizacija from "./organizacijeAdminComponents/FormOrganizacija";

function Dodaj({ activeLink, dodaj, setDodaj }) {
  const [radionice, setRadionice] = useState([]);
  const [organizacije, setOrganizacije] = useState([]);
  const [predavaci, setPredavaci] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3003/radionice"),
      axios.get("http://localhost:3003/organizacije"),
      axios.get("http://localhost:3003/predavaci"),
    ])
      .then(([rezRadionice, rezOrganizacije, rezPredavaci]) => {
        setRadionice(rezRadionice.data);
        setOrganizacije(rezOrganizacije.data);
        setPredavaci(rezPredavaci.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div>
      <button onClick={() => setDodaj(!dodaj)}>Natrag</button>
      {activeLink === "/administracija" && (
        <FormRadionica setRadionice={setRadionice} />
      )}
      {activeLink === "/administracija/organizacije" && (
        <FormOrganizacija setOrganizacije={setOrganizacije} />
      )}
      {activeLink === "/administracija/predavaci" && (
        <FormPredavac setPredavaci={setPredavaci} />
      )}
    </div>
  );
}

export default Dodaj;
