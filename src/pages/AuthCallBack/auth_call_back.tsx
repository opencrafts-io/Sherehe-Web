import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "../../stores/auth_store";

function AuthCallBack() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const exchangeCode = useAuthStore(
        (state) => state.exchangeCode
    );

    const error = useAuthStore(
        (state) => state.error
    );

    useEffect(() => {
        const code = searchParams.get("code");

        if (!code) {
            return;
        }

        const authenticate = async () => {
            const success = await exchangeCode(code);

            if (success) {
                navigate("/", { replace: true });
            }
        };

        authenticate();
    }, [searchParams, exchangeCode, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
            <div className="w-full max-w-md text-center">

                {/* Logo */}
                <div className="mb-8 flex justify-center">
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-lg">
                        <div className="absolute inset-0 rounded-2xl bg-primary animate-ping opacity-20" />

                        <span className="relative text-2xl font-bold text-white">
                            S
                        </span>
                    </div>
                </div>

                {/* Loading indicator */}
                <div className="mb-6 flex justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
                </div>

                {/* Text */}
                {!error ? (
                    <>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Signing you in
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-gray-500">
                            We're securely completing your sign in.
                            This should only take a moment.
                        </p>
                    </>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Sign in failed
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-gray-500">
                            {error}
                        </p>
                    </>
                )}

                {/* Security message */}
                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
                    <FontAwesomeIcon icon={faShieldHalved} />
                    <span>Secure authentication</span>
                </div>

            </div>
        </div>
    );
}

export default AuthCallBack;