import axios from "axios";

function PrikaziRadioniceAdmin({ radionica, setRadionice, edit, setEdit }) {
  const izbrisiPodatak = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/radionice/${id}`);

      setRadionice((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  return (
    <>
      <p>{radionica.ime}</p>
      <p>Broj prijava: {radionica.broj_prijava}</p>
      <p>Datum: {radionica.datum}</p>
      <div className="flex gap-4 ml-16">
        <button
          onClick={() => setEdit(!edit)}
          className="border border-blue-46 bg-blue-46 hover:bg-blue-46/80 text-white-70 w-[60px] h-[30px] rounded-md text-sm"
        >
          UREDI
        </button>
        <button
          onClick={() => izbrisiPodatak(radionica.id)}
          className="border border-gold-50 text-sm bg-white-70 hover:bg-gold-50/80 hover:text-white-70 text-gold-50 w-[60px] h-[30px] rounded-md"
        >
          IZBRISI
        </button>
      </div>
    </>
  );
}

export default PrikaziRadioniceAdmin;
