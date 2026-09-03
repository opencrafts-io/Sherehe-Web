export interface BookingStepperModel {
    currentStep : number;
    steps : Steps[];

}

export interface Steps {
    id: number;
    title: string;
}

function BookingStepper({ currentStep, steps }: BookingStepperModel) {
    return (
        <div className="my-4 flex w-full items-start">
            {steps.map((step, index) => {
                const isCurrent = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                    <div
                        key={step.id}
                        className="flex flex-1 flex-col items-center"
                    >
                        {/* Circle + Connecting Line */}
                        <div className="flex w-full items-center">
                            {/* Left line */}
                            {index > 0 && (
                                <div
                                    className={`h-0.5 flex-1 ${currentStep > step.id - 1
                                            ? "bg-primary"
                                            : "bg-gray-300"
                                        }`}
                                />
                            )}

                            {/* Circle */}
                            <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold ${isCurrent
                                        ? "border-primary bg-primary text-white"
                                        : isCompleted
                                            ? "border-primary bg-primary text-white"
                                            : "border-gray-300 bg-white text-gray-500"
                                    }`}
                            >
                                {step.id}
                            </div>

                            {/* Right line */}
                            {index < steps.length - 1 && (
                                <div
                                    className={`h-0.5 flex-1 ${currentStep > step.id
                                            ? "bg-primary"
                                            : "bg-gray-300"
                                        }`}
                                />
                            )}
                        </div>

                        {/* Label */}
                        <p
                            className={`mt-2 text-xs font-medium ${isCurrent
                                    ? "text-primary"
                                    : "text-gray-500"
                                }`}
                        >
                            {step.title}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

export default BookingStepper;