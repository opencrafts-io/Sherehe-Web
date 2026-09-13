import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import useUserStore from "../../stores/userStore";
import type { User } from "../../models/user";
import ShereheDrawer from "./shereheDrawer";
import ProfileDropdown from "./profileDropdown";

function NavBar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const navigateCreateEvent = () => {
        navigate("create-event");
    };
    const navigateProfile = () => {
        navigate("profile");
    };
    const navigateSignIn = () => {
        navigate("login");
    };
    const isAuthenticated = useAuthStore(
        (state) => state.isAuthenticated
    );
    const user = useUserStore(
        (state) => state.user
    );

    const openDrawer = () => {
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    const getUserNameAndInitials = (user: User | null) => {
        if (!user) {
            return {
                name: "Guest",
                initials: "G"
            }
        }

        return {
            name: user.name,
            initials: getInitials(user.name)
        };
    };

    const getInitials = (name: string): string => {
        const names = name.trim().split(/\s+/);

        if (names.length === 1) {
            return names[0].charAt(0).toUpperCase();
        }

        return (
            names[0].charAt(0) +
            names[1].charAt(0)
        ).toUpperCase();
    };

    const { name, initials } = getUserNameAndInitials(user);

    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const closeProfile = () => {
        setProfileDropdownOpen(false);
    };

    const toggleProfile = () => {
        setProfileDropdownOpen((previousValue) => !previousValue);
    };

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
                    {user?.avatarUrl ? (
                        <img
                            src={user.avatarUrl}
                            onClick={navigateProfile}
                            alt={`${user.name}'s avatar`}
                            className="h-9 w-9 rounded-full object-cover "
                        />
                    ) : (
                        <div onClick={navigateProfile} className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                            {initials}
                        </div>
                    )}
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
                <ShereheDrawer
                    drawerOpen={drawerOpen}
                    openDrawer={openDrawer}
                    closeDrawer={closeDrawer}
                    navigate={navigate}
                    logOut={logOut}
                />
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

                    <div className="relative">

                        {/* Profile Button */}
                        <button
                            type="button"
                            onClick={toggleProfile}
                            disabled={!isAuthenticated}
                            className={`flex items-center gap-3 rounded-lg p-1 transition ${isAuthenticated} ? "hover:bg-primary-95"`}
                        >

                            {/* Full Name */}
                            <div className="hidden text-right xl:block">

                                <p className="text-sm font-semibold text-gray-800">
                                    {name}
                                </p>

                                <p className="text-xs text-gray-500">
                                    {isAuthenticated ? "My Account" : "Guest Account"}
                                </p>

                            </div>

                            {user?.avatarUrl ? (
                                <img
                                    src={user.avatarUrl}
                                    alt={`${user.name}'s avatar`}
                                    className="h-9 w-9 rounded-full"
                                />
                            ) : (
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                                    {initials}
                                </div>
                            )}


                            {/* Dropdown Arrow */}
                            {isAuthenticated && (
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className={`hidden text-xs text-gray-500 transition-transform lg:block ${profileDropdownOpen ? "rotate-180" : ""
                                        }`}
                                />
                            )}
                        </button>


                        {/* Dropdown Menu */}
                        {profileDropdownOpen && (
                            <ProfileDropdown closeProfile={closeProfile} logOut={logOut} navigate={navigate} />
                        )}

                    </div>


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