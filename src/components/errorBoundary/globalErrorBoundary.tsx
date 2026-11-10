import {
    isRouteErrorResponse,
    useRouteError,
    useNavigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTriangleExclamation,
    faHouse,
    faRotateRight,
    faCompass,
} from "@fortawesome/free-solid-svg-icons";

const GlobalErrorBoundary = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    let title = "Oops! Something went wrong";
    let message =
        "We encountered an unexpected problem while loading this page. Don't worry, you can try again or head back to the homepage.";

    let status: string | number = "ERROR";

    if (isRouteErrorResponse(error)) {
        status = error.status;

        if (error.status === 404) {
            title = "Page not found";
            message =
                "The page you're looking for doesn't seem to exist or may have been moved. Let's get you back on track.";
        } else if (error.status >= 500) {
            title = "Something went wrong";
            message =
                "We're having trouble processing your request right now. Please try again in a moment.";
        } else {
            title = error.statusText || "Request failed";
            message =
                error.data?.message ||
                "We couldn't complete your request. Please try again.";
        }
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#FAF9FF] flex items-center justify-center px-6 py-12">

            {/* Background decorations */}
            <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />

            <div className="relative z-10 w-full max-w-2xl">

                {/* Main content */}
                <div className="rounded-3xl border border-white bg-white/80 px-6 py-12 text-center shadow-[0_20px_70px_rgba(88,28,135,0.08)] backdrop-blur-xl sm:px-12 sm:py-16">

                    {/* Error illustration */}
                    <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center">

                        <div className="absolute inset-0 rounded-full bg-purple-100" />

                        <div className="absolute inset-3 rounded-full border border-purple-200" />

                        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary-60 shadow-lg shadow-purple-300/40">
                            <FontAwesomeIcon
                                icon={faTriangleExclamation}
                                className="text-3xl text-white"
                            />
                        </div>

                        <span className="absolute -right-1 top-3 h-4 w-4 rounded-full border-4 border-white bg-pink-400" />
                        <span className="absolute -bottom-1 left-3 h-3 w-3 rounded-full bg-purple-300" />
                    </div>

                    {/* Status */}
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-xs font-semibold tracking-wider text-primary">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        {status}
                    </div>

                    {/* Heading */}
                    <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {title}
                    </h1>

                    {/* Description */}
                    <p className="mx-auto mb-9 max-w-lg text-base leading-7 text-gray-500">
                        {message}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">

                        <button
                            onClick={() => navigate("/dashboard")}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#6D28D9] hover:shadow-xl sm:w-auto"
                        >
                            <FontAwesomeIcon icon={faHouse} />
                            Back to Home
                        </button>

                        <button
                            onClick={() => window.location.reload()}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-200 hover:bg-purple-50 sm:w-auto"
                        >
                            <FontAwesomeIcon icon={faRotateRight} />
                            Try Again
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 border-t border-gray-100 pt-7">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                            <FontAwesomeIcon
                                icon={faCompass}
                                className="text-primary"
                            />
                            <span>
                                Let's get you back to discovering experiences.
                            </span>
                        </div>
                    </div>

                </div>

                {/* Branding
                <p className="mt-7 text-center text-sm font-medium tracking-wide text-gray-400">
                    SHEREHE
                </p> */}
            </div>
        </div>
    );
};

export default GlobalErrorBoundary;