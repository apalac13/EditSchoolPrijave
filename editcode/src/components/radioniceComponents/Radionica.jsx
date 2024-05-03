import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./radionicaComponents/Modal";
import Uredi from "./radionicaComponents/Uredi";
import Prikazi from "./radionicaComponents/Prikazi";

function Radionica({ user, radionica, setRadionice }) {
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <div className="flex gap-3 border border-gold-50 rounded-md p-3 shadow">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfZcpvdnbhcRhQ_D-Gxk2yO_MEYCH6hGioKYRiM_rQjZJPez2kxbJ-ODzXYUFtU2uTh78&usqp=CAU"
        alt="slika"
        className=" w-52 h-52  "
      />
      <div className="w-[600px] flex flex-col justify-between ">
        {edit ? (
          <Uredi radionica={radionica} setRadionice={setRadionice} />
        ) : (
          <Prikazi radionica={radionica} />
        )}
        <div className="w-[300px] flex justify-between">
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
            className={`border border-blue-46 text-sm bg-white-70 hover:bg-blue-46/80 hover:text-white-70 text-blue-46 w-[100px] h-[35px] rounded-md ${
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
