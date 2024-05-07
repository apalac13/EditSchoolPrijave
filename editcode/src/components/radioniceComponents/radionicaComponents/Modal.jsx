import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Modal({ radionica, setRadionice, modal, setModal }) {
  const [success, setSuccess] = useState(false);
  const [novaPrijava, setNovaPrijava] = useState({
    ime: "",
    email: "",
    razlog: "",
  });

  const [prijave, setPrijave] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3003/prijave")
      .then((rez) => setPrijave(rez.data))
      .catch((error) => console.log("Error:", error.message));
  }, []);

  const emailValidacija = novaPrijava.email.includes("@");
  const imeValidacija = novaPrijava.ime.length >= 3;
  const razlogValidacija = novaPrijava.razlog.length >= 5;

  const prijavaRadionice = async () => {
    try {
      if (emailValidacija && imeValidacija && razlogValidacija) {
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
        await axios
          .post("http://localhost:3003/prijave", novaPrijava)
          .then((rez) => {
            setPrijave((stanje) => [...stanje, rez.data]);
          })
          .catch((error) => console.log(error.message));
        setSuccess(true);
      } else {
        alert("Pokusajte ponovo");
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  const promjenaPodatka = (event) => {
    const { name, value } = event.target;
    setNovaPrijava({ ...novaPrijava, [name]: value });
  };

  return (
    <div className=" w-[500px] h-[500px] fixed z-10 top-[20%] left-[35%] bg-white-70 border border-gold-50 shadow rounded-md  ">
      {!success ? (
        <div className="w-full flex flex-col gap-14 ">
          <div className="w-full flex flex-col p-1 ">
            <div
              onClick={() => setModal(!modal)}
              className="w-6 h-6 self-end mr-1 text-xl text-black-61 cursor-pointer"
            >
              X
            </div>
            <p className="text-2xl text-blue-45/85">
              Prijavi se na {radionica.ime}
            </p>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              prijavaRadionice();
            }}
            className="flex flex-col gap-4 px-14 "
          >
            <div className="flex flex-col">
              <input
                type="text"
                name="ime"
                value={novaPrijava.ime}
                onChange={promjenaPodatka}
                placeholder="puno ime"
                className="w-full h-[40px] border border-blue-47 rounded-md p-1"
                required
              />
              {!imeValidacija && novaPrijava.ime.length > 0 && (
                <p className="validacija">
                  Ime mora sadržavati najmanje 3 znaka
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <input
                type="email"
                name="email"
                value={novaPrijava.email}
                onChange={promjenaPodatka}
                placeholder="email"
                className="w-full h-[40px] border border-blue-47 rounded-md p-1"
                required
              />
              {!emailValidacija && novaPrijava.email.length > 0 && (
                <p className="validacija">Email mora sadržavati znak "@"</p>
              )}
            </div>
            <div className="flex flex-col">
              <textarea
                name="razlog"
                value={novaPrijava.razlog}
                onChange={promjenaPodatka}
                placeholder="razlog prijave"
                className="w-full h-[80px] border border-blue-47 rounded-md p-1"
                required
              ></textarea>
              {!razlogValidacija && novaPrijava.razlog.length > 0 && (
                <p className="validacija">
                  Ime mora sadržavati najmanje 3 znaka
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-3 border border-blue-46 bg-blue-46 hover:bg-blue-46/80 text-white-70 w-full h-[35px] rounded-md "
            >
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
