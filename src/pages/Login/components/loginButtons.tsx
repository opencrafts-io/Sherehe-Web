import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthStore from "../../../stores/authStore";
import { faApple, faGoogle } from "@fortawesome/free-brands-svg-icons";

function LoginButtons() {
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
        <>
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
        </>
    );
}

export default LoginButtons;