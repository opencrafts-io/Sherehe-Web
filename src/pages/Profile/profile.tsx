
import {
    faCalendarDays,
    faEnvelope,
    faIdBadge,
    faPhone,
    faRightFromBracket,
    faShieldHalved,
    faShield,
    faStar,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUserStore from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

function Profile() {
    const user = useUserStore(
        (state) => state.user
    );

    const navigate = useNavigate();

    const logout = useAuthStore(
        (state) => state.logout
    );

    const isLoading = useAuthStore(
        (state) => state.isLoading
    );

    const formatDate = (date: string) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getInitials = (name: string) => {
        const names = name.trim().split(/\s+/);

        if (names.length === 1) {
            return names[0].charAt(0).toUpperCase();
        }

        return (
            names[0].charAt(0) +
            names[1].charAt(0)
        ).toUpperCase();
    };

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
                <div className="w-full max-w-md text-center">

                    {/* Icon */}
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-95">
                        <FontAwesomeIcon
                            icon={faUser}
                            className="text-3xl text-primary"
                        />
                    </div>

                    {/* Heading */}
                    <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
                        Profile unavailable
                    </h1>

                    {/* Description */}
                    <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
                        We couldn't find your profile information right now.
                        Please try again or return to the home page.
                    </p>

                    {/* Actions */}
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                        >
                            Try Again
                        </button>

                        <button
                            type="button"
                            onClick={() => window.location.href = "/dashboard"}
                            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                            Go Home
                        </button>
                    </div>

                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">

                {/* Page Heading */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        My Profile
                    </h1>

                    <p className="mt-1 text-sm text-gray-500 sm:text-base">
                        Manage your personal information and account details.
                    </p>
                </div>

                {/* Profile Header */}
                <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">

                    {/* Colored Header */}
                    <div className="h-28 bg-primary sm:h-36" />

                    <div className="px-5 pb-6 sm:px-8">

                        {/* Avatar */}
                        <div className="-mt-14 flex flex-col sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">

                            <div className="flex flex-col items-start sm:flex-row sm:items-end sm:gap-5">

                                {user.avatarUrl ? (
                                    <img
                                        src={user.avatarUrl}
                                        alt={`${user.name}'s avatar`}
                                        className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md sm:h-32 sm:w-32"
                                    />
                                ) : (
                                    <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-primary-95 text-3xl font-bold text-primary shadow-md sm:h-32 sm:w-32">
                                        {getInitials(user.name)}
                                    </div>
                                )}

                                <div className="mt-4 sm:mb-1 sm:mt-0">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {user.name}
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        @{user.username}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        {user.bio && (
                            <p className="mt-6 max-w-2xl text-sm leading-6 text-gray-600">
                                {user.bio}
                            </p>
                        )}
                    </div>
                </section>

                {/* Vibe Points */}
                <section className="mt-6 rounded-2xl bg-primary p-6 text-white shadow-sm">
                    <div className="flex items-center justify-between gap-4">

                        <div>
                            <p className="text-sm font-medium text-white/80">
                                Vibe Points
                            </p>

                            <p className="mt-1 text-3xl font-bold">
                                {user.vibePoints.toLocaleString()}
                            </p>

                            <p className="mt-1 text-xs text-white/70">
                                Keep attending events and building your vibe!
                            </p>
                        </div>

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15">
                            <FontAwesomeIcon
                                icon={faStar}
                                className="text-2xl"
                            />
                        </div>
                    </div>
                </section>

                {/* Information Grid */}
                <div className="mt-6 grid gap-6 lg:grid-cols-2">

                    {/* Personal Information */}
                    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900">
                                Personal Information
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Your contact and personal details.
                            </p>
                        </div>

                        <div className="space-y-5">

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-95 text-primary">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Email
                                    </p>

                                    <p className="mt-1 break-all text-sm font-medium text-gray-900">
                                        {user.email || "Not provided"}
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-95 text-primary">
                                    <FontAwesomeIcon icon={faPhone} />
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Phone
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-900">
                                        {user.phone || "Not provided"}
                                    </p>
                                </div>
                            </div>

                            {/* Username */}
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-95 text-primary">
                                    <FontAwesomeIcon icon={faUser} />
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Username
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-900">
                                        @{user.username}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Account Information */}
                    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900">
                                Account Information
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Information about your Sherehe account.
                            </p>
                        </div>

                        <div className="space-y-5">

                            {/* Member Since */}
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-95 text-primary">
                                    <FontAwesomeIcon icon={faCalendarDays} />
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Member Since
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-900">
                                        {formatDate(user.createdAt)}
                                    </p>
                                </div>
                            </div>

                            {/* Account Status */}
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-95 text-primary">
                                    <FontAwesomeIcon icon={faShield} />
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Account Status
                                    </p>

                                    <div className="mt-1 flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-green-500" />

                                        <p className="text-sm font-medium text-gray-900">
                                            Active
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Onboarding */}
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-95 text-primary">
                                    <FontAwesomeIcon icon={faIdBadge} />
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Profile Status
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-900">
                                        {user.onboarded
                                            ? "Profile complete"
                                            : "Profile incomplete"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Account Preferences */}
                <section className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">

                    {/* Terms & Conditions */}
                    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                        <div className="flex items-start gap-4">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-95 text-primary">
                                <FontAwesomeIcon icon={faShieldHalved} />
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-900">
                                    Terms & Conditions
                                </h3>

                                <p className="mt-1 max-w-lg text-sm leading-5 text-gray-500">
                                    Your agreement to the Sherehe terms and conditions.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                            <span
                                className={`h-2 w-2 rounded-full ${user.termsAccepted
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                                    }`}
                            />

                            <span
                                className={`text-sm font-semibold ${user.termsAccepted
                                    ? "text-green-600"
                                    : "text-gray-500"
                                    }`}
                            >
                                {user.termsAccepted
                                    ? "Accepted"
                                    : "Not accepted"}
                            </span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100" />

                    {/* Logout */}
                    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                        <div className="flex items-start gap-4">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                <FontAwesomeIcon icon={faRightFromBracket} />
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-900">
                                    Log out
                                </h3>

                                <p className="mt-1 max-w-lg text-sm leading-5 text-gray-500">
                                    Log out of your Sherehe account on this device.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={async () => {
                                if (isLoading) return;

                                const success = await logout();

                                if (success) {
                                    navigate("/login");
                                }
                            }}
                            className="
                                inline-flex w-full items-center justify-center gap-2
                                rounded-lg border border-red-200 bg-white
                                px-4 py-2.5 text-sm font-semibold text-red-600
                                transition
                                hover:bg-red-50 hover:text-red-700
                                disabled:cursor-not-allowed disabled:opacity-60
                                sm:w-auto
                            "
                        >
                            {isLoading ? (
                                <>
                                    <span
                                        className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-600"
                                        aria-hidden="true"
                                    />

                                    Signing out...
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon
                                        icon={faRightFromBracket}
                                        className="text-xs"
                                    />

                                    Sign out
                                </>
                            )}
                        </button>
                    </div>

                </section>

            </div>
        </div>
    );
}

export default Profile;
