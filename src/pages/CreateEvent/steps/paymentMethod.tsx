import {
    MenuItem,
    TextField,
    type SxProps,
    type Theme,
} from "@mui/material";
import CreateEventAs from "../components/createEventAs";
import type { PaymentType } from "../../../models/event";

export interface PaymentMethodProps {
    sxVariable: SxProps<Theme>;
    paymentType: PaymentType | null;
    paymentOptions: {
        value: PaymentType;
        label: string;
    }[];
    paybillNumber: string;
    accountReference: string;
    tillNumber: string;
    sendMoneyNumber: string;
    pochiNumber: string;
    hasAttemptedToContinue: boolean;

    setPaymentType: (value: PaymentType | null) => void;
    setPaybillNumber: (value: string) => void;
    setAccountReference: (value: string) => void;
    setTillNumber: (value: string) => void;
    setSendMoneyNumber: (value: string) => void;
    setPochiNumber: (value: string) => void;
}

function PaymentMethod({
    sxVariable,
    paymentType,
    paybillNumber,
    accountReference,
    tillNumber,
    sendMoneyNumber,
    pochiNumber,
    hasAttemptedToContinue,
    paymentOptions,
    setPaymentType,
    setPaybillNumber,
    setAccountReference,
    setTillNumber,
    setSendMoneyNumber,
    setPochiNumber,
}: PaymentMethodProps) {
    const isPaybillInvalid =
        hasAttemptedToContinue &&
        paymentType === "paybill" &&
        !paybillNumber.trim();

    const isAccountReferenceInvalid =
        hasAttemptedToContinue &&
        paymentType === "paybill" &&
        !accountReference.trim();

    const isTillNumberInvalid =
        hasAttemptedToContinue &&
        paymentType === "till" &&
        !tillNumber.trim();

    const isPhoneNumberInvalid =
        hasAttemptedToContinue &&
        paymentType === "sendMoney" &&
        !sendMoneyNumber.trim();

    const isPochiNumberInvalid =
        hasAttemptedToContinue &&
        paymentType === "pochi" &&
        !pochiNumber.trim();

    const isPaymentTypeInvalid =
        hasAttemptedToContinue && !paymentType;

    return (
        <div className="space-y-5">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Payment Details
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                    Choose where you would like your event earnings
                    to be transferred.
                </p>
            </div>

            <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
                <p className="text-sm leading-6 text-purple-950">
                    <strong>How payments work</strong>
                    <br />
                    All ticket payments are received by us first.
                    We will then transfer your event earnings to
                    the payment method you select below, subject to
                    the applicable settlement process and fees.
                </p>
            </div>

            <div>
                <label
                    htmlFor="paymentType"
                    className="my-2 block text-base font-bold text-gray-900"
                >
                    Payment Method
                </label>

                <TextField
                    id="paymentType"
                    name="paymentType"
                    select
                    fullWidth
                    required
                    sx={sxVariable}
                    value={paymentType ?? ""}
                    onChange={(event) =>
                        setPaymentType(
                            (event.target.value || null) as PaymentType | null,
                        )
                    }
                    error={isPaymentTypeInvalid}
                    helperText={
                        isPaymentTypeInvalid
                            ? "Please select a payment method."
                            : "Choose the method where your earnings should be sent."
                    }
                >
                    {paymentOptions.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>

            {paymentType === "paybill" && (
                <>
                    <div>
                        <label
                            htmlFor="paybillNumber"
                            className="my-2 block text-base font-bold text-gray-900"
                        >
                            Paybill Number
                        </label>

                        <TextField
                            id="paybillNumber"
                            name="paybillNumber"
                            fullWidth
                            required
                            sx={sxVariable}
                            value={paybillNumber}
                            onChange={(event) =>
                                setPaybillNumber(event.target.value)
                            }
                            placeholder="Enter your paybill number"
                            error={isPaybillInvalid}
                            helperText={
                                isPaybillInvalid
                                    ? "Paybill number is required."
                                    : ""
                            }
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="accountReference"
                            className="my-2 block text-base font-bold text-gray-900"
                        >
                            Account Reference
                        </label>

                        <TextField
                            id="accountReference"
                            name="accountReference"
                            fullWidth
                            required
                            sx={sxVariable}
                            value={accountReference}
                            onChange={(event) =>
                                setAccountReference(event.target.value)
                            }
                            placeholder="Enter your account reference"
                            error={isAccountReferenceInvalid}
                            helperText={
                                isAccountReferenceInvalid
                                    ? "Account reference is required."
                                    : ""
                            }
                        />
                    </div>
                </>
            )}

            {paymentType === "till" && (
                <div>
                    <label
                        htmlFor="tillNumber"
                        className="my-2 block text-base font-bold text-gray-900"
                    >
                        Till Number
                    </label>

                    <TextField
                        id="tillNumber"
                        name="tillNumber"
                        fullWidth
                        required
                        sx={sxVariable}
                        value={tillNumber}
                        onChange={(event) =>
                            setTillNumber(event.target.value)
                        }
                        placeholder="Enter your till number"
                        error={isTillNumberInvalid}
                        helperText={
                            isTillNumberInvalid
                                ? "Till number is required."
                                : ""
                        }
                    />
                </div>
            )}

            {paymentType === "sendMoney" && (
                <div>
                    <label
                        htmlFor="phoneNumber"
                        className="my-2 block text-base font-bold text-gray-900"
                    >
                        M-Pesa Phone Number
                    </label>

                    <TextField
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        fullWidth
                        required
                        sx={sxVariable}
                        value={sendMoneyNumber}
                        onChange={(event) =>
                            setSendMoneyNumber(event.target.value)
                        }
                        placeholder="e.g. 0712345678"
                        error={isPhoneNumberInvalid}
                        helperText={
                            isPhoneNumberInvalid
                                ? "Phone number is required."
                                : "Enter the phone number that will receive your earnings."
                        }
                    />
                </div>
            )}

            {paymentType === "pochi" && (
                <div>
                    <label
                        htmlFor="pochiNumber"
                        className="my-2 block text-base font-bold text-gray-900"
                    >
                        Pochi La Biashara Number
                    </label>

                    <TextField
                        id="pochiNumber"
                        name="pochiNumber"
                        type="tel"
                        fullWidth
                        required
                        sx={sxVariable}
                        value={pochiNumber}
                        onChange={(event) =>
                            setPochiNumber(event.target.value)
                        }
                        placeholder="Enter your Pochi registered number"
                        error={isPochiNumberInvalid}
                        helperText={
                            isPochiNumberInvalid
                                ? "Pochi number is required."
                                : "Enter the phone number registered to your Pochi account."
                        }
                    />
                </div>
            )}

            <CreateEventAs />
        </div>
    );
}

export default PaymentMethod;