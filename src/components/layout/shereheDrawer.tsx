import { faCompass, faGaugeHigh, faRightFromBracket, faTicket, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NavigateFunction } from "react-router-dom";

function ShereheDrawer({
    drawerOpen,
    openDrawer,
    closeDrawer,
    navigate,
    logOut,
}:
    {
        drawerOpen: boolean,
        openDrawer: () => void,
        closeDrawer: () => void,
        navigate: NavigateFunction,
        logOut: () => Promise<boolean>,
    }) {
    const drawerItems = [
        {
            name: "Explore",
            onDrawerClick: () => { },
            icon: faCompass,
        },
        {
            name: "My Tickets",
            onDrawerClick: () => { },
            icon: faTicket,
        },
        {
            name: "Dashboard",
            onDrawerClick: () => { },
            icon: faGaugeHigh,
        },
        {
            name: "Profile",
            onDrawerClick: () => { },
            icon: faUser,
        },
        {
            name: "Logout",
            onDrawerClick: async () => {
                const success = await logOut();

                if (success) {
                    navigate("/login");
                }
            },
            icon: faRightFromBracket,
        }
    ];

    return (
        <>
            <div className="fixed inset-0 z-50 lg:hidden">

                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${drawerOpen
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                        }`}
                    onClick={() => openDrawer}
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
                        {drawerItems.map((item) => (
                            <a
                                key={item.name}
                                onClick={async() => {
                                    closeDrawer();
                                    await item.onDrawerClick();
                                }}
                                className="flex items-center gap-4 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
                            >
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    className="w-5 text-gray-500"
                                />

                                <span className="font-medium">
                                    {item.name}
                                </span>
                            </a>
                        ))}
                    </div>

                </aside>
            </div>
        </>
    );
}

export default ShereheDrawer;