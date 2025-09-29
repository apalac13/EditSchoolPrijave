import { useState } from "react";
import Modal from "./radionicaComponents/Modal";
import Uredi from "./radionicaComponents/Uredi";
import Prikazi from "./radionicaComponents/Prikazi";
import editlogo from "/slike/editlogo.png";

export default function Radionica({ user, radionica, setRadionice }) {
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <div className="flex max-[500px]:flex-col gap-6 border border-gold-50 rounded-md p-3 shadow">
      <img
        src={editlogo}
        alt="slika"
        className=" w-36 max-[500px]:w-20 h-32 max-[500px]:h-20 rounded-md "
      />
      <div className="md:w-[600px] w-full flex flex-col gap-10 justify-between ">
        {edit ? (
          <Uredi
            radionica={radionica}
            setRadionice={setRadionice}
            setEdit={setEdit}
          />
        ) : (
          <Prikazi radionica={radionica} />
        )}
        <div className="md:w-[300px] w-full h-full flex max-[400px]:flex-col max-[400px]:gap-2 flex-row justify-between">
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
            {edit ? <p>ODUSTANI</p> : <p>UREDI</p>}
          </button>
        </div>
      </div>
    </div>
  );
}
