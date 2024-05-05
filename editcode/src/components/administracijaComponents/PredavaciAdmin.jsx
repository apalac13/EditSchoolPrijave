import { useState, useEffect } from "react";
import axios from "axios";
import PrikaziPredavaceAdmin from "./predavaciAdminComponents/PrikaziPredavaceAdmin";
import UrediPredavacaAdmin from "./predavaciAdminComponents/UrediPredavacaAdmin";

function PredavaciAdmin(props) {
  const [predavaci, setPredavaci] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3003/predavaci")
      .then((rez) => setPredavaci(rez.data))
      .catch((error) => console.log("Error", error.message));
  }, []);
  return (
    <div className="flex flex-col gap-1">
      {predavaci.map((predavac) => (
        <div
          key={predavac.id}
          className="grid grid-cols-4 justify-between border border-gold-50 p-2 rounded-md text-black-62 shadow"
        >
          {edit ? (
            <UrediPredavacaAdmin
              predavac={predavac}
              setPredavaci={setPredavaci}
              edit={edit}
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
export default PredavaciAdmin;
