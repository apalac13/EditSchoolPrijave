function Prikazi({ radionica }) {
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex">
        <p className="text-2xl text-blue-45/85 uppercase">{radionica.ime}</p>
      </div>
      <div className="flex flex-col gap-1 ">
        <div className="flex gap-1 text-sm text-black-61">
          <p className="">Opis:</p>
          <p>{radionica.opis}</p>
        </div>
        <div className="flex gap-1 text-sm text-black-61">
          <p>Predavaci:</p>
          <p>{radionica.predavac}</p>
        </div>
        <div className="flex gap-1 text-sm text-black-61">
          <p>Partneri:</p>
          <p>Locastic, Digitalna dalmacija</p>
        </div>
      </div>
    </div>
  );
}

export default Prikazi;
