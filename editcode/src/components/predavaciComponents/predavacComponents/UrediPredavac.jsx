import { useState, useEffect } from "react";
import axios from "axios";

function UrediPredavac({ predavac, setPredavaci }) {
  const [editedData, setEditedData] = useState({
    ime: predavac.ime,
    biografija: predavac.biografija,
    organizacija: predavac.organizacija,
  });

  const promjenaPodatka = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const posaljiPodatke = async (event) => {
    event.preventDefault();
    try {
      await axios
        .put(`http://localhost:3003/predavaci/${predavac.id}`, editedData)
        .then((rez) => {
          setPredavaci((stanje) => [...stanje, rez.data]);
        });
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <form onSubmit={posaljiPodatke}>
      <input
        type="text"
        name="ime"
        value={editedData.ime}
        onChange={promjenaPodatka}
        className="border"
        placeholder="Ime radionice"
      />
      <label htmlFor="" className="flex">
        <p>Biografija:</p>
        <textarea
          name="biografija"
          value={editedData.biografija}
          onChange={promjenaPodatka}
          id=""
          cols="30"
          rows="5"
          className="border"
        ></textarea>
      </label>
      <label htmlFor="" className="flex">
        <p>Organizacija:</p>
        <select
          name="organizacija"
          value={editedData.organizacija}
          onChange={promjenaPodatka}
          id=""
        >
          <option value="Locastic">Locastic</option>
          <option value="Profico">Profico</option>
          <option value="Digitalna dalmacija">Digitalna dalmacija</option>
        </select>
      </label>

      <button type="submit">Spremi</button>
    </form>
  );
}
export default UrediPredavac;
