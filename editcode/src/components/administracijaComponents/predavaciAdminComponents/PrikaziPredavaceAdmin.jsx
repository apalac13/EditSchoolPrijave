import axios from "axios";

function PrikaziPredavaceAdmin({ predavac, setPredavaci, edit, setEdit }) {
  const izbrisiPodatak = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/predavaci/${id}`);
      const rez = axios.get("http://localhost:3003/predavaci");
      setPredavaci(rez.data);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  return (
    <>
      <p>{predavac.ime}</p>
      <p>{predavac.biografija}</p>
      <p>{predavac.organizacija}</p>
      <div className="flex gap-4 ml-16">
        <button
          onClick={() => setEdit(!edit)}
          className="border border-blue-46 bg-blue-46 hover:bg-blue-46/80 text-white-70 w-[60px] h-[30px] rounded-md text-sm"
        >
          UREDI
        </button>
        <button
          onClick={() => izbrisiPodatak(predavac.id)}
          className="border border-gold-50 text-sm bg-white-70 hover:bg-gold-50/80 hover:text-white-70 text-gold-50 w-[60px] h-[30px] rounded-md"
        >
          IZBRISI
        </button>
      </div>
    </>
  );
}

export default PrikaziPredavaceAdmin;
