import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleExclamation,
    faArrowLeft,
    faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "../../stores/auth_store";

function AuthCallBack() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const hasExchangeCode = useRef(false);

    const code = searchParams.get("code");

    const exchangeCode = useAuthStore(
        (state) => state.exchangeCode
    );

    const error = useAuthStore(
        (state) => state.error
    );

    useEffect(() => {
        if (!code) return;

        if (hasExchangeCode.current) return;

        hasExchangeCode.current = true;

        const authenticate = async () => {
            const success = await exchangeCode(code);

            if (success) {
                navigate("/", { replace: true });
            }
        };

        authenticate();
    }, [code, exchangeCode, navigate]);

    if (!code) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
                <div className="w-full max-w-md text-center">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
                        <FontAwesomeIcon
                            icon={faCircleExclamation}
                            className="text-3xl text-red-500"
                        />
                    </div>

                    <h1 className="mt-6 text-2xl font-bold text-gray-900">
                        Invalid sign in link
                    </h1>

                    <p className="mt-3 leading-6 text-gray-500">
                        We couldn't find the information needed to complete
                        your sign in. Please try signing in again.
                    </p>

                    <button
                        onClick={() => navigate("/login")}
                        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Back to sign in
                    </button>

                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
                <div className="w-full max-w-md text-center">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-200">
                        <FontAwesomeIcon
                            icon={faCircleExclamation}
                            className="text-3xl text-red-500"
                        />
                    </div>

                    <h1 className="mt-6 text-2xl font-bold text-gray-900">
                        Sign in unsuccessful
                    </h1>

                    <p className="mt-3 leading-6 text-gray-500">
                        {error}
                    </p>

                    <button
                        onClick={() => navigate("/login")}
                        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Try again
                    </button>

                </div>
            </div>
        );
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 px-6">

            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary opacity-10 blur-3xl" />

            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary opacity-10 blur-3xl" />

            <div className="relative w-full max-w-md text-center">

                <div className="relative mx-auto flex h-28 w-28 items-center justify-center">

                    <div className="absolute h-28 w-28 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />

                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">

                        <FontAwesomeIcon
                            icon={faShieldHalved}
                            className="text-3xl text-primary"
                        />

                    </div>
                </div>

                <h1 className="mt-10 text-2xl font-bold tracking-tight text-gray-900">
                    Signing you in
                </h1>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                    We're securely completing your authentication.
                    This will only take a moment.
                </p>

                <div className="mt-8 flex justify-center gap-2">

                    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />

                    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />

                    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary" />

                </div>

                <div className="mt-10 flex items-center justify-center gap-2 text-xs text-gray-400">

                    <FontAwesomeIcon
                        icon={faShieldHalved}
                    />

                    <span>
                        Secure authentication in progress
                    </span>

                </div>

            </div>
        </div>
    );
}

export default AuthCallBack;