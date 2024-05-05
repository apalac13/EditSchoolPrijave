import { Link, Outlet } from "react-router-dom";
import NavigacijaAdmin from "../components/administracijaComponents/NavigacijaAdmin";

function Administracija(props) {
  return (
    <div className="flex flex-col gap-8 mx-10 font-inter">
      <NavigacijaAdmin />
      <Outlet />
    </div>
  );
}

export default Administracija;
