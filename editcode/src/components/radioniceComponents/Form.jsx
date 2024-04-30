import { useState, useEffect } from "react";
import axios from "axios";

function Form( { setRadionice }) {
  const [novaRadionica, setNovaRadionica] = useState({
    ime: "",
    datum: 0,
    predavac: "",
    opis: "",
    broj_prijava: 0,
  });

  const posaljiPodatke = async () => {
    try {
      await axios
        .post("http://localhost:3003/radionice", novaRadionica)
        .then((rez) => {
          setRadionice((stanje) => [...stanje, rez.data]);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const promjenaPodatka = (event) => {
    const { name, value } = event.target;
    setNovaRadionica({ ...novaRadionica, [name]: value });
  };

  return (
    <form onSubmit={posaljiPodatke}>
      <p>Forma za novu radionicu</p>
      <div>
        <label htmlFor="">
          <p>Ime:</p>
          <input
            type="text"
            name="ime"
            value={novaRadionica.ime}
            onChange={promjenaPodatka}
            className="border"
          />
        </label>
        <label htmlFor="">
          <p>Datum</p>
          <input
            type="date"
            name="datum"
            value={novaRadionica.datum}
            onChange={promjenaPodatka}
            className="border"
          />
        </label>
        <label htmlFor="">
          <p>Predavač:</p>
          <input
            type="text"
            name="predavac"
            value={novaRadionica.predavac}
            onChange={promjenaPodatka}
            className="border"
          />
        </label>
        <label htmlFor="">
          <p>Opis:</p>
          <textarea
            name="opis"
            value={novaRadionica.opis}
            onChange={promjenaPodatka}
            className="border"
          ></textarea>
        </label>
        <label htmlFor="">
          <p>Broj prijava:</p>
          <input
            type="number"
            name="broj_prijava"
            value={novaRadionica.broj_prijava}
            onChange={promjenaPodatka}
            className="border"
          />
        </label>
      </div>
      <button type="submit" className="border">
        DODAJ
      </button>
    </form>
  );
}

export default Form;
