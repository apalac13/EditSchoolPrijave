import { useState, useEffect } from "react";
import axios from "axios";

function RadioniceAdmin(props) {
  const [radionice, setRadionice] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3003/radionice")
      .then((rez) => setRadionice(rez.data))
      .catch((error) => console.log("Error", error.message));
  }, []);

  return (
    <div className="flex flex-col gap-1">
      {radionice.map((radionica) => (
        <div
          key={radionica.id}
          className="grid grid-cols-4 justify-between border border-gold-50 p-2 rounded-md text-black-62"
        >
          <p>{radionica.ime}</p>
          <p>Broj prijava: {radionica.broj_prijava}</p>
          <p>Datum: {radionica.datum}</p>
          <div className="flex gap-4 ml-16">
            <button className="border border-blue-46 bg-blue-46 hover:bg-blue-46/80 text-white-70 w-[60px] h-[30px] rounded-md text-sm">
              UREDI
            </button>
            <button className="border border-gold-50 text-sm bg-white-70 hover:bg-gold-50/80 hover:text-white-70 text-gold-50 w-[60px] h-[30px] rounded-md">
              IZBRISI
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
export default RadioniceAdmin;
