export default function PrikazPredavac({ predavac }) {
  return (
    <div className="flex flex-col gap-[2px] text-start">
      <p className="text-xl text-blue-45/85 mb-3 self-center">{predavac.ime}</p>
      <div className="flex  gap-1 text-sm text-black-61">
        <p>Biografija: </p>
        <p>{predavac.biografija}</p>
      </div>
      <div className="flex gap-1 text-sm text-black-61">
        <p>Organizacija:</p>
        <p>{predavac.organizacija}</p>
      </div>
      <div className="flex text-sm gap-1 text-black-61">
        <p>Teme:</p>
        <p>{predavac.tema}</p>
      </div>
    </div>
  );
}
