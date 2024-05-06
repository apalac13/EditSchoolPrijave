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
      <button
        className="bg-[#50C878] border-[#50C878] hover:bg-[#50C878]/80 rounded-md p-2 mb-2 text-white-70"
        onClick={() => setDodaj(!dodaj)}
      >
        {" "}
        &#8617; Natrag
      </button>
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
