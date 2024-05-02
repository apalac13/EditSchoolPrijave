import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Modal({ radionica, setRadionice, modal, setModal }) {
  const [success, setSuccess] = useState(false);

  const prijavaRadionice = async () => {
    try {
      const updatedRadionica = {
        broj_prijava: radionica.broj_prijava + 1,
      };

      await axios
        .patch(
          `http://localhost:3003/radionice/${radionica.id}`,
          updatedRadionica
        )
        .then((rez) => {
          setRadionice((stanje) => {
            return stanje.map((item) =>
              item.id === radionica.id
                ? { ...item, broj_prijava: updatedRadionica.broj_prijava }
                : item
            );
          });
        });
      setSuccess(true);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  return (
    <div className=" w-[500px] h-[500px] fixed z-10 top-[20%] left-[35%] bg-white-70 border border-black-60/80 rounded-md  ">
      {!success ? (
        <div className="w-full flex flex-col gap-14 ">
          <div className="w-full flex flex-col p-1 ">
            <div onClick={() => setModal(!modal)} className="w-3 self-end mr-1">
              X
            </div>
            <p className="">Prijavi se na {radionica.ime}</p>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              prijavaRadionice();
            }}
            className="flex flex-col gap-4 px-14 "
          >
            <input
              type="text"
              name="ime"
              placeholder="puno ime"
              className="border"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="email"
              className="border"
              required
            />
            <textarea
              name="opis"
              placeholder="razlog prijave"
              className="border"
              required
            ></textarea>
            <button type="submit" className="border">
              PRIJAVI SE
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col">
          <div className="w-full h-full flex flex-col p-1 ">
            <div onClick={() => setModal(!modal)} className="w-3 self-end mr-1">
              X
            </div>
            <div className="flex flex-col h-full gap-4 items-center justify-center">
              <div className="flex flex-col gap-1">
                <p className="text-2xl text-black-62">Hvala na prijavi</p>
                <p className="text-black-61">
                  Uskoro ces na mail dobiti vise informacija o radionici:{" "}
                  {radionica.ime}
                </p>
              </div>
              <button
                onClick={() => setModal(!modal)}
                className="border border-blue-46 bg-blue-46 hover:bg-blue-46/80 text-white-70 w-[200px] h-[40px] rounded-md "
              >
                NATRAG NA RADIONICE
              </button>{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
