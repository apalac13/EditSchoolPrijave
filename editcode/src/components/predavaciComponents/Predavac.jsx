import { useState } from "react";
import { Link } from "react-router-dom";
import PrikazPredavac from "./predavacComponents/PrikazPredavac";
import UrediPredavac from "./predavacComponents/UrediPredavac";

function Predavac({ user, predavac, setPredavaci }) {
  const [edit, setEdit] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center border border-black-60 rounded-md p-4">
      <div className="flex flex-col gap-2">
        <img
          src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
          alt="slika predavaca"
          className="w-32 h-32"
        />
      </div>
      {edit ? (
        <UrediPredavac predavac={predavac} setPredavaci={setPredavaci} />
      ) : (
        <PrikazPredavac predavac={predavac} />
      )}
      <div className="flex flex-col">
        <Link to={`/predavaci/${predavac.ime}`}>
          <button className="border border-black-60 ">
            PREGLEDAJ RADIONICE
          </button>
        </Link>
        <button
          onClick={() => setEdit(!edit)}
          className={`border border-black-60 ${user ? `visible` : `hidden`}`}
        >
          UREDI
        </button>
      </div>
    </div>
  );
}

export default Predavac;
