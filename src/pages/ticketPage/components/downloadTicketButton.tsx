import { useState } from "react";

import {
    PDFDownloadLink,
} from "@react-pdf/renderer";

import QRCode from "qrcode";
import TicketPdfDocument from "./ticketPdf";
import type { AttendeeTicket } from "../../../models/attendeeTicket";

interface DownloadTicketButtonProps {
    attendeeTicket: AttendeeTicket;
}

function DownloadTicketButton({
    attendeeTicket,
}: DownloadTicketButtonProps) {
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(
        null
    );

    const [generating, setGenerating] = useState(false);

    const handlePrepareDownload = async () => {
        try {
            console.log("Preparing ticket PDF...");
            setGenerating(true);
            console.log(`Generating QR code for ticket ID: ${attendeeTicket.id}`);


            const dataUrl = await QRCode.toDataURL(
                `academia@opencrafts:${attendeeTicket.id}`,
                {
                    errorCorrectionLevel: "H",
                    margin: 2,
                    width: 400,
                }
            );

            setQrCodeDataUrl(dataUrl);
        } catch (error) {
            console.error("Failed to prepare ticket PDF:", error);
        } finally {
            setGenerating(false);
        }
    };

    if (qrCodeDataUrl) {
        return (
            <PDFDownloadLink
                document={
                    <TicketPdfDocument
                        attendeeTicket={attendeeTicket}
                        qrCodeDataUrl={qrCodeDataUrl}
                    />
                }
                fileName={`${attendeeTicket.ticket.ticketName}-${attendeeTicket.id}.pdf`}
                className="flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white"
            >
                {({ loading }) =>
                    loading ? "Generating PDF..." : "Download Ticket"
                }
            </PDFDownloadLink>
        );
    }

    return (
        <button
            type="button"
            onClick={handlePrepareDownload}
            disabled={generating}
            className="flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
            {generating ? "Preparing ticket..." : "Download Ticket"}
        </button>
    );
}

export default DownloadTicketButton;