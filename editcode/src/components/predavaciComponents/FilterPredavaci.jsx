import axios from "axios";
import { useState, useEffect } from "react";

function FilterPredavaci(props) {
  const [teme, setTeme] = useState([]);
  const [organizacije, setOrganizaciju] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3003/teme"),
      axios.get("http://localhost:3003/organizacije"),
    ])
      .then(([rezTeme, rezOrganizacije]) => {
        setTeme(rezTeme.data);
        setOrganizaciju(rezOrganizacije.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="w-1/4 flex flex-col gap-14 ">
      <div className="flex flex-col gap-4">
        <p className="mb-4 text-xl text-blue-45/85">Teme</p>
        <div className="flex flex-col gap-2 text-black-62">
          {teme.map((tema) => (
            <label htmlFor="" key={tema.id} className="flex">
              <input
                type="radio"
                name={tema.ime}
                value={tema.ime}
                checked={props.filterTema === tema.ime}
                onChange={(e) => props.setFilterTemu(e.target.value)}
                className="w-8 h-8 border border-solid border-black-61 rounded-xl checked:bg-black-61 mr-2 cursor-pointer hover:text-black-61/60"
              />
              <p>{tema.ime}</p>
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="mb-4 text-xl text-blue-45/85">Organizacije</p>
        <div className="flex flex-col gap-2 text-black-62">
          {organizacije.map((organizacija) => (
            <label htmlFor="" key={organizacija.id} className="flex">
              <input
                type="radio"
                name={organizacija.ime}
                value={organizacija.ime}
                checked={props.filterOrganizacija === organizacija.ime}
                onChange={(e) => props.setFilterOrganizaciju(e.target.value)}
                className="w-8 h-8 border border-solid border-black-61 rounded-xl checked:bg-black-61 mr-2 cursor-pointer hover:text-black-61/60"
              />
              <p>{organizacija.ime}</p>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterPredavaci;
