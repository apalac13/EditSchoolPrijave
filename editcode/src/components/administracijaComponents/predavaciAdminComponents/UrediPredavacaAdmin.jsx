import { useState, useEffect } from "react";
import axios from "axios";

function UrediPredavacaAdmin({ predavac, setPredavaci, edit, setEdit }) {
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
        type="text"
        name="biografija"
        value={editedData.biografija}
        onChange={promjenaPodatka}
      />
      <select
        name="organizacija"
        value={editedData.organizacija}
        onChange={promjenaPodatka}
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
      <button
        onClick={() => posaljiPodatke(predavac.id)}
        className="border border-gold-50 text-sm bg-white-70 hover:bg-gold-50/80 hover:text-white-70 text-gold-50 w-[60px] h-[30px] rounded-md"
      >
        SPREMI
      </button>
    </>
  );
}

export default UrediPredavacaAdmin;
