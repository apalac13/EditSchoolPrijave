import { useState, useEffect } from "react";
import axios from "axios";
import InputField from "../InputField";

export default function FormPredavac({ setPredavaci, setPrikazi }) {
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
      axios.get(`${import.meta.env.VITE_API_URL}/teme`),
      axios.get(`${import.meta.env.VITE_API_URL}/organizacije`),
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
      const rez = await axios.post(
        `${import.meta.env.VITE_API_URL}/predavaci`,
        noviPredavac
      );
      setPredavaci((stanje) => [...stanje, rez.data]);
      setNoviPredavac({
        ime: "",
        biografija: "",
        tema: "",
        organizacija: "",
      });
      setPrikazi(false);
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
        <InputField
          type={"text"}
          label={"Ime:"}
          name={"ime"}
          value={noviPredavac.ime}
          onChange={promjenaPodatka}
          required={true}
        />
        <label
          htmlFor="biografija"
          className="flex flex-col gap-1 items-start text-start"
        >
          <p>Biografija:</p>
          <textarea
            name="biografija"
            value={noviPredavac.biografija}
            onChange={promjenaPodatka}
            className="w-full border border-blue-47 rounded-md cursor-pointer p-1"
          ></textarea>
        </label>
        <label
          htmlFor="tema"
          className="flex flex-col gap-1 items-start text-start"
        >
          <p>Tema:</p>
          <select
            name="tema"
            value={noviPredavac.tema}
            onChange={promjenaPodatka}
            className="w-full border border-blue-47 rounded-md cursor-pointer p-1"
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
          htmlFor="organizacija"
          className="flex flex-col gap-1 items-start text-start"
        >
          <p>Organizacija:</p>
          <select
            name="organizacija"
            value={noviPredavac.organizacija}
            onChange={promjenaPodatka}
            className="w-full border border-blue-47 rounded-md cursor-pointer p-1"
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
