import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faXmark,
    faCompass,
    faTicket,
    faGaugeHigh,
    faChevronDown,
    faUser,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/auth_store";

function NavBar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const navigateCreateEvent = () => {
        navigate("create-event");
    };
    const navigateSignIn = () => {
        navigate("login");
    };
    const isAuthenticated = useAuthStore(
        (state) => state.isAuthenticated
    );

    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const logOut = useAuthStore(
        (state) => state.logout
    );

    return (
        <nav className="border-b border-gray-200 bg-white">
            {/* Mobile Navbar */}
            <div className="lg:hidden">
                {/* Top Row */}
                <div className="flex h-16 items-center justify-between px-4">
                    {/* Left: Hamburger + Logo */}
                    <div className="flex items-center gap-3">
                        {/* Hamburger */}
                        <button
                            type="button"
                            onClick={() => setDrawerOpen(true)}
                            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100"
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        {/* Logo */}
                        <span className="text-2xl font-bold tracking-tight text-primary">
                            Sherehe
                        </span>
                    </div>
                    {/* Profile */}
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                        EW
                    </div>
                </div>
                {/* Bottom Row */}
                <div className="flex gap-3 px-4 pb-4">

                    {/* Sign In */}
                    {
                        !isAuthenticated && (
                            <button
                                type="button"
                                onClick={navigateSignIn}
                                className="flex-1 rounded-lg border border-primary px-4 py-2.5 text-sm font-semibold text-primary transition active:bg-primary-95"
                            >
                                Sign In
                            </button>)
                    }


                    {/* Create Event */}
                    <button
                        type="button"
                        onClick={navigateCreateEvent}
                        className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition active:bg-purple-700"
                    >
                        Create Event
                    </button>
                </div>
            </div>

            {/* Mobile Drawer  */}

            {drawerOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">

                    {/* Backdrop */}
                    <div
                        className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${drawerOpen
                            ? "opacity-100"
                            : "pointer-events-none opacity-0"
                            }`}
                        onClick={() => setDrawerOpen(false)}
                    />

                    {/* Drawer */}
                    <aside
                        className={`relative h-full w-4/5 max-w-sm bg-white shadow-xl transition-transform duration-500 ease-in-out ${drawerOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                            }`}
                    >

                        {/* Drawer Header */}
                        <div className="flex h-16 items-center justify-between px-5">

                            <span className="text-2xl font-bold tracking-tight text-gray-900">
                                Sherehe
                            </span>

                            <button
                                type="button"
                                onClick={() => setDrawerOpen(false)}
                                className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                                aria-label="Close navigation menu"
                            >
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className="text-xl"
                                />
                            </button>

                        </div>

                        {/* Divider */}
                        <hr className="border-gray-200" />

                        {/* Navigation */}
                        <div className="flex flex-col p-4">

                            {/* Explore */}
                            <a
                                href="#"
                                onClick={() => setDrawerOpen(false)}
                                className="flex items-center gap-4 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
                            >
                                <FontAwesomeIcon
                                    icon={faCompass}
                                    className="w-5 text-gray-500"
                                />

                                <span className="font-medium">
                                    Explore
                                </span>
                            </a>

                            {/* My Tickets */}
                            <a
                                href="#"
                                onClick={() => setDrawerOpen(false)}
                                className="flex items-center gap-4 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
                            >
                                <FontAwesomeIcon
                                    icon={faTicket}
                                    className="w-5 text-gray-500"
                                />

                                <span className="font-medium">
                                    My Tickets
                                </span>
                            </a>

                            {/* Dashboard */}
                            <a
                                href="#"
                                onClick={() => setDrawerOpen(false)}
                                className="flex items-center gap-4 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
                            >
                                <FontAwesomeIcon
                                    icon={faGaugeHigh}
                                    className="w-5 text-gray-500"
                                />

                                <span className="font-medium">
                                    Dashboard
                                </span>
                            </a>

                        </div>

                    </aside>
                </div>
            )}

            {/* Desktop Navbar */}
            <div className="relative hidden h-16 items-center justify-between px-6 lg:flex lg:px-8">

                {/* Logo */}
                <div className="shrink-0">
                    <span className="text-2xl font-bold tracking-tight text-primary">
                        Sherehe
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-6 lg:gap-8">

                    <a
                        href="#"
                        className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                    >
                        Explore
                    </a>

                    <a
                        href="#"
                        className="whitespace-nowrap text-sm font-medium text-gray-600 transition hover:text-gray-900"
                    >
                        My Tickets
                    </a>

                    <a
                        href="#"
                        className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                    >
                        Dashboard
                    </a>

                </div>

                {/* Right Section */}
                <div className="ml-auto flex items-center gap-4 lg:gap-5">

                    {/* Profile */}
                    {isAuthenticated && (
                        <div className="relative">

                            {/* Profile Button */}
                            <button
                                type="button"
                                onClick={() =>
                                    setProfileDropdownOpen(!profileDropdownOpen)
                                }
                                className="flex items-center gap-3 rounded-lg p-1 transition hover:bg-primary-95"
                            >

                                {/* Full Name */}
                                <div className="hidden text-right xl:block">

                                    <p className="text-sm font-semibold text-gray-800">
                                        Eugene Wachira
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        My Account
                                    </p>

                                </div>

                                {/* Avatar */}
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                                    EW
                                </div>

                                {/* Dropdown Arrow */}
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className={`hidden text-xs text-gray-500 transition-transform lg:block ${profileDropdownOpen ? "rotate-180" : ""
                                        }`}
                                />

                            </button>


                            {/* Dropdown Menu */}
                            {profileDropdownOpen && (
                                <div className="absolute right-0 top-full z-50 mt-3 w-52 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-xl">

                                    {/* View Profile */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setProfileDropdownOpen(false);
                                            navigate("/profile");
                                        }}
                                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-primary-95"
                                    >
                                        <FontAwesomeIcon
                                            icon={faUser}
                                            className="text-primary"
                                        />

                                        View Profile
                                    </button>


                                    {/* Divider */}
                                    <div className="my-2 border-t border-gray-100" />


                                    {/* Logout */}
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            setProfileDropdownOpen(false);

                                            const success = await logOut();

                                            if (success) {
                                                navigate("/login");
                                            }
                                        }}
                                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
                                    >
                                        <FontAwesomeIcon
                                            icon={faRightFromBracket}
                                        />

                                        Logout
                                    </button>

                                </div>
                            )}

                        </div>
                    )}

                    {/* Sign In */}
                    {!isAuthenticated && (
                        <button
                            type="button"
                            onClick={navigateSignIn}
                            className="rounded-lg border border-primary px-4 py-2 font-medium text-primary transition hover:bg-primary-95"
                        >
                            Sign In
                        </button>
                    )}

                    {/* Create Event */}
                    <button
                        type="button"
                        onClick={navigateCreateEvent}
                        className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700 lg:block"
                    >
                        Create Event
                    </button>

                </div>
            </div>
        </nav>
    );
}

export default NavBar;