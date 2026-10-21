export interface PaginationButtonsProps {
    handlePrevious: () => void;
    currentPage: number | undefined;
    previousButtonDisabled: boolean;
    nextButtonDisabled: boolean;
    handleNext: () => void;
}


function PaginationButtons({ currentPage, previousButtonDisabled, nextButtonDisabled, handlePrevious, handleNext }: PaginationButtonsProps) {
    if (!currentPage) {
        return (
            <p className="items-center text-xl">
                Current Page cannot be null
            </p>
        );
    }
    return (
        <>
            <div className="mt-12 flex items-center justify-center gap-2">

                {/* Previous */}
                <button
                    onClick={handlePrevious}
                    disabled={previousButtonDisabled}
                    className="
                            rounded-lg
                            border border-purple-200
                            bg-purple-50
                            px-4 py-2
                            text-sm font-semibold text-purple-700
                            transition-colors duration-200
                            hover:bg-purple-100
                            hover:text-purple-800
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                >
                    Previous
                </button>

                {/* Current page */}
                <button
                    className="
                            rounded-lg
                            bg-primary
                            px-4 py-2
                            text-sm font-semibold text-white
                        "
                >
                    {currentPage}
                </button>

                {/* Next */}
                <button
                    onClick={handleNext}
                    disabled={nextButtonDisabled}
                    className="
                            rounded-lg
                            border border-purple-200
                            bg-purple-50
                            px-4 py-2
                            text-sm font-semibold text-purple-700
                            transition-colors duration-200
                            hover:bg-purple-100
                            hover:text-purple-800
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                >
                    Next
                </button>

            </div>
        </>
    );
}

export default PaginationButtons;