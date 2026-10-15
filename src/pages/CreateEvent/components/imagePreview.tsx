import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faXmark } from "@fortawesome/free-solid-svg-icons";

interface ImagePreviewProps {
    image: File | null;
    onImageChange: (file: File | null) => void;
    inputId: string;
    aspectRatio: string;
    label: string;
}

function ImagePreview({
    image,
    onImageChange,
    inputId,
    aspectRatio,
    label,
}: ImagePreviewProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!image) {
            setPreviewUrl(null);
            return;
        }

        const objectUrl = URL.createObjectURL(image);
        setPreviewUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [image]);

    return (
        <>
            <input
                id={inputId}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                    const file = event.target.files?.[0] ?? null;

                    if (file && !file.type.startsWith("image/")) {
                        return;
                    }

                    onImageChange(file);

                    // Allows selecting the same file again.
                    event.target.value = "";
                }}
            />

            <div
                className={`relative ${aspectRatio} overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-primary`}
            >
                {previewUrl ? (
                    <>
                        <img
                            src={previewUrl}
                            alt={`${label} preview`}
                            className="h-full w-full object-cover"
                        />

                        <button
                            type="button"
                            onClick={() => onImageChange(null)}
                            aria-label={`Remove ${label}`}
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>

                        <label
                            htmlFor={inputId}
                            className="absolute bottom-0 left-0 right-0 cursor-pointer bg-black/60 p-2 text-center text-sm font-medium text-white hover:bg-black/75"
                        >
                            Change image
                        </label>
                    </>
                ) : (
                    <label
                        htmlFor={inputId}
                        className="flex h-full w-full cursor-pointer flex-col items-center justify-center"
                    >
                        <FontAwesomeIcon
                            icon={faCloudArrowUp}
                            className="mb-3 text-2xl text-gray-500"
                        />

                        <span className="text-sm font-medium text-gray-600">
                            Click to upload
                        </span>

                        <span className="mt-1 text-xs text-gray-400">
                            {label} image
                        </span>
                    </label>
                )}
            </div>

            {image && (
                <p className="mt-2 truncate text-sm text-gray-600">
                    {image.name}
                </p>
            )}
        </>
    );
}

export default ImagePreview;