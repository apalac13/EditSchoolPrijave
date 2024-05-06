import { useState, useEffect } from "react";
import axios from "axios";

function Prikazi({ radionica }) {
  const [organizacije, setOrganizacije] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3003/organizacije")
      .then((rez) => setOrganizacije(rez.data))
      .catch((error) => console.log("Error:", error.message));
  }, []);

  console.log(organizacije);

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex">
        <p className="text-2xl text-blue-45/85 uppercase">{radionica.ime}</p>
      </div>
      <div className="flex flex-col gap-1 ">
        <div className="flex gap-1 text-sm text-black-61">
          <p className="">Opis:</p>
          <p>{radionica.opis}</p>
        </div>
        <div className="flex gap-1 text-sm text-black-61">
          <p>Predavaci:</p>
          <p>{radionica.predavac}</p>
        </div>
        <div className="flex gap-1 text-sm text-black-61">
          <p>Partneri:</p>
          <p>
            {organizacije
              .filter((org) => org.radionice.includes(radionica.ime))
              .map((org) => org.ime)
              .join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Prikazi;
