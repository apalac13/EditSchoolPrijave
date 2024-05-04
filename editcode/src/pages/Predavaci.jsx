import { useState, useEffect, useContext } from "react";
import FilterPredavaci from "../components/predavaciComponents/FilterPredavaci";
import Predavac from "../components/predavaciComponents/Predavac";
import userContext from "../components/userContext";
import axios from "axios";
import FormPredavac from "../components/predavaciComponents/FormPredavac";

function Predavaci(props) {
  const [filterTema, setFilterTemu] = useState("");
  const [filterOrganizacija, setFilterOrganizaciju] = useState("");
  const [predavaci, setPredavaci] = useState([]);
  const [prikazi, setPrikazi] = useState(false);
  const user = useContext(userContext);

  useEffect(() => {
    axios
      .get("http://localhost:3003/predavaci")
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
    <div className="flex flex-col gap-4 px-24 py-20 font-inter ">
      <div className="flex justify-between">
        {user && prikazi ? (
          <FormPredavac setPredavaci={setPredavaci} />
        ) : (
          <div></div>
        )}
        {user && (
          <button
            onClick={() => setPrikazi(!prikazi)}
            className="border border-blue-46 bg-blue-46 hover:bg-blue-46/80 text-white-70 w-[200px] h-[50px] rounded-md self-end"
          >
            + Dodaj novog predavaca
          </button>
        )}
      </div>

      <div className="flex justify-between">
        <FilterPredavaci
          filterTema={filterTema}
          setFilterTemu={setFilterTemu}
          filterOrganizacija={filterOrganizacija}
          setFilterOrganizaciju={setFilterOrganizaciju}
        />
        <div className="w-3/4 grid grid-cols-3 gap-4 ">
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

export default Predavaci;
