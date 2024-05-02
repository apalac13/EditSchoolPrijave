function Prikazi({ radionica }) {
  return (
    <div>
      <p>{radionica.ime}</p>
      <div>
        <p>Opis:</p>
        <p>{radionica.opis}</p>
      </div>
      <div>
        <p>Predavaci:</p>
        <p>{radionica.predavac}</p>
      </div>
      <p>partneri:</p>
    </div>
  );
}

export default Prikazi;
