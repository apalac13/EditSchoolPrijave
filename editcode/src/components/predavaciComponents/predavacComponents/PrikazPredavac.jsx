import { Link } from "react-router-dom";

function PrikazPredavac({ predavac }) {
  return (
    <div>
      <p className="text-xl">{predavac.ime}</p>
      <div className="flex">
        <p>Biografija: </p>
        <p>{predavac.biografija}</p>
      </div>
      <div className="flex">
        <p>Organizacija:</p>
        <p>{predavac.organizacija}</p>
      </div>
      <div className="flex">
        <p>Teme:</p>
        <p>React, Express</p>
      </div>
    </div>
  );
}

export default PrikazPredavac;
