import { useNavigate } from "react-router-dom";

export function useNavigationToEventTickets() {
    const navigate = useNavigate();

    return (eventId: string) => {
        navigate(`/my-ticket/event/${eventId}`);
    };
}