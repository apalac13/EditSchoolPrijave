import { useState } from "react";
import axios from "axios";

function UrediOrganizacijuAdmin({
  organizacija,
  setOrganizacije,
  edit,
  setEdit,
}) {
  const [editedData, setEditedData] = useState({
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
        .patch(`http://localhost:3003/organizacije/${id}`, {
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
        name="opis"
        value={editedData.opis}
        onChange={promjenaPodatka}
      />{" "}
      <input
        type="date"
        name="radionice"
        value={editedData.radionice}
        onChange={promjenaPodatka}
      />
      <button
        onClick={() => posaljiPodatke(organizacija.id)}
        className="border border-gold-50 text-sm bg-white-70 hover:bg-gold-50/80 hover:text-white-70 text-gold-50 w-[60px] h-[30px] rounded-md"
      >
        SPREMI
      </button>
    </>
  );
}

export default UrediOrganizacijuAdmin;
