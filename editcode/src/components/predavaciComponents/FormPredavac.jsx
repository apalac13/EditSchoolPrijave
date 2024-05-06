import { useState, useEffect } from "react";
import axios from "axios";

function FormPredavac({ setPredavaci }) {
  const [noviPredavac, setNoviPredavac] = useState({
    ime: "",
    biografija: "",
    tema: "",
    organizacija: "",
  });

  const [teme, setTemu] = useState([]);
  const [organizacije, setOrganizaciju] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3003/teme"),
      axios.get("http://localhost:3003/organizacije"),
    ])
      .then(([rezTeme, rezOrganizacije]) => {
        setTemu(rezTeme.data);
        setOrganizaciju(rezOrganizacije.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const posaljiPodatke = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post("http://localhost:3003/predavaci", noviPredavac)
        .then((rez) => {
          setPredavaci((stanje) => [...stanje, rez.data]);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const promjenaPodatka = (event) => {
    const { name, value } = event.target;
    setNoviPredavac({ ...noviPredavac, [name]: value });
  };

  return (
    <form
      onSubmit={posaljiPodatke}
      className="border border-gold-50 rounded-md text-black-62 p-8 "
    >
      <p className="text-2xl font-light mb-3">NOVI PREDAVAČ</p>
      <div className=" flex flex-col gap-3">
        <label htmlFor="" className="flex gap-1">
          <p className="font-light">Ime:</p>
          <input
            type="text"
            name="ime"
            value={noviPredavac.ime}
            onChange={promjenaPodatka}
            className="w-full border border-blue-47 rounded-md "
          />
        </label>
        <label htmlFor="" className="flex gap-1">
          <p className="font-light">Biografija:</p>
          <textarea
            name="biografija"
            value={noviPredavac.biografija}
            onChange={promjenaPodatka}
            className="w-full border border-blue-47 rounded-md "
          ></textarea>
        </label>
        <label htmlFor="" className="flex gap-1">
          <select
            name="tema"
            value={noviPredavac.tema}
            onChange={promjenaPodatka}
            className="w-full border border-blue-47 rounded-md cursor-pointer"
          >
            <option value="" className="font-light">
              Odaberi temu
            </option>
            {teme.map((tema) => (
              <option key={tema.id} value={tema.ime}>
                {tema.ime}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="" className="flex gap-1">
          <select
            name="organizacija"
            value={noviPredavac.organizacija}
            onChange={promjenaPodatka}
            id=""
            className="w-full border border-blue-47 rounded-md cursor-pointer"
          >
            <option value="" className="font-light">
              Odaberi organizaciju
            </option>
            {organizacije.map((organizacija) => (
              <option key={organizacija.id} value={organizacija.ime}>
                {organizacija.ime}
              </option>
            ))}
          </select>
        </label>
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

export default FormPredavac;
