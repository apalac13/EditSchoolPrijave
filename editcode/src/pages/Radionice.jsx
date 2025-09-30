import { useState, useEffect, useContext } from "react";
import FilterRadionice from "../components/radioniceComponents/FilterRadionice";
import Radionica from "../components/radioniceComponents/Radionica";
import FormRadionica from "../components/radioniceComponents/FormRadionica";
import userContext from "../components/userContext";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Radionice() {
  const [filterTema, setFilterTema] = useState("");
  const [filterTezina, setFilterTezina] = useState("");
  const [radionice, setRadionice] = useState([]);
  const [prikazi, setPrikazi] = useState(false);
  const { imepredavaca } = useParams();
  const user = useContext(userContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/radionice`)
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
    <div className="flex flex-col gap-4 md:px-24 px-2 py-20 font-inter ">
      <div className="flex flex-col gap-2 items-center">
        {user && prikazi ? (
          <FormRadionica setRadionice={setRadionice} setPrikazi={setPrikazi} />
        ) : (
          <div></div>
        )}
        {user && (
          <button
            onClick={() => setPrikazi(!prikazi)}
            className="border border-blue-46 bg-blue-46 hover:bg-blue-46/80 text-white-70 w-[200px] h-[50px] rounded-md self-end"
          >
            {prikazi ? <p>Odustani</p> : <p>+ Dodaj novu radioncu</p>}
          </button>
        )}
      </div>

      <div className="flex md:flex-row flex-col max-md:gap-4 md:justify-between">
        <FilterRadionice
          filterTema={filterTema}
          setFilterTema={setFilterTema}
          filterTezina={filterTezina}
          setFilterTezina={setFilterTezina}
        />
        <div className="md:w-3/4 w-full flex flex-col gap-3 ">
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
