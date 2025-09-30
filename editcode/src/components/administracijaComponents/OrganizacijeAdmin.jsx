import { useState, useEffect } from "react";
import axios from "axios";
import PrikaziOrganizacijeAdmin from "./organizacijeAdminComponents/PrikaziOrganizacijeAdmin";
import UrediOrganizacijuAdmin from "./organizacijeAdminComponents/UrediOrganizacijuAdmin";

export default function OrganizacijeAdmin() {
  const [organizacije, setOrganizacije] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/organizacije`)
      .then((rez) => {
        setOrganizacije(rez.data || []);
      })
      .catch((error) => console.log("Error", error.message));
  }, [edit]);

  if (!organizacije || organizacije.length === 0) {
    return <div>No organizacije found.</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {organizacije.map((organizacija) => (
        <div
          key={organizacija.id}
          className="grid lg:grid-cols-4 max-lg:flex max-lg:flex-col max-lg:items-center max-lg:justify-center justify-between border border-gold-50 p-2 rounded-md text-black-62 shadow"
        >
          {edit ? (
            <UrediOrganizacijuAdmin
              organizacija={organizacija}
              setOrganizacije={setOrganizacije}
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
