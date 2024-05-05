import { useState, useEffect } from "react";
import axios from "axios";
import PrikaziOrganizacijeAdmin from "./organizacijeAdminComponents/PrikaziOrganizacijeAdmin";
import UrediOrganizacijuAdmin from "./organizacijeAdminComponents/UrediOrganizacijuAdmin";

function OrganizacijeAdmin(props) {
  const [organizacije, setOrganizacije] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3003/organizacije")
      .then((rez) => setOrganizacije(rez.data))
      .catch((error) => console.log("Error", error.message));
  }, [edit]);

  return (
    <div className="flex flex-col gap-1">
      {organizacije.map((organizacija) => (
        <div
          key={organizacija.id}
          className="grid grid-cols-4 justify-between border border-gold-50 p-2 rounded-md text-black-62 shadow"
        >
          {edit ? (
            <UrediOrganizacijuAdmin
              organizacija={organizacija}
              setOrganizacije={setOrganizacije}
              edit={edit}
              setEdit={setEdit}
            />
          ) : (
            <PrikaziOrganizacijeAdmin
              organizacija={organizacija}
              setOrganizacije={setOrganizacije}
              edit={edit}
              setEdit={setEdit}
            />
          )}
        </div>
      ))}
    </div>
  );
}
export default OrganizacijeAdmin;
