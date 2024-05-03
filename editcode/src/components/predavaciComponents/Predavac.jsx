import { useState } from "react";
import { Link } from "react-router-dom";
import PrikazPredavac from "./predavacComponents/PrikazPredavac";
import UrediPredavac from "./predavacComponents/UrediPredavac";

function Predavac({ user, predavac, setPredavaci }) {
  const [edit, setEdit] = useState(false);

  return (
    <div className=" flex flex-col gap-2 justify-center items-center border border-gold-50 rounded-md p-4 shadow">
      <div className="flex flex-col gap-2">
        <img
          src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
          alt="slika predavaca"
          className="w-32 h-32"
        />
      </div>
      <div className="w-full h-[250px] flex flex-col justify-between">
        {edit ? (
          <UrediPredavac predavac={predavac} setPredavaci={setPredavaci} />
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
            UREDI
          </button>
        </div>
      </div>
    </div>
  );
}

export default Predavac;
