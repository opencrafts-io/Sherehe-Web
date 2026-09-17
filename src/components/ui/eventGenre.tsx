function EventGenre({ genre }: { genre: string }) {
    return (
        <>
            <span
                className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700"
            >
                {genre}
            </span>
        </>
    );
}

export default EventGenre;