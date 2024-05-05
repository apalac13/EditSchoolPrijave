import { useState } from "react";

function FormOrganizacija({ setOrganizacije }) {
  const [novaOrganizacija, setNovuOrganizaciju] = useState({
    ime: "",
    opis: "",
    radionice: [],
  });

  return (
    <div>
      <p>Forma za organizaciju</p>
    </div>
  );
}

export default FormOrganizacija;
