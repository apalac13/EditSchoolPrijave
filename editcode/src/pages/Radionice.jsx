import { useState, useEffect, useContext } from "react";
import Filteri from "../components/radioniceComponents/Filteri";
import Radionica from "../components/radioniceComponents/Radionica";
import userContext from "../components/userContext";
import axios from "axios";

function Radionice(props) {
  const [filterTema, postaviFilterTemu] = useState("");
  const [filterTezina, postaviFilterTezinu] = useState("");
  const user = useContext(userContext);

  return (
    <div className="flex flex-col px-24 py-10">
      {user && (
        <button className="border border-blue-46 bg-blue-46 hover:bg-blue-46/80 text-white-70 w-[200px] h-[50px] rounded-md self-end">
          + Dodaj novu radioncu
        </button>
      )}
      <div className="flex justify-between">
        <Filteri
          filterTema={filterTema}
          postaviFilterTemu={postaviFilterTemu}
          filterTezina={filterTezina}
          postaviFilterTezinu={postaviFilterTezinu}
        />
        <Radionica />
      </div>
    </div>
  );
}

export default Radionice;
