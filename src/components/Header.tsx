import { Fragment, useContext } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { UserContext } from '../context/user'
import { useNavigate } from 'react-router-dom';
import { logout } from '../services';

export default function Header() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        setUser(null);
        navigate("/");
    };
    return (
        <Popover className="relative bg-white">
            <div className="mx-auto w-full px-6">
                <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <div className="flex justify-center items-center px-3 text-2xl">Intern</div>
                        <img
                            className="h-8 w-auto sm:h-10"
                            src="cargo-ship.svg"
                            alt=""
                        />
                    </div>
                    <div className="-my-2 -mr-2 md:hidden">
                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>
                    <Popover.Group as="nav" className="hidden space-x-10 md:flex flex-1">
                        {
                            user ? user.type === "applicant" ? (
                                <>
                                    <a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                        Internships
                                    </a>
                                    <a href="/myApplications" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                        My applications
                                    </a>
                                </>
                            ) : (
                                <a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                    My listings
                                </a>
                            )
                                :
                                (
                                    <>
                                    </>
                                )
                        }
                    </Popover.Group>
                    {
                        user ? (
                            <button className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                onClick={handleLogout}
                            >
                                Sign out
                            </button>

                        ) :
                            (
                                <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                                    <a href="/signIn" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                                        Sign in
                                    </a>
                                    <a
                                        href="/signUp"
                                        className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    >
                                        Sign up
                                    </a>
                                </div>
                            )
                    }
                </div>
            </div>

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
                    <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="space-y-6 py-6 px-5">
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                {
                                    user ? user.type === "applicant" ?
                                        (
                                            <>
                                                <a href="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                                    Internships
                                                </a>

                                                <a href="/myApplications" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                                    My applications
                                                </a>
                                            </>

                                        ) : (
                                            <a href="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                                My listings
                                            </a>
                                        ) :
                                        (
                                            <>
                                            </>
                                        )
                                }
                            </div>
                            {
                                user ?
                                    (
                                        <button className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                            onClick={handleLogout}
                                        >
                                            Sign out
                                        </button>
                                    ) :
                                    (
                                        <div>
                                            <a
                                                href="/signUp"
                                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                            >
                                                Sign up
                                            </a>
                                            <p className="mt-6 text-center text-base font-medium text-gray-500">
                                                Existing customer?{' '}
                                                <a href="/signIn" className="text-indigo-600 hover:text-indigo-500">
                                                    Sign in
                                                </a>
                                            </p>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover >
    )
}
