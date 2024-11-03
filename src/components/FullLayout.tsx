import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";


function FullLayout() {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet/>
            <Footer></Footer>
        </div>
    );
}

export default FullLayout;