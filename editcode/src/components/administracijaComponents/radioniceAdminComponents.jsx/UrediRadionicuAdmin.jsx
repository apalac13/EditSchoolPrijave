import { useState } from "react";
import axios from "axios";

function UrediRadionicuAdmin({ radionica, setRadionice, edit, setEdit }) {
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
      await axios
        .patch(`http://localhost:3003/radionice/${id}`, {
          ime: editedData.ime,
          broj_prijava: Number(editedData.broj_prijava),
          datum: editedData.datum,
        })
        .then((rez) => {
          setRadionice((stanje) => {
            return stanje.map((item) =>
              item.id === radionica.id ? { ...item, editedData } : item
            );
          });
        });
      setEdit(!edit);
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  return (
    <>
      <input
        type="text"
        name="ime"
        value={editedData.ime}
        onChange={promjenaPodatka}
      />{" "}
      <input
        type="number"
        name="broj_prijava"
        value={editedData.broj_prijava}
        onChange={promjenaPodatka}
      />{" "}
      <input
        type="date"
        name="datum"
        value={editedData.datum}
        onChange={promjenaPodatka}
      />
      <button
        onClick={() => posaljiPodatke(radionica.id)}
        className="border border-gold-50 text-sm bg-white-70 hover:bg-gold-50/80 hover:text-white-70 text-gold-50 w-[60px] h-[30px] rounded-md"
      >
        SPREMI
      </button>
    </>
  );
}

export default UrediRadionicuAdmin;
