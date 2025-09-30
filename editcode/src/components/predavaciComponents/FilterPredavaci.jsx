import axios from "axios";
import { useState, useEffect } from "react";

export default function FilterPredavaci(props) {
  const [teme, setTeme] = useState([]);
  const [organizacije, setOrganizaciju] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/teme`),
      axios.get(`${import.meta.env.VITE_API_URL}/organizacije`),
    ])
      .then(([rezTeme, rezOrganizacije]) => {
        setTeme(rezTeme.data);
        setOrganizaciju(rezOrganizacije.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="md:w-1/4 w-full flex flex-col gap-14 ">
      <div className="flex flex-col gap-4">
        <p className="mb-4 text-xl text-blue-45/85">Teme</p>
        <div className="flex flex-col gap-2 text-black-62">
          <label htmlFor="tema" className="flex">
            <input
              type="radio"
              name="tema"
              value=""
              checked={props.filterTema === ""}
              onChange={(e) => props.setFilterTema(e.target.value)}
              className="w-8 h-8 border border-solid border-black-61 rounded-xl checked:bg-black-61 mr-2 cursor-pointer hover:text-black-61/60"
            />
            <p>Sve</p>
          </label>
          {teme.map((tema) => (
            <label htmlFor="tema" key={tema.id} className="flex">
              <input
                type="radio"
                name="tema"
                value={tema.ime}
                checked={props.filterTema === tema.ime}
                onChange={(e) => props.setFilterTema(e.target.value)}
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
          <label htmlFor="organizacija" className="flex">
            <input
              type="radio"
              name="organizacija"
              value=""
              checked={props.filterOrganizacija === ""}
              onChange={(e) => props.setFilterOrganizacija(e.target.value)}
              className="w-8 h-8 border border-solid border-black-61 rounded-xl checked:bg-black-61 mr-2 cursor-pointer hover:text-black-61/60"
            />
            <p>Sve</p>
          </label>
          {organizacije.map((organizacija) => (
            <label
              htmlFor="organizacija"
              key={organizacija.id}
              className="flex"
            >
              <input
                type="radio"
                name="organizacija"
                value={organizacija.ime}
                checked={props.filterOrganizacija === organizacija.ime}
                onChange={(e) => props.setFilterOrganizacija(e.target.value)}
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
