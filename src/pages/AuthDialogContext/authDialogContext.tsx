import {
    createContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import LoginRequiredDialog from "./components/loginRequiredDialog";

interface AuthDialogContextType {
    openLoginDialog: (redirectTo?: string) => void;
    closeLoginDialog: () => void;
}

export const AuthDialogContext = createContext<AuthDialogContextType | undefined>(
    undefined
);

export const AUTH_EVENTS = {
    LOGIN_REQUIRED: "auth:login-required",
} as const;

export const showLoginRequiredDialog = (redirectTo?: string) => {
    window.dispatchEvent(
        new CustomEvent(AUTH_EVENTS.LOGIN_REQUIRED, {
            detail: { redirectTo },
        })
    );
};

function AuthDialogProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const [redirectTo, setRedirectTo] = useState<string | undefined>();

    const openLoginDialog = (destination?: string) => {
        setRedirectTo(destination);
        setOpen(true);
    };

    const closeLoginDialog = () => {
        setOpen(false);
    };

    useEffect(() => {
        const handleLoginRequired = (event: Event) => {
            const customEvent = event as CustomEvent<{
                redirectTo?: string;
            }>;

            openLoginDialog(customEvent.detail?.redirectTo);
        };

        window.addEventListener(
            AUTH_EVENTS.LOGIN_REQUIRED,
            handleLoginRequired
        );

        return () => {
            window.removeEventListener(
                AUTH_EVENTS.LOGIN_REQUIRED,
                handleLoginRequired
            );
        };
    }, []);

    return (
        <AuthDialogContext.Provider
            value={{
                openLoginDialog,
                closeLoginDialog,
            }}
        >
            {children}

            <LoginRequiredDialog
                open={open}
                onClose={closeLoginDialog}
                redirectTo={redirectTo}
            />
        </AuthDialogContext.Provider>
    );
}

export default AuthDialogProvider;