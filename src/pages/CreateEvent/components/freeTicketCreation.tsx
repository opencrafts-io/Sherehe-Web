import CreateEventAs from "./createEventAs";

export interface FreeTicketCreationProps {
    ticketQuantity: string;
    setTicketQuantity: (quantity: string) => void;
    showQuantityError: boolean;
}

function FreeTicketCreation({ ticketQuantity, setTicketQuantity, showQuantityError }: FreeTicketCreationProps) {
    return (
        <>
            <div className="mt-8 border-t border-gray-200 pt-6">
                <label
                    htmlFor="freeTicketQuantity"
                    className="block font-bold text-gray-900"
                >
                    How many tickets would you like to create?
                </label>

                <p className="mt-1 text-sm text-gray-600">
                    Enter the total number of free tickets available
                    for your event.
                </p>

                <div className="mt-4 max-w-md">
                    <input
                        id="freeTicketQuantity"
                        type="number"
                        min="1"
                        step="1"
                        inputMode="numeric"
                        value={ticketQuantity}
                        onChange={(event) => {
                            const value = event.target.value;

                            if (/^\d*$/.test(value)) {
                                setTicketQuantity(value);
                            }
                        }}
                        placeholder="e.g. 100"
                        aria-invalid={showQuantityError}
                        aria-describedby="freeTicketQuantityHelp"
                        className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary ${showQuantityError
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                    />

                    <p
                        id="freeTicketQuantityHelp"
                        className={`mt-2 text-xs ${showQuantityError
                            ? "text-red-600"
                            : "text-gray-500"
                            }`}
                    >
                        {showQuantityError
                            ? "Enter a valid whole number greater than zero."
                            : "Use a whole number greater than zero."}
                    </p>
                </div>
            </div>

            <CreateEventAs />
        </>
    );
}

export default FreeTicketCreation;