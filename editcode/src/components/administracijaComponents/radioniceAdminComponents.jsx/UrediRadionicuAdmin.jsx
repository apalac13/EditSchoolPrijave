import { useState } from "react";
import axios from "axios";
import InputField from "../../InputField";

export default function UrediRadionicuAdmin({
  radionica,
  setRadionice,
  setEdit,
}) {
  const [editedData, setEditedData] = useState({
    ime: radionica.ime,
    broj_prijava: radionica.broj_prijava,
    datum: radionica.datum,
  });

  const promjenaPodatka = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const posaljiPodatke = async (id) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:3003/radionice/${id}`,
        {
          ime: editedData.ime,
          broj_prijava: Number(editedData.broj_prijava),
          datum: editedData.datum,
        }
      );

      setRadionice((stanje) =>
        stanje.map((r) => (r.id === id ? { ...r, ...data } : r))
      );

      setEdit(false);
    } catch (error) {
      console.error("Error:", error.message);
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
        type={"number"}
        label={"Broj prijava:"}
        name={"broj_prijava"}
        value={editedData.broj_prijava}
        onChange={promjenaPodatka}
      />
      <InputField
        type={"date"}
        label={"Datum:"}
        name={"datum"}
        value={editedData.datum}
        onChange={promjenaPodatka}
      />
      <div className="flex gap-2">
        <button
          onClick={() => posaljiPodatke(radionica.id)}
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
