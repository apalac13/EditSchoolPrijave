import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./radionicaComponents/Modal";
import Uredi from "./radionicaComponents/Uredi";
import Prikazi from "./radionicaComponents/Prikazi";

function Radionica({ user, radionica, setRadionice }) {
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <div className="flex">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfZcpvdnbhcRhQ_D-Gxk2yO_MEYCH6hGioKYRiM_rQjZJPez2kxbJ-ODzXYUFtU2uTh78&usqp=CAU"
        alt="slika"
      />
      <div>
        {edit ? (
          <Uredi radionica={radionica} setRadionice={setRadionice} />
        ) : (
          <Prikazi radionica={radionica} />
        )}
        <div className="flex justify-between">
          <button onClick={() => setModal(!modal)}>PRIJAVI SE</button>
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
            className={`${user ? `visible` : `hidden`}`}
          >
            UREDI
          </button>
        </div>
      </div>
    </div>
  );
}

export default Radionica;
