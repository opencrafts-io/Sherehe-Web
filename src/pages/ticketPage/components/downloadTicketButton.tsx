import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import QRCode from "qrcode";
import TicketPdfDocument from "./ticketPdf";
import type { AttendeeTicket } from "../../../models/attendeeTicket";

interface DownloadTicketButtonProps {
    attendeeTicket: AttendeeTicket;
}

function DownloadTicketButton({
    attendeeTicket,
}: DownloadTicketButtonProps) {
    const [generating, setGenerating] = useState(false);

    const handlePrepareDownload = async () => {
        if (generating) return;

        try {
            setGenerating(true);

            const qrCodeDataUrl = await QRCode.toDataURL(
                `academia@opencrafts:${attendeeTicket.id}`,
                {
                    errorCorrectionLevel: "H",
                    margin: 2,
                    width: 400,
                }
            );

            // Generate the PDF document and convert it to a Blob.
            const pdfBlob = await pdf(
                <TicketPdfDocument
                    attendeeTicket={attendeeTicket}
                    qrCodeDataUrl={qrCodeDataUrl}
                />
            ).toBlob();

            // Create a temporary URL for the generated PDF.
            const pdfUrl = URL.createObjectURL(pdfBlob);

            // Create a temporary anchor to trigger the download.
            const link = document.createElement("a");

            link.href = pdfUrl;
            link.download = `${attendeeTicket.ticket.ticketName}-${attendeeTicket.id}.pdf`;

            document.body.appendChild(link);
            link.click();
            link.remove();

            // Release the temporary URL after the download starts.
            setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000);

        } catch (error) {
            console.error("Failed to generate or download ticket PDF:", error);
        } finally {
            setGenerating(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handlePrepareDownload}
            disabled={generating}
            className="flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
            {generating ? "Generating PDF..." : "Download Ticket"}
        </button>
    );
}

export default DownloadTicketButton;