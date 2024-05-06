import { useState, useEffect } from "react";
import axios from "axios";

function FormRadionica({ setRadionice }) {
  const [novaRadionica, setNovaRadionica] = useState({
    ime: "",
    datum: 0,
    predavac: "",
    opis: "",
    tema: "",
    tezina: "",
    broj_prijava: 0,
  });

  const [teme, setTemu] = useState([]);
  const [tezine, setTezine] = useState([]);
  const [predavaci, setPredavaci] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3003/teme"),
      axios.get("http://localhost:3003/tezine"),
      axios.get("http://localhost:3003/predavaci"),
    ])
      .then(([rezTeme, rezTezine, rezPredavaci]) => {
        setTemu(rezTeme.data);
        setTezine(rezTezine.data);
        setPredavaci(rezPredavaci.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const posaljiPodatke = async () => {
    try {
      await axios
        .post("http://localhost:3003/radionice", novaRadionica)
        .then((rez) => {
          setRadionice((stanje) => [...stanje, rez.data]);
        });
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
      <div className="flex  gap-3">
        <div className=" flex flex-col gap-3">
          <label htmlFor="" className="flex gap-1">
            <p className="font-light">Ime:</p>
            <input
              type="text"
              name="ime"
              value={novaRadionica.ime}
              onChange={promjenaPodatka}
              className="w-full border border-blue-47 rounded-md "
            />
          </label>
          <label htmlFor="" className="flex gap-1">
            <p className="font-light">Datum:</p>
            <input
              type="date"
              name="datum"
              value={novaRadionica.datum}
              onChange={promjenaPodatka}
              className="w-full border border-blue-47 rounded-md cursor-pointer"
            />
          </label>
          <label htmlFor="" className="flex gap-1 ">
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
          <label htmlFor="" className="flex gap-1">
            <p className=" font-light">Opis:</p>
            <textarea
              name="opis"
              value={novaRadionica.opis}
              onChange={promjenaPodatka}
              className="w-full border border-blue-47 rounded-md "
            ></textarea>
          </label>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">
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
          <label htmlFor="">
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
          <label htmlFor="" className="flex gap-1 ">
            <p className=" font-light">Broj prijava:</p>
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

export default FormRadionica;
