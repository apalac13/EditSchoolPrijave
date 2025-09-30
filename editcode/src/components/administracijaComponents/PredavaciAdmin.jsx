import { useState, useEffect } from "react";
import axios from "axios";
import PrikaziPredavaceAdmin from "./predavaciAdminComponents/PrikaziPredavaceAdmin";
import UrediPredavacaAdmin from "./predavaciAdminComponents/UrediPredavacaAdmin";

export default function PredavaciAdmin() {
  const [predavaci, setPredavaci] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/predavaci`)
      .then((rez) => {
        setPredavaci(rez.data || []);
      })
      .catch((error) => console.log("Error", error.message));
  }, [edit]);
  return (
    <div className="flex flex-col gap-2">
      {predavaci.map((predavac) => (
        <div
          key={predavac.id}
          className="grid lg:grid-cols-4 max-lg:flex max-lg:flex-col max-lg:items-center max-lg:justify-center justify-between border border-gold-50 p-2 rounded-md text-black-62 shadow"
        >
          {edit ? (
            <UrediPredavacaAdmin
              predavac={predavac}
              setPredavaci={setPredavaci}
              setEdit={setEdit}
            />
          ) : (
            <PrikaziPredavaceAdmin
              predavac={predavac}
              setPredavaci={setPredavaci}
              edit={edit}
              setEdit={setEdit}
            />
          )}
        </div>
      ))}
    </div>
  );
}
