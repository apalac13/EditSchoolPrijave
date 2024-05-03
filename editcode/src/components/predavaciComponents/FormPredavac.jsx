import { useState, useEffect } from "react";
import axios from "axios";

function FormPredavac({ setPredavaci }) {
  const [noviPredavac, setNoviPredavac] = useState({
    ime: "",
    biografija: "",
    organizacija: "",
  });

  const [teme, setTemu] = useState([]);
  const [organizacije, setOrganizaciju] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3003/teme"),
      axios.get("http://localhost:3003/organizacije"),
    ])
      .then(([rezTeme, rezOrganizacije]) => {
        setTemu(rezTeme.data);
        setOrganizaciju(rezOrganizacije.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const posaljiPodatke = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post("http://localhost:3003/predavaci", noviPredavac)
        .then((rez) => {
          setPredavaci((stanje) => [...stanje, rez.data]);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const promjenaPodatka = (event) => {
    const { name, value } = event.target;
    setNoviPredavac({ ...noviPredavac, [name]: value });
  };

  return (
    <form onSubmit={posaljiPodatke}>
      <p>Forma za novog predavaca</p>
      <div>
        <label htmlFor="">
          <p>Ime:</p>
          <input
            type="text"
            name="ime"
            value={noviPredavac.ime}
            onChange={promjenaPodatka}
            className="border"
          />
        </label>
        <label htmlFor="">
          <p>Biografija:</p>
          <textarea
            name="biografija"
            value={noviPredavac.biografija}
            onChange={promjenaPodatka}
            className="border"
          ></textarea>
        </label>
        <label htmlFor="">
          <select
            name="organizacija"
            value={noviPredavac.organizacija}
            onChange={promjenaPodatka}
            id=""
            className="border"
          >
            <option value="">Odaberi organizaciju</option>
            {organizacije.map((organizacija) => (
              <option key={organizacija.id} value={organizacija.ime}>
                {organizacija.ime}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit" className="border">
        DODAJ
      </button>
    </form>
  );
}

export default FormPredavac;
