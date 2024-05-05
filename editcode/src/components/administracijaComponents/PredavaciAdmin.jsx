import { useState, useEffect } from "react";
import axios from "axios";

function PredavaciAdmin(props) {
  const [predavaci, setPredavaci] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3003/predavaci")
      .then((rez) => setPredavaci(rez.data))
      .catch((error) => console.log("Error", error.message));
  }, []);
  return (
    <div className="flex flex-col gap-1">
      {predavaci.map((predavac) => (
        <div
          key={predavac.id}
          className="grid grid-cols-4 justify-between border border-gold-50 p-2 rounded-md text-black-62 shadow"
        >
          <p>{predavac.ime}</p>
          <p>{predavac.biografija}</p>
          <p>{predavac.organizacija}</p>
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
export default PredavaciAdmin;
