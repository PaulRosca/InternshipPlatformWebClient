import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IApplicant, ICompany, ContactMethod, UserContext } from "../context/user";
import { register } from "../services";

type ViewType = "applicant" | "company";
export default function SignUp() {
    const inactiveClassName = "mr-2 p-3 rounded text-gray-500 hover:bg-gray-200 hover:text-gray-900";
    const activeClassName = "mr-2 p-3 rounded text-white bg-indigo-600";
    const [view, setView] = useState<ViewType>("applicant");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [contactMethod, setContactMethod] = useState<ContactMethod>("email");
    const [name, setName] = useState<string>("");
    const [numberOfEmployees, setNumberOfEmployees] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const setCompanyView = () => {
        setConfirmPassword("");
        setView("company");
    };
    const setApplicantView = () => {
        setConfirmPassword("");
        setView("applicant");
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let userData: IApplicant | ICompany;
        if(password!==confirmPassword) {
            return;
        }
        if (view === "applicant") {
            userData = {
                email,
                firstName,
                lastName,
                phone,
                contactMethod,
                password,
                type: "applicant"
            }
        }
        else {
            userData = {
                email,
                name,
                numberOfEmployees,
                password,
                type: "company"
            }
        }
        const newUser = await register(userData);
        setUser(newUser);
        navigate("/");
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-flex-start px-6 mx-auto md:h-screen py-8" style={{ height: 'auto' }}>
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-1/4 mx-auto" src="cargo-ship.svg" alt="logo" />
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <div className="flex">
                            <button className={view === "applicant" ? activeClassName : inactiveClassName} onClick={setApplicantView}>
                                Applicant
                            </button>
                            <button className={view === "company" ? activeClassName : inactiveClassName} onClick={setCompanyView}>
                                Company
                            </button>
                        </div>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {
                                view === "applicant" ?
                                    (
                                        <>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your first name</label>
                                                <input type="text" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required
                                                    value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your last name</label>
                                                <input type="text" name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required
                                                    value={lastName} onChange={(e) => setLastName(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                                <input type="tel" name="phoneNumber" id="phoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="074..."
                                                    value={phone} onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact method</label>
                                                <select id="contactMethod" value={contactMethod} onChange={(e) => setContactMethod(e.target.value as ContactMethod)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500">
                                                    <option value="email">Email</option>
                                                    <option value="phone">Phone</option>
                                                    <option value="any">Any</option>
                                                </select>
                                            </div>
                                        </>
                                    ) :
                                    (
                                        <>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="IBM" required
                                                    value={name} onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of employees</label>
                                                <input type="number" name="numberOfEmployees" id="numberOfEmployees" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="500"
                                                    value={numberOfEmployees} onChange={(e) => setNumberOfEmployees(e.target.value)}
                                                />
                                            </div>
                                        </>
                                    )
                            }
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-600 dark:ring-offset-gray-800" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-indigo-600 hover:underline dark:text-indigo-500" href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Create an account</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
