import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faXmark,
    faCompass,
    faTicket,
    faGaugeHigh,
} from "@fortawesome/free-solid-svg-icons";

function NavBar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
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
                        <span className="text-2xl font-bold tracking-tight text-gray-900">
                            Sherehe
                        </span>
                    </div>
                    {/* Profile */}
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                        EW
                    </div>
                </div>
                {/* Bottom Row */}
                <div className="flex gap-3 px-4 pb-4">

                    {/* Sign In */}
                    <button
                        type="button"
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                    >
                        Sign In
                    </button>

                    {/* Create Event */}
                    <button
                        type="button"
                        className="flex-1 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
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
                    <span className="text-2xl font-bold tracking-tight text-gray-900">
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

                    {/* Full Name */}
                    <div className="hidden text-sm font-medium text-gray-700 xl:block">
                        eugene wachira
                    </div>

                    {/* Avatar */}
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                        EW
                    </div>

                    {/* Separator */}
                    <div className="hidden h-6 w-px bg-gray-300 lg:block" />

                    {/* Sign In */}
                    <button
                        type="button"
                        className="text-sm font-medium text-gray-700 transition hover:text-gray-900"
                    >
                        Sign In
                    </button>

                    {/* Create Event */}
                    <button
                        type="button"
                        className="hidden rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 lg:block"
                    >
                        Create Event
                    </button>

                </div>
            </div>
        </nav>
    );
}

export default NavBar;