import { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext } from './context/user'
import Header from './components/Header';
import LandingPage from './pages/Landing';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';

export default function App() {
    const { user, setUser } = useContext(UserContext);
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            setUser(null);
        }

    }, []);
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={user ? user.type === 'applicant' ? <LandingPage /> : <LandingPage /> : <LandingPage />} />
                    <Route path="/signIn" element={<SignInPage />} />
                    <Route path="/signUp" element={<SignUpPage />} />
                </Routes>
            </Router>
        </>
    );
};
