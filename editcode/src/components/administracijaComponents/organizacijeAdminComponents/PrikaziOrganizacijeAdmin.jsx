import axios from "axios";

function PrikaziOrganizacijeAdmin({
  organizacija,
  setOrganizacije,
  edit,
  setEdit,
}) {
  const izbrisiPodatak = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/organizacije/${id}`);
      const rez = axios.get("http://localhost:3003/organizacije");
      setOrganizacije(rez.data);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  return (
    <>
      <p>{organizacija.ime}</p>
      <p>{organizacija.opis}</p>
      {organizacija.radionice.map((radionica, index) => (
        <p key={index}>{radionica}</p>
      ))}
      <div className="flex gap-4 ml-16">
        <button
          onClick={() => setEdit(!edit)}
          className="border border-blue-46 bg-blue-46 hover:bg-blue-46/80 text-white-70 w-[60px] h-[30px] rounded-md text-sm"
        >
          UREDI
        </button>
        <button
          onClick={() => izbrisiPodatak(organizacija.id)}
          className="border border-gold-50 text-sm bg-white-70 hover:bg-gold-50/80 hover:text-white-70 text-gold-50 w-[60px] h-[30px] rounded-md"
        >
          IZBRISI
        </button>
      </div>
    </>
  );
}

export default PrikaziOrganizacijeAdmin;
