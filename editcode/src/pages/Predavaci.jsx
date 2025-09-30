import { useState, useEffect, useContext } from "react";
import FilterPredavaci from "../components/predavaciComponents/FilterPredavaci";
import Predavac from "../components/predavaciComponents/Predavac";
import userContext from "../components/userContext";
import axios from "axios";
import FormPredavac from "../components/predavaciComponents/FormPredavac";

export default function Predavaci() {
  const [filterTema, setFilterTema] = useState("");
  const [filterOrganizacija, setFilterOrganizacija] = useState("");
  const [predavaci, setPredavaci] = useState([]);
  const [prikazi, setPrikazi] = useState(false);
  const user = useContext(userContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/predavaci`)
      .then((rez) => setPredavaci(rez.data))
      .catch((error) => console.log(error));
  }, []);

  const filteredPredavaci = predavaci.filter((p) => {
    if (
      (filterTema === "" || p.tema === filterTema) &&
      (filterOrganizacija === "" || p.organizacija === filterOrganizacija)
    ) {
      return true;
    }
    return false;
  });

  return (
    <div className="flex flex-col gap-4 md:px-24 px-2 py-20 font-inter ">
      <div className="flex flex-col gap-2 items-center">
        {user && prikazi ? (
          <FormPredavac setPredavaci={setPredavaci} setPrikazi={setPrikazi} />
        ) : (
          <div></div>
        )}
        {user && (
          <button
            onClick={() => setPrikazi(!prikazi)}
            className="border border-blue-46 bg-blue-46 hover:bg-blue-46/80 text-white-70 w-[220px] h-[50px] rounded-md self-end"
          >
            {prikazi ? <p>Odustani</p> : <p>+ Dodaj novog predavaca</p>}
          </button>
        )}
      </div>

      <div className="flex md:flex-row flex-col max-md:gap-4 md:justify-between">
        <FilterPredavaci
          filterTema={filterTema}
          setFilterTema={setFilterTema}
          filterOrganizacija={filterOrganizacija}
          setFilterOrganizacija={setFilterOrganizacija}
        />
        <div className="md:w-3/4 w-full grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-4 ">
          {filteredPredavaci.map((predavac) => (
            <Predavac
              key={predavac.id}
              user={user}
              predavac={predavac}
              setPredavaci={setPredavaci}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
