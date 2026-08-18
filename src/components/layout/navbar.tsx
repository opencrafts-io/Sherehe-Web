function NavBar() {
    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="relative flex h-16 items-center justify-between px-6">

                {/* Logo */}
                <div className="shrink-0">
                    <span className="text-2xl font-bold tracking-tight text-black-900">
                        Sherehe
                    </span>
                </div>

                {/* Navigation Links - Center */}
                <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-8">
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
                <div className="ml-auto flex shrink-0 items-center gap-5">

                    {/* Full Name */}
                    <div className="text-sm font-medium text-grey-700">
                        eugene wachira
                    </div>

                    {/* Avatar */}
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                        EW
                    </div>

                    {/* Vertical Separator */}
                    <div className="h-6 w-px bg-gray-300" />

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
                        className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                        Create Event
                    </button>
                </div>

            </div>
        </nav>
    );
}

export default NavBar;