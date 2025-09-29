import { useState } from "react";
import { Link } from "react-router-dom";
import PrikazPredavac from "./predavacComponents/PrikazPredavac";
import UrediPredavac from "./predavacComponents/UrediPredavac";

export default function Predavac({ user, predavac, setPredavaci }) {
  const [edit, setEdit] = useState(false);

  return (
    <div className=" flex flex-col gap-2 justify-center items-center border border-gold-50 rounded-md p-4 shadow ">
      <div className="flex flex-col">
        <img
          src="https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
          alt="slika predavaca"
          className="w-32 h-32 "
        />
      </div>
      <div className="w-full h-full flex flex-col gap-2 justify-between">
        {edit ? (
          <UrediPredavac
            predavac={predavac}
            setPredavaci={setPredavaci}
            setEdit={setEdit}
          />
        ) : (
          <PrikazPredavac predavac={predavac} />
        )}
        <div className="flex flex-col gap-2">
          <Link to={`/predavaci/${predavac.ime}`}>
            <button className="border border-blue-46 bg-blue-46 hover:bg-blue-46/80 text-white-70 w-full h-[35px] rounded-md text-sm ">
              PREGLEDAJ RADIONICE
            </button>
          </Link>
          <button
            onClick={() => setEdit(!edit)}
            className={`border border-gold-50 text-sm bg-white-70 hover:bg-gold-50/80 hover:text-white-70 text-gold-50 w-full h-[35px] rounded-md ${
              user ? `visible` : `hidden`
            }`}
          >
            {edit ? <p>ODUSTANI</p> : <p>UREDI</p>}
          </button>
        </div>
      </div>
    </div>
  );
}
