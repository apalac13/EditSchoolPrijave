import { useState, useEffect } from "react";
import axios from "axios";
import InputField from "../InputField";

export default function FormRadionica({ setRadionice, setPrikazi }) {
  const [novaRadionica, setNovaRadionica] = useState({
    ime: "",
    datum: "",
    predavac: "",
    opis: "",
    tema: "",
    tezina: "",
    broj_prijava: 0,
  });

  const [teme, setTeme] = useState([]);
  const [tezine, setTezine] = useState([]);
  const [predavaci, setPredavaci] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/teme`),
      axios.get(`${import.meta.env.VITE_API_URL}/tezine`),
      axios.get(`${import.meta.env.VITE_API_URL}/predavaci`),
    ])
      .then(([rezTeme, rezTezine, rezPredavaci]) => {
        setTeme(rezTeme.data);
        setTezine(rezTezine.data);
        setPredavaci(rezPredavaci.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const posaljiPodatke = async (event) => {
    event.preventDefault();
    try {
      const rez = await axios.post(
        `${import.meta.env.VITE_API_URL}/radionice`,
        novaRadionica
      );
      setRadionice((stanje) => [...stanje, rez.data]);
      setNovaRadionica({
        ime: "",
        datum: 0,
        predavac: "",
        opis: "",
        tema: "",
        tezina: "",
        broj_prijava: 0,
      });
      setPrikazi(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const promjenaPodatka = (event) => {
    const { name, value } = event.target;
    setNovaRadionica({ ...novaRadionica, [name]: value });
  };

  return (
    <form
      onSubmit={posaljiPodatke}
      className="border border-gold-50 rounded-md text-black-62 p-8 "
    >
      <p className="text-2xl font-light mb-3">NOVA RADIONICA</p>
      <div className="flex max-[450px]:flex-col flex-row justify-center  gap-3">
        <div className=" flex flex-col gap-3">
          <InputField
            type={"text"}
            label={"Ime:"}
            name={"ime"}
            value={novaRadionica.ime}
            onChange={promjenaPodatka}
          />
          <InputField
            type={"date"}
            label={"Datum:"}
            name={"datum"}
            value={novaRadionica.datum}
            onChange={promjenaPodatka}
          />
          <label
            htmlFor="predavac"
            className="flex flex-col gap-1 items-start text-start"
          >
            <p>Predavac:</p>
            <select
              name="predavac"
              value={novaRadionica.predavac}
              onChange={promjenaPodatka}
              className="w-full border border-blue-47 rounded-md cursor-pointer"
            >
              <option value="" className="font-thin">
                Odaberi predavaca
              </option>
              {predavaci.map((predavac) => (
                <option key={predavac.id} value={predavac.ime}>
                  {predavac.ime}
                </option>
              ))}
            </select>
          </label>
          <label
            htmlFor="opis"
            className="flex flex-col gap-1 items-start text-start"
          >
            <p>Opis:</p>
            <textarea
              name="opis"
              value={novaRadionica.opis}
              onChange={promjenaPodatka}
              className="w-full border border-blue-47 rounded-md "
            ></textarea>
          </label>
        </div>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="tema"
            className="flex flex-col gap-1 items-start text-start"
          >
            <p>Tema:</p>
            <select
              name="tema"
              value={novaRadionica.tema}
              onChange={promjenaPodatka}
              className="w-full border border-blue-47 rounded-md cursor-pointer"
            >
              <option value="">Odaberi temu</option>
              {teme.map((tema) => (
                <option key={tema.id} value={tema.ime}>
                  {tema.ime}
                </option>
              ))}
            </select>
          </label>
          <label
            htmlFor="tezina"
            className="flex flex-col gap-1 items-start text-start"
          >
            <p>Tezina:</p>
            <select
              name="tezina"
              value={novaRadionica.tezina}
              onChange={promjenaPodatka}
              id=""
              className="w-full border border-blue-47 rounded-md cursor-pointer"
            >
              <option value="">Odaberi tezinu</option>
              {tezine.map((tezina) => (
                <option key={tezina.id} value={tezina.ime}>
                  {tezina.ime}
                </option>
              ))}
            </select>
          </label>
          <label
            htmlFor="broj_prijava"
            className="flex flex-col gap-1 items-start text-start"
          >
            <p>Broj prijava:</p>
            <input
              type="number"
              name="broj_prijava"
              value={novaRadionica.broj_prijava}
              onChange={promjenaPodatka}
              className="w-full border border-blue-47 rounded-md "
              disabled
            />
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="mt-3 border border-blue-46 bg-blue-46 hover:bg-blue-46/80 text-white-70 w-full h-[35px] rounded-md "
      >
        DODAJ
      </button>
    </form>
  );
}
