import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Students from "./components/Students";

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/students" element={<Students/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default MainRouter