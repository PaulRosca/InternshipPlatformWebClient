import { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext } from './context/user'
import Header from './components/Header';
import LandingPage from './pages/Landing';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import AddListingPage from './pages/AddListing';
import InternshipsPage from './pages/Internships';
import InternshipPage from './pages/Internship';
import MyApplicationsPage from './pages/MyApplications';
import MyListingsPage from './pages/MyListings';
import GenerateCVPage from './pages/GenerateCV';

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
                    <Route path="/" element={user ? user.type === 'applicant' ? <InternshipsPage /> : <MyListingsPage /> : <LandingPage />} />
                    <Route path="/signIn" element={<SignInPage />} />
                    <Route path="/signUp" element={<SignUpPage />} />
                    <Route path="/addListing" element={<AddListingPage />} />
                    <Route path="/internship/:id" element={<InternshipPage />} />
                    <Route path="/myApplications" element={<MyApplicationsPage />} />
                    <Route path="/myListings" element={<MyListingsPage />} />
                    <Route path="/genCV" element={<GenerateCVPage />} />
                </Routes>
            </Router>
        </>
    );
};
