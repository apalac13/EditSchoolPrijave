import axios from "axios";
import { useState, useEffect } from "react";

function FilterRadionice(props) {
  const [teme, setTeme] = useState([]);
  const [tezine, setTezine] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3003/teme"),
      axios.get("http://localhost:3003/tezine"),
    ])
      .then(([rezTeme, rezTezine]) => {
        setTeme(rezTeme.data);
        setTezine(rezTezine.data);
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
        <p className="mb-4 text-xl text-blue-45/85">Težina</p>
        <div className="flex flex-col gap-2 text-black-62">
          {tezine.map((tezina) => (
            <label htmlFor="" key={tezina.id} className="flex">
              <input
                type="radio"
                name={tezina.ime}
                value={tezina.ime}
                checked={props.filterTezina === tezina.ime}
                onChange={(e) => props.setFilterTezinu(e.target.value)}
                className="w-8 h-8 border border-solid border-black-61 rounded-xl checked:bg-black-61 mr-2 cursor-pointer hover:text-black-61/60"
              />
              <p>{tezina.ime}</p>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterRadionice;
