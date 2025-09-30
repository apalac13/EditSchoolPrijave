import { useState } from "react";
import axios from "axios";
import InputField from "../../InputField";

export default function UrediOrganizacijuAdmin({
  organizacija,
  setOrganizacije,
  setEdit,
}) {
  const [editedData, setEditedData] = useState({
    id: organizacija.id,
    ime: organizacija.ime,
    opis: organizacija.opis,
    radionice: organizacija.radionice,
  });

  const promjenaPodatka = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const posaljiPodatke = async (id) => {
    try {
      await axios
        .patch(`${import.meta.env.VITE_API_URL}/organizacije/${id}`, {
          id: editedData.id,
          ime: editedData.ime,
          opis: editedData.opis,
          radionice: editedData.radionice,
        })
        .then((rez) => {
          setOrganizacije((stanje) => {
            return stanje.map((item) =>
              item.id === organizacija.id ? { ...item, editedData } : item
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
        label={"Ime radionice:"}
        name={"ime"}
        value={editedData.ime}
        onChange={promjenaPodatka}
      />
      <InputField
        type={"text"}
        label={"Opis:"}
        name={"opis"}
        value={editedData.opis}
        onChange={promjenaPodatka}
      />
      <InputField
        type={"text"}
        label={"Radionice:"}
        name={"radionice"}
        value={editedData.radionice}
        onChange={promjenaPodatka}
      />

      <div className="flex gap-2">
        <button
          onClick={() => posaljiPodatke(organizacija.id)}
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
