import { useState, useEffect, useContext } from "react";
import FilterRadionice from "../components/radioniceComponents/FilterRadionice";
import Radionica from "../components/radioniceComponents/Radionica";
import FormRadionica from "../components/radioniceComponents/FormRadionica";
import userContext from "../components/userContext";
import axios from "axios";
import { useParams } from "react-router-dom";

function Radionice() {
  const [filterTema, setFilterTema] = useState("");
  const [filterTezina, setFilterTezina] = useState("");
  const [radionice, setRadionice] = useState([]);
  const [prikazi, setPrikazi] = useState(false);
  const { imepredavaca } = useParams();
  const user = useContext(userContext);

  useEffect(() => {
    axios
      .get("http://localhost:3003/radionice")
      .then((rez) => setRadionice(rez.data))
      .catch((error) => console.log(error));
  }, []);

  const filteredRadionice = radionice.filter((r) => {
    if (
      (filterTezina === "" || r.tezina === filterTezina) &&
      (filterTema === "" || r.tema === filterTema)
    ) {
      return true;
    }
    return false;
  });

  return (
    <div className="flex flex-col gap-4 px-24 py-20 font-inter ">
      <div className="flex justify-between">
        {user && prikazi ? (
          <FormRadionica setRadionice={setRadionice} />
        ) : (
          <div></div>
        )}
        {user && (
          <button
            onClick={() => setPrikazi(!prikazi)}
            className="border border-blue-46 bg-blue-46 hover:bg-blue-46/80 text-white-70 w-[200px] h-[50px] rounded-md self-end"
          >
            + Dodaj novu radioncu
          </button>
        )}
      </div>

      <div className="flex justify-between">
        <FilterRadionice
          filterTema={filterTema}
          setFilterTemu={setFilterTema}
          filterTezina={filterTezina}
          setFilterTezinu={setFilterTezina}
        />
        <div className="w-3/4 flex flex-col gap-3 ">
          {imepredavaca
            ? radionice
                .filter((r) => r.predavac === imepredavaca)
                .map((radionica) => (
                  <Radionica
                    key={radionica.id}
                    user={user}
                    radionica={radionica}
                    setRadionice={setRadionice}
                  />
                ))
            : filteredRadionice.map((radionica) => (
                <Radionica
                  key={radionica.id}
                  user={user}
                  radionica={radionica}
                  setRadionice={setRadionice}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default Radionice;
