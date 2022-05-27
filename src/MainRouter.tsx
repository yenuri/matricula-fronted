import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Students from './pages/Students'
import { decodeToken, getToken } from './utils/tokenManagment'
import { useDispatch } from 'react-redux'
import { SessionActions } from './store/actions/session'

const MainRouter = () => {
    const token = getToken()
    const dispatch = useDispatch()
    if (token) {
        const decodeUserData = decodeToken()
        dispatch(SessionActions.onLoginSuccess(decodeUserData))
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/students" element={<Students />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRouter
