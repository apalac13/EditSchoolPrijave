function Radionica({ user, radionice, setRadionice }) {
  return (
    <div className="w-3/4">
      {radionice.map((radionica) => (
        <div key={radionica.id} className="flex">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfZcpvdnbhcRhQ_D-Gxk2yO_MEYCH6hGioKYRiM_rQjZJPez2kxbJ-ODzXYUFtU2uTh78&usqp=CAU"
            alt="slika"
          />
          <div>
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
            <div className="flex justify-between">
              <button>PRIJAVI SE</button>
              <button className={`${user ? `visible` : `hidden`}`}>
                UREDI
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Radionica;
