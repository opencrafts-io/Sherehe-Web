import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTicket,
    faShieldHalved,
    faHandSparkles
} from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "../../stores/auth_store";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function AuthLoadingScreen() {
    const initializeAuth = useAuthStore(
        (state) => state.initializeAuth
    );

    const isInitializing = useAuthStore(
        (state) => state.isInitializing
    );

    const navigate = useNavigate();

    const hasInitialized = useRef(false);

    useEffect(() => {
        if (hasInitialized.current) {
            return;
        }

        hasInitialized.current = true;

        initializeAuth();
    }, [initializeAuth]);

    useEffect(() => {
        if (!isInitializing) {
            navigate("/dashboard", { replace: true });
        }
    }, [isInitializing, navigate]);

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">


            <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary opacity-30 blur-3xl animate-pulse" />

            <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-primary opacity-20 blur-3xl animate-pulse" />

            {/* Grid effect */}
            <div
                className="
                    absolute inset-0
                    opacity-[0.05]
                    bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
                    bg-size-[40px_40px]
                "
            />


            <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">


                <div className="relative flex h-56 w-56 items-center justify-center">

                    {/* Outer glowing ring */}
                    <div className="absolute h-52 w-52 rounded-full border border-primary/30 animate-pulse" />

                    {/* Rotating ring */}
                    <div className="absolute h-44 w-44 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-primary/40" />

                    {/* Reverse rotating ring */}
                    <div className="absolute h-36 w-36 animate-[spin_4s_linear_infinite_reverse] rounded-full border border-primary/40 border-b-primary" />

                    {/* Orbiting sparkle */}
                    <div className="absolute h-48 w-48 animate-spin">

                        <div className="absolute left-1/2 top-0 -translate-x-1/2">

                            <FontAwesomeIcon
                                icon={faHandSparkles}
                                className="text-primary text-lg"
                            />

                        </div>

                    </div>

                    {/* Center */}
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-primary shadow-2xl shadow-primary/40">

                        <FontAwesomeIcon
                            icon={faTicket}
                            className="text-4xl text-white"
                        />

                    </div>

                </div>


                <div className="mt-10">

                    <div className="flex items-center justify-center gap-2">

                        <h1 className="text-4xl font-bold tracking-tight text-white">
                            Sherehe
                        </h1>

                        <FontAwesomeIcon
                            icon={faHandSparkles}
                            className="text-primary"
                        />

                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-400">
                        Preparing your next unforgettable experience
                    </p>

                </div>


                <div className="mt-10 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">

                    {/* Pulsing status */}
                    <span className="relative flex h-3 w-3">

                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />

                        <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />

                    </span>

                    <span className="text-sm text-slate-300">
                        Restoring your session
                    </span>

                </div>


                <div className="mt-8 flex items-center gap-2 text-xs text-slate-500">

                    <FontAwesomeIcon icon={faShieldHalved} />

                    <span>
                        Securely connecting to Sherehe
                    </span>

                </div>

            </div>

        </div>
    );
}

export default AuthLoadingScreen;