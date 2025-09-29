import { useState } from "react";
import axios from "axios";
import InputField from "../../InputField";

export default function UrediPredavac({ predavac, setPredavaci, setEdit }) {
  const [editedData, setEditedData] = useState({
    id: predavac.id,
    ime: predavac.ime,
    biografija: predavac.biografija,
    organizacija: predavac.organizacija,
  });
  const organizacije = ["Locastic", "Profico", "Digitalna dalmacija"];

  const promjenaPodatka = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const posaljiPodatke = async (event) => {
    event.preventDefault();
    try {
      const rez = await axios.put(
        `http://localhost:3003/predavaci/${predavac.id}`,
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
          {organizacije.map((organizacija, index) => (
            <option key={index} value={organizacija}>
              {organizacija}
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
