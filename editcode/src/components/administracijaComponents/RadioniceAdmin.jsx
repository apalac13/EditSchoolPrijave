import { useState, useEffect } from "react";
import axios from "axios";
import UrediRadionicuAdmin from "./radioniceAdminComponents.jsx/UrediRadionicuAdmin";
import PrikaziRadioniceAdmin from "./radioniceAdminComponents.jsx/PrikaziRadioniceAdmin";

export default function RadioniceAdmin() {
  const [radionice, setRadionice] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3003/radionice")
      .then((rez) => {
        setRadionice(rez.data || []);
      })
      .catch((error) => console.log("Error", error.message));
  }, [edit]);

  return (
    <div className="flex flex-col gap-2">
      {radionice.map((radionica) => (
        <div
          key={radionica.id}
          className="grid lg:grid-cols-4 max-lg:flex max-lg:flex-col max-lg:items-center max-lg:justify-center justify-between border border-gold-50 p-2 rounded-md text-black-62 shadow"
        >
          {edit ? (
            <UrediRadionicuAdmin
              radionica={radionica}
              setRadionice={setRadionice}
              edit={edit}
              setEdit={setEdit}
            />
          ) : (
            <PrikaziRadioniceAdmin
              radionica={radionica}
              setRadionice={setRadionice}
              setEdit={setEdit}
            />
          )}
        </div>
      ))}
    </div>
  );
}
