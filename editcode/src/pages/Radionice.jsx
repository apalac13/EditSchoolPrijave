import { useState, useEffect, useContext } from "react";
import Filteri from "../components/radioniceComponents/Filteri";
import Radionica from "../components/radioniceComponents/Radionica";
import Form from "../components/radioniceComponents/Form";
import userContext from "../components/userContext";
import axios from "axios";

function Radionice(props) {
  const [filterTema, setFilterTemu] = useState("");
  const [filterTezina, setFilterTezinu] = useState("");
  const [radionice, setRadionice] = useState([]);
  const [modal, setModal] = useState(false);
  const [prikazi, setPrikazi] = useState(false);
  const user = useContext(userContext);

  useEffect(() => {
    axios
      .get("http://localhost:3003/radionice")
      .then((rez) => setRadionice(rez.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex flex-col gap-4 px-24 py-10 ">
      <div className="flex justify-between">
        {user && prikazi ? <Form setRadionice={setRadionice} /> : <div></div>}
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
        <Filteri
          filterTema={filterTema}
          setFilterTemu={setFilterTemu}
          filterTezina={filterTezina}
          setFilterTezinu={setFilterTezinu}
        />
        <Radionica
          user={user}
          radionice={radionice}
          setRadionice={setRadionice}
        />
      </div>
    </div>
  );
}

export default Radionice;
