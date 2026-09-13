function PaymentButtons() {
    return (
        <>
            <div className="mt-6 flex flex-col gap-3">
                <button
                    type="button"
                    className="w-full rounded-md bg-primary px-4 py-3 font-medium text-white transition hover:bg-purple-700"
                >
                    Pay Now
                </button>

                <button
                    type="button"
                    className="w-full rounded-md border border-primary px-4 py-3 font-medium text-primary transition hover:bg-primary-95"
                >
                    Confirm Payment
                </button>
            </div>
        </>
    );
}

export default PaymentButtons;