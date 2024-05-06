import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./radionicaComponents/Modal";
import Uredi from "./radionicaComponents/Uredi";
import Prikazi from "./radionicaComponents/Prikazi";
import editlogo from "/slike/editlogo.png";

function Radionica({ user, radionica, setRadionice }) {
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <div className="flex gap-6 border border-gold-50 rounded-md p-3 shadow">
      <img src={editlogo} alt="slika" className=" w-36 h-32 rounded-md " />
      <div className="w-[600px] flex flex-col gap-10 justify-between ">
        {edit ? (
          <Uredi radionica={radionica} setRadionice={setRadionice} />
        ) : (
          <Prikazi radionica={radionica} />
        )}
        <div className="w-[300px] h-full flex justify-between">
          <button
            onClick={() => setModal(!modal)}
            className="border border-blue-46 bg-blue-46 hover:bg-blue-46/80 text-white-70 w-[100px] h-[35px] rounded-md text-sm "
          >
            PRIJAVI SE
          </button>
          {modal && (
            <Modal
              radionica={radionica}
              setRadionice={setRadionice}
              modal={modal}
              setModal={setModal}
            />
          )}
          <button
            onClick={() => setEdit(!edit)}
            className={`border border-gold-50 text-sm bg-white-70 hover:bg-gold-50/80 hover:text-white-70 text-gold-50 w-[100px] h-[35px] rounded-md ${
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

export default Radionica;
