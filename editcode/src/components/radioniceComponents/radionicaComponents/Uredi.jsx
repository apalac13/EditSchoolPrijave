import { useState, useEffect } from "react";
import axios from "axios";
import InputField from "../../InputField";

export default function Uredi({ radionica, setRadionice, setEdit }) {
  const [editedData, setEditedData] = useState({
    id: radionica.id,
    ime: radionica.ime,
    datum: radionica.datum,
    predavac: radionica.predavac,
    opis: radionica.opis,
    tema: radionica.tema,
    tezina: radionica.tezina,
    broj_prijava: radionica.broj_prijava,
  });
  const [predavaci, setPredavaci] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3003/predavaci")
      .then((rez) => setPredavaci(rez.data))
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
        `http://localhost:3003/radionice/${radionica.id}`,
        editedData
      );
      setRadionice((stanje) =>
        stanje.map((r) => (r.id === radionica.id ? rez.data : r))
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
      <label htmlFor="opis" className="flex flex-col gap-1 text-start">
        <p>Opis:</p>
        <textarea
          name="opis"
          value={editedData.opis}
          onChange={promjenaPodatka}
          rows="4"
          className="w-full border border-blue-47 rounded-md  p-1"
        ></textarea>
      </label>
      <label htmlFor="predavac" className="flex flex-col gap-1 text-start">
        <p>Predavaci:</p>
        <select
          name="predavac"
          value={editedData.predavac}
          onChange={promjenaPodatka}
          className="w-full border border-blue-47 rounded-md cursor-pointer p-1"
        >
          {predavaci.map((predavac) => (
            <option key={predavac.id} value={predavac.ime}>
              {predavac.ime}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="border border-blue-46 bg-blue-46 hover:bg-blue-46/80 text-white-70 w-[100px] h-[35px] rounded-md text-sm "
      >
        SPREMI
      </button>
    </form>
  );
}
