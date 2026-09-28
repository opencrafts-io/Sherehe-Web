import { useShallow } from "zustand/react/shallow";
import useTicketStore from "../../../stores/ticketStore";

const heightClasses = {
    50: "h-50",
    64: "h-64",
    80: "h-80",
    100: "h-100",
};

function TicketErrorSection({ height, eventId }: { height: keyof typeof heightClasses, eventId: string }) {
    const { error, getTicketsByEventId } = useTicketStore(
        useShallow((state) => ({
            error: state.error,
            getTicketsByEventId: state.getTicketsByEventId,
        }))
    );

    const loadTickets = () => {
        getTicketsByEventId(eventId);
    };

    return (
        <>
            <div className={`flex ${heightClasses[height]} flex-col items-center justify-center gap-3`}>
                <p className="text-center text-gray-600">
                    {error}
                </p>

                <button
                    onClick={loadTickets}
                    className="cursor-pointer rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
                >
                    Retry
                </button>
            </div >
        </>
    );
}

export default TicketErrorSection;