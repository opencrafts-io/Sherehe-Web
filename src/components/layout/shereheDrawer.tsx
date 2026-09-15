import { faCompass, faGaugeHigh, faRightFromBracket, faTicket, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

function ShereheDrawer({
    drawerOpen,
    openDrawer,
    closeDrawer,
}:
    {
        drawerOpen: boolean,
        openDrawer: () => void,
        closeDrawer: () => void,
    }) {
    const navigate = useNavigate();

    const navLinkClass = "flex items-center gap-4 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-gray-100 hover:text-gray-900";

    const fontAwesomeClass = "w-5 text-gray-500";

    const logout = useAuthStore(
        (state) => state.logout
    );

    const isLoading = useAuthStore(
        (state) => state.isLoading
    );

    const onLogout = async () => {
        if (isLoading) return;

        const success = await logout();

        if (success) {
            closeDrawer();
            navigate("/login");
        }
    };

    const isAuthenticated = useAuthStore(
        (state) => state.isAuthenticated
    );

    return (
        <>
            <div className="fixed inset-0 z-50 lg:hidden">

                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${drawerOpen
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                        }`}
                    onClick={openDrawer}
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

                        <span className="text-2xl font-bold tracking-tight text-primary">
                            Sherehe
                        </span>

                        <button
                            type="button"
                            onClick={closeDrawer}
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
                        <NavLink to="/dashboard" className={navLinkClass} onClick={closeDrawer} >
                            <FontAwesomeIcon
                                icon={faCompass}
                                className={fontAwesomeClass}
                            />
                            <span className="font-medium">
                                Explore
                            </span>

                        </NavLink>
                        <NavLink to="/my-tickets" className={navLinkClass} onClick={closeDrawer}>
                            <FontAwesomeIcon
                                icon={faTicket}
                                className={fontAwesomeClass}
                            />
                            <span className="font-medium">
                                My Tickets
                            </span>
                        </NavLink>
                        <NavLink to="/my-organized-events" className={navLinkClass} onClick={closeDrawer}>
                            <FontAwesomeIcon
                                icon={faGaugeHigh}
                                className={fontAwesomeClass}
                            />
                            <span className="font-medium">
                                My Organized Events
                            </span>
                        </NavLink>
                        {isAuthenticated && (
                            <NavLink to="/profile" className={navLinkClass} onClick={closeDrawer}>
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className={fontAwesomeClass}
                                />
                                <span className="font-medium">
                                    Profile
                                </span>
                            </NavLink>
                        )}
                        {isLoading ? (
                            <div className={navLinkClass}>
                                <span
                                    className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-600"
                                    aria-hidden="true"
                                />
                                <p className="font-medium">
                                    Signing out...
                                </p>

                            </div>
                        ) : (
                            <button disabled={isLoading} className={navLinkClass} onClick={onLogout}>
                                <FontAwesomeIcon
                                    icon={faRightFromBracket}
                                    className={fontAwesomeClass}
                                />
                                <span className="font-medium">
                                    Logout
                                </span>
                            </button>
                        )}
                    </div>

                </aside>
            </div>
        </>
    );
}

export default ShereheDrawer;