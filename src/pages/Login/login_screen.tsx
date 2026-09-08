import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGoogle,
    faApple,
} from "@fortawesome/free-brands-svg-icons";
import {
    faCalendarDays,
    faTicket,
} from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "../../stores/auth_store";

function LoginScreen() {
    const loginWithGoogle = useAuthStore(
        (state) => state.loginWithGoogle
    );
    const loginWithApple = useAuthStore(
        (state) => state.loginWithApple
    );

    const loadingProvider = useAuthStore(
        (state) => state.loadingProvider
    );
    const isLoading = loadingProvider != null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">

                {/* Left Section */}
                <div className="bg-primary p-8 md:px-12 md:py-20 text-white flex flex-col justify-center sm:items-center">
                    <div className="max-w-md">
                        <h1 className="text-4xl font-bold mb-4">
                            Sherehe
                        </h1>

                        <p className="text-white/80 text-base leading-relaxed mb-8">
                            Discover amazing events, book your tickets, and
                            create unforgettable experiences with Sherehe.
                        </p>

                        {/* Feature 1 */}
                        <div className="border border-white/20 rounded-xl p-5 mb-4 bg-white/10">
                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                                    <FontAwesomeIcon
                                        icon={faCalendarDays}
                                        className="text-lg"
                                    />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg mb-1">
                                        Discover Events
                                    </h3>

                                    <p className="text-sm text-white/70 leading-relaxed">
                                        Find concerts, parties, conferences,
                                        and other exciting events happening
                                        around you.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="border border-white/20 rounded-xl p-5 bg-white/10">
                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                                    <FontAwesomeIcon
                                        icon={faTicket}
                                        className="text-lg"
                                    />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg mb-1">
                                        Book Your Tickets
                                    </h3>

                                    <p className="text-sm text-white/70 leading-relaxed">
                                        Secure your tickets quickly and get
                                        ready to enjoy your next experience.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="w-full max-w-md mx-auto">

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Sign in to Sherehe
                            </h2>

                            <p className="text-sm text-gray-500 mt-2">
                                Sign in to continue to your Sherehe account.
                            </p>
                        </div>

                        {/* Google */}
                        <button
                            type="button"
                            onClick={loginWithGoogle}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loadingProvider === "google" ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-gray-800" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon
                                        icon={faGoogle}
                                        className="text-lg"
                                    />
                                    Continue with Google
                                </>
                            )}
                        </button>

                        {/* Apple */}
                        <button
                            type="button"
                            onClick={loginWithApple}
                            disabled={isLoading}
                            className="w-full mt-3 flex items-center justify-center gap-3 rounded-lg border border-gray-300 bg-gray-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loadingProvider === "apple" ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon
                                        icon={faApple}
                                        className="text-lg"
                                    />
                                    Continue with Apple
                                </>
                            )}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;