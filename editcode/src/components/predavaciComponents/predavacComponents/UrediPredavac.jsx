import { useState, useEffect } from "react";
import axios from "axios";
import InputField from "../../InputField";

export default function UrediPredavac({ predavac, setPredavaci, setEdit }) {
  const [editedData, setEditedData] = useState({
    id: predavac.id,
    ime: predavac.ime,
    tema: predavac.tema,
    biografija: predavac.biografija,
    organizacija: predavac.organizacija,
  });
  const [teme, setTeme] = useState([]);
  const [organizacije, setOrganizacije] = useState([]);
  useEffect(() => {
    Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/teme`),
      axios.get(`${import.meta.env.VITE_API_URL}/organizacije`),
    ])
      .then(([rezTeme, rezOrganizacije]) => {
        setTeme(rezTeme.data);
        setOrganizacije(rezOrganizacije.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const promjenaPodatka = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const posaljiPodatke = async (event) => {
    event.preventDefault();
    try {
      const rez = await axios.put(
        `${import.meta.env.VITE_API_URL}/predavaci/${predavac.id}`,
        editedData
      );
      setPredavaci((stanje) =>
        stanje.map((r) => (r.id === predavac.id ? rez.data : r))
      );
      setEdit(false);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <form onSubmit={posaljiPodatke} className="flex flex-col gap-2">
      <InputField
        type={"text"}
        label={"Ime radionice:"}
        name={"ime"}
        value={editedData.ime}
        onChange={promjenaPodatka}
      />
      <label
        htmlFor="biografija"
        className="flex flex-col gap-1 items-start text-start"
      >
        <p>Biografija:</p>
        <textarea
          name="biografija"
          value={editedData.biografija}
          onChange={promjenaPodatka}
          id=""
          rows="5"
          className="w-full border border-blue-47 rounded-md p-1"
        ></textarea>
      </label>
      <label
        htmlFor="organizacija"
        className="flex flex-col gap-1 items-start text-start"
      >
        <p>Organizacija:</p>
        <select
          name="organizacija"
          value={editedData.organizacija}
          onChange={promjenaPodatka}
          className="w-full border border-blue-47 rounded-md cursor-pointer p-1"
        >
          {organizacije.map((organizacija) => (
            <option key={organizacija.id} value={organizacija.ime}>
              {organizacija.ime}
            </option>
          ))}
        </select>
      </label>
      <label
        htmlFor="tema"
        className="flex flex-col gap-1 items-start text-start"
      >
        <p>Tema:</p>
        <select
          name="tema"
          value={editedData.tema}
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
      <button
        type="submit"
        className="border border-blue-46 bg-blue-46 hover:bg-blue-46/80 text-white-70 w-[150px] h-[35px] rounded-md text-sm "
      >
        SPREMI PROMJENE
      </button>
    </form>
  );
}
