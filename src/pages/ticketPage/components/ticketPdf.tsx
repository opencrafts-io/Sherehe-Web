import {
    Document,
    Page,
    Text,
    View,
    Image,
    StyleSheet,
} from "@react-pdf/renderer";

import {
    formatEventDateTime,
    isEventMultiday,
} from "../../../utils/EventsUtils/eventUtils";

import type { AttendeeTicket } from "../../../models/attendeeTicket";

interface TicketPdfDocumentProps {
    attendeeTicket: AttendeeTicket;
    qrCodeDataUrl: string;
}

const PURPLE = "#7C3AED";
const DARK_PURPLE = "#5B21B6";
const LIGHT_PURPLE = "#F5F0FF";
const DARK = "#1F1535";
const MUTED = "#796F8C";
const BORDER = "#E6DFF0";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#F3F0F8",
        padding: 36,
        justifyContent: "center",
        fontFamily: "Helvetica",
    },

    ticket: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: BORDER,
        overflow: "hidden",
    },

    // Main ticket header
    header: {
        backgroundColor: PURPLE,
        paddingHorizontal: 26,
        paddingTop: 24,
        paddingBottom: 26,
    },

    brandRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 25,
    },

    brand: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "bold",
        letterSpacing: 2,
    },

    admissionLabel: {
        color: "#E9D5FF",
        fontSize: 8,
        letterSpacing: 1.5,
    },

    eventName: {
        color: "#FFFFFF",
        fontSize: 25,
        fontWeight: "bold",
        lineHeight: 1.25,
        marginBottom: 14,
    },

    ticketTypePill: {
        alignSelf: "flex-start",
        backgroundColor: DARK_PURPLE,
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 20,
    },

    ticketType: {
        color: "#FFFFFF",
        fontSize: 9,
        fontWeight: "bold",
        letterSpacing: 0.7,
    },

    // Main ticket information
    details: {
        paddingHorizontal: 26,
        paddingTop: 23,
        paddingBottom: 20,
    },

    detailsHeading: {
        color: MUTED,
        fontSize: 8,
        fontWeight: "bold",
        letterSpacing: 1.5,
        marginBottom: 17,
    },

    detailsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    detail: {
        width: "50%",
        paddingRight: 12,
        marginBottom: 19,
    },

    fullWidthDetail: {
        width: "100%",
        paddingRight: 0,
        marginBottom: 19,
    },

    detailLabel: {
        color: MUTED,
        fontSize: 8,
        letterSpacing: 0.6,
        marginBottom: 6,
        textTransform: "uppercase",
    },

    detailValue: {
        color: DARK,
        fontSize: 10,
        fontWeight: "bold",
        lineHeight: 1.5,
    },

    // Perforated-looking divider
    dividerContainer: {
        height: 1,
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
    },

    dividerLine: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#D9CBEA",
        borderStyle: "dashed",
    },

    // QR ticket stub
    stub: {
        backgroundColor: LIGHT_PURPLE,
        paddingHorizontal: 24,
        paddingTop: 23,
        paddingBottom: 22,
        alignItems: "center",
    },

    stubTitle: {
        color: DARK,
        fontSize: 13,
        fontWeight: "bold",
        marginBottom: 6,
    },

    stubDescription: {
        color: MUTED,
        fontSize: 9,
        textAlign: "center",
        lineHeight: 1.5,
        marginBottom: 14,
    },

    qrFrame: {
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E6DFF0",
    },

    qrImage: {
        width: 145,
        height: 145,
    },

    ticketIdLabel: {
        color: MUTED,
        fontSize: 8,
        letterSpacing: 1,
        marginTop: 13,
        marginBottom: 5,
    },

    ticketId: {
        color: DARK_PURPLE,
        fontSize: 10,
        fontWeight: "bold",
    },

    footerBrandRow: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        gap: 6,
    },

    poweredByLabel: {
        color: MUTED,
        fontSize: 8,
    },

    companyLogo: {
        width: 65,
        height: 24,
        objectFit: "contain",
    },
});

function TicketPdfDocument({
    attendeeTicket,
    qrCodeDataUrl,
}: TicketPdfDocumentProps) {
    const {
        event,
        ticket,
        ticketQuantity,
        id,
    } = attendeeTicket;

    const {
        startDate,
        startTime,
        endDate,
        endTime,
    } = formatEventDateTime(
        event.startDate,
        event.endDate
    );

    const isMultiday = isEventMultiday(
        event.startDate,
        event.endDate
    );

    return (
        <Document
            title={`${event.eventName} - Ticket`}
            author="Sherehe"
            subject="Event admission ticket"
        >
            <Page size="A4" style={styles.page}>
                <View style={styles.ticket}>
                    {/* Ticket header */}
                    <View style={styles.header}>
                        <View style={styles.brandRow}>
                            <Text style={styles.brand}>
                                SHEREHE
                            </Text>

                            <Text style={styles.admissionLabel}>
                                OFFICIAL ADMISSION PASS
                            </Text>
                        </View>

                        <Text style={styles.eventName}>
                            {event.eventName}
                        </Text>

                        <View style={styles.ticketTypePill}>
                            <Text style={styles.ticketType}>
                                {ticket.ticketName.toUpperCase()}
                            </Text>
                        </View>
                    </View>

                    {/* Event details */}
                    <View style={styles.details}>
                        <Text style={styles.detailsHeading}>
                            EVENT INFORMATION
                        </Text>

                        <View style={styles.detailsGrid}>
                            {isMultiday ? (
                                <>
                                    <View style={styles.detail}>
                                        <Text style={styles.detailLabel}>
                                            Starts
                                        </Text>

                                        <Text style={styles.detailValue}>
                                            {startDate}
                                        </Text>

                                        <Text style={styles.detailValue}>
                                            {startTime}
                                        </Text>
                                    </View>

                                    <View style={styles.detail}>
                                        <Text style={styles.detailLabel}>
                                            Ends
                                        </Text>

                                        <Text style={styles.detailValue}>
                                            {endDate}
                                        </Text>

                                        <Text style={styles.detailValue}>
                                            {endTime}
                                        </Text>
                                    </View>
                                </>
                            ) : (
                                <>
                                    <View style={styles.detail}>
                                        <Text style={styles.detailLabel}>
                                            Date
                                        </Text>

                                        <Text style={styles.detailValue}>
                                            {startDate}
                                        </Text>
                                    </View>

                                    <View style={styles.detail}>
                                        <Text style={styles.detailLabel}>
                                            Time
                                        </Text>

                                        <Text style={styles.detailValue}>
                                            {startTime} - {endTime}
                                        </Text>
                                    </View>
                                </>
                            )}

                            <View style={styles.fullWidthDetail}>
                                <Text style={styles.detailLabel}>
                                    Venue
                                </Text>

                                <Text style={styles.detailValue}>
                                    {event.eventLocation}
                                </Text>
                            </View>

                            <View style={styles.detail}>
                                <Text style={styles.detailLabel}>
                                    Ticket Quantity
                                </Text>

                                <Text style={styles.detailValue}>
                                    {ticketQuantity}{" "}
                                    {ticketQuantity === 1
                                        ? "Ticket"
                                        : "Tickets"}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Ticket stub divider */}
                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* QR admission stub */}
                    <View style={styles.stub}>
                        <Text style={styles.stubTitle}>
                            Your Entry Pass
                        </Text>

                        <Text style={styles.stubDescription}>
                            Present this QR code at the entrance
                            {"\n"}
                            to verify your ticket.
                        </Text>

                        <View style={styles.qrFrame}>
                            <Image
                                src={qrCodeDataUrl}
                                style={styles.qrImage}
                            />
                        </View>

                        <Text style={styles.ticketIdLabel}>
                            TICKET REFERENCE
                        </Text>

                        <Text style={styles.ticketId}>
                            {id}
                        </Text>
                    </View>

                    <View style={styles.footerBrandRow}>
                        <Text style={styles.poweredByLabel}>
                            Powered by Opencrafts
                        </Text>
                        <Image
                            src="/images/opencrafts.png"
                            style={styles.companyLogo}
                        />
                    </View>

                </View>
            </Page>
        </Document>
    );
}

export default TicketPdfDocument;