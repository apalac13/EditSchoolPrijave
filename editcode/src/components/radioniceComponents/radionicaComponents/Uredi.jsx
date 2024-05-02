import { useState, useEffect } from "react";
import axios from "axios";

function Uredi({ radionica, setRadionice }) {
  const [editedData, setEditedData] = useState({
    ime: radionica.ime,
    datum: radionica.datum,
    predavac: radionica.predavac,
    opis: radionica.opis,
    tema: radionica.tema,
    tezina: radionica.tezina,
    broj_prijava: radionica.broj_prijava,
  });

  const promjenaPodatka = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const posaljiPodatke = async (event) => {
    event.preventDefault();
    try {
      await axios
        .put(`http://localhost:3003/radionice/${radionica.id}`, editedData)
        .then((rez) => {
          setRadionice((stanje) => [...stanje, rez.data]);
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
        <p>Opis:</p>
        <textarea
          name="opis"
          value={editedData.opis}
          onChange={promjenaPodatka}
          id=""
          cols="30"
          rows="5"
          className="border"
        ></textarea>
      </label>
      <label htmlFor="" className="flex">
        <p>Predavaci:</p>
        <select name="predavac" id="">
          <option value="Luka Smolcic">Luka Smolcic</option>
          <option value="Ana Anic">Ana Anic</option>
          <option value="Ante Antic">Ante Antic</option>
        </select>
      </label>
      <label htmlFor="" className="flex">
        <p>Partneri:</p>
        <select name="organizacije" id="">
          <option value="Luka Smolcic">Luka Smolcic</option>
          <option value="Luka Smolcic">Ana Palac</option>
          <option value="Luka Smolcic">Ante Antic</option>
        </select>
      </label>
      <button type="submit">spremi</button>
    </form>
  );
}
export default Uredi;
