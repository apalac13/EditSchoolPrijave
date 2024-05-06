import { useState } from "react";
import axios from "axios";

function FormOrganizacija({ setOrganizacije }) {
  const [novaOrganizacija, setNovuOrganizaciju] = useState({
    ime: "",
    opis: "",
    radionice: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovuOrganizaciju((prevOrg) => ({
      ...prevOrg,
      [name]: value,
    }));
  };

  const handleRadionicaChange = (e, index) => {
    const { value } = e.target;
    setNovuOrganizaciju((prevOrg) => {
      const updatedRadionice = [...prevOrg.radionice];
      updatedRadionice[index] = value;
      return {
        ...prevOrg,
        radionice: updatedRadionice,
      };
    });
  };

  const addRadionicaInput = () => {
    setNovuOrganizaciju((prevOrg) => ({
      ...prevOrg,
      radionice: [...prevOrg.radionice, ""],
    }));
  };

  const removeRadionicaInput = (index) => {
    setNovuOrganizaciju((prevOrg) => {
      const updatedRadionice = [...prevOrg.radionice];
      updatedRadionice.splice(index, 1);
      return {
        ...prevOrg,
        radionice: updatedRadionice,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3003/organizacije", novaOrganizacija);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <div className="border border-gold-50 rounded-md text-black-62 p-8 ">
      <p className="text-2xl font-light mb-3">NOVA ORGANIZACIJA</p>
      <form onSubmit={handleSubmit} className="flex flex-col  gap-3">
        <label className="flex gap-1">
          <p className="font-light">Ime:</p>
          <input
            type="text"
            name="ime"
            value={novaOrganizacija.ime}
            onChange={handleChange}
            className="w-full border border-blue-47 rounded-md "
          />
        </label>
        <label className="flex gap-1">
          <p className="font-light">Opis:</p>
          <textarea
            name="opis"
            value={novaOrganizacija.opis}
            onChange={handleChange}
            className="w-full border border-blue-47 rounded-md "
          />
        </label>
        <label className="flex gap-1">
          <p className="font-light">Radionice:</p>
          <div className="flex flex-col">
            {novaOrganizacija.radionice.map((radionica, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={radionica}
                  onChange={(e) => handleRadionicaChange(e, index)}
                  className="w-full border border-blue-47 rounded-md "
                />
                <button
                  type="button"
                  onClick={() => removeRadionicaInput(index)}
                  className="mt-3 border border-red-80 bg-red-80 hover:bg-red-80/80 text-white-70 w-full h-[35px] rounded-md p-1 "
                >
                  UKLONI
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addRadionicaInput}
              className="mt-3 border border-blue-46 bg-blue-46 hover:bg-blue-46/80 text-white-70 w-full h-[35px] rounded-md p-1 "
            >
              DODAJ
            </button>
          </div>
        </label>

        <button
          type="submit"
          className="mt-3 border border-blue-46 bg-blue-46 hover:bg-blue-46/80 text-white-70 w-full h-[35px] rounded-md "
        >
          DODAJ
        </button>
      </form>
    </div>
  );
}

export default FormOrganizacija;
