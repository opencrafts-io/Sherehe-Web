import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NavigateFunction } from "react-router-dom";

function ProfileDropdown({ closeProfile, logOut, navigate }: { closeProfile: () => void, logOut: () => Promise<boolean>, navigate: NavigateFunction }) {
    return (
        <>
            <div className="absolute right-0 top-full z-50 mt-3 w-52 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-xl">

                {/* View Profile */}
                <button
                    type="button"
                    onClick={() => {
                        closeProfile();
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
                        closeProfile();

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
        </>
    );
}

export default ProfileDropdown;