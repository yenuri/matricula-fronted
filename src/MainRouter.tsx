import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Students from './pages/Students'
import { decodeToken, getToken } from './utils/tokenManagment'
import { useDispatch } from 'react-redux'
import { SessionActions } from './store/actions/session'
import {
    baseRoute,
    coursesRoute,
    loginRoute,
    studentsRoute,
} from './constants/routes'
import PrivateRoute from './components/PrivateRoute'
import Courses from './pages/Courses'

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
                <Route path={baseRoute} element={<Login />} />
                <Route path={loginRoute} element={<Login />} />
                <Route
                    path={studentsRoute}
                    element={
                        <PrivateRoute>
                            <Students />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={coursesRoute}
                    element={
                        <PrivateRoute>
                            <Courses />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<span>404</span>} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRouter
