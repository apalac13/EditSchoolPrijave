import { useState, useEffect } from "react";
import axios from "axios";
import InputField from "../../InputField";

export default function UrediPredavacaAdmin({
  predavac,
  setPredavaci,
  setEdit,
}) {
  const [editedData, setEditedData] = useState({
    ime: predavac.ime,
    biografija: predavac.biografija,
    organizacija: predavac.organizacija,
  });
  const [organizacije, setOrganizacije] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3003/organizacije")
      .then((rez) => setOrganizacije(rez.data))
      .catch((error) => console.log("Error", error.message));
  }, []);

  const promjenaPodatka = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const posaljiPodatke = async (id) => {
    try {
      await axios
        .patch(`http://localhost:3003/predavaci/${id}`, {
          ime: editedData.ime,
          biografija: editedData.biografija,
          organizacija: editedData.organizacija,
        })
        .then((rez) => {
          setPredavaci((stanje) => {
            return stanje.map((item) =>
              item.id === predavac.id ? { ...item, editedData } : item
            );
          });
        });
      setEdit(false);
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  return (
    <div className="w-full flex flex-col items-start justify-center gap-2">
      <InputField
        type={"text"}
        label={"Ime:"}
        name={"ime"}
        value={editedData.ime}
        onChange={promjenaPodatka}
      />
      <InputField
        type={"text"}
        label={"Biografija:"}
        name={"biografija"}
        value={editedData.biografija}
        onChange={promjenaPodatka}
      />

      <label
        htmlFor="ogranizacija"
        className="flex flex-col gap-1 items-start text-start"
      >
        <p>Organizacija:</p>
        <select
          name="organizacija"
          value={editedData.organizacija}
          onChange={promjenaPodatka}
          className="w-full border border-blue-47 rounded-md cursor-pointer p-1"
        >
          <option value={editedData.organizacija}>
            {editedData.organizacija}
          </option>
          {organizacije.map((organizacija) => (
            <option key={organizacija.id} value={organizacija.ime}>
              {organizacija.ime}
            </option>
          ))}
        </select>
      </label>
      <div className="flex gap-2">
        <button
          onClick={() => posaljiPodatke(predavac.id)}
          className="border border-gold-50 text-sm bg-white-70 hover:bg-gold-50/80 hover:text-white-70 text-gold-50 w-[100px] h-[30px] rounded-md"
        >
          SPREMI
        </button>
        <button
          onClick={() => setEdit(false)}
          className="border border-blue-46 bg-blue-46 hover:bg-blue-46/80 text-white-70 w-[100px] h-[30px] rounded-md text-sm"
        >
          ODUSTANI
        </button>
      </div>
    </div>
  );
}
