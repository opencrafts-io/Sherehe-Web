import { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import type { Area, Point } from "react-easy-crop";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCloudArrowUp,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

import "react-easy-crop/react-easy-crop.css";
import { getCroppedImage } from "../../../utils/ImageCropUtil/imageCropUtils";

interface ImagePreviewProps {
    image: File | null;
    onImageChange: (file: File | null) => void;
    inputId: string;
    aspectRatio: string;
    expectedRatio: number;
    label: string;
}

function ImagePreview({
    image,
    onImageChange,
    inputId,
    aspectRatio,
    expectedRatio,
    label,
}: ImagePreviewProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Image currently being prepared for cropping.
    const [cropImageUrl, setCropImageUrl] = useState<string | null>(null);
    const [pendingFile, setPendingFile] = useState<File | null>(null);

    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] =
        useState<Area | null>(null);

    const [error, setError] = useState<string | null>(null);
    const [isCropping, setIsCropping] = useState(false);

    // Create a preview URL for the saved image.
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

    // Release the temporary URL when the cropping dialog closes
    // or a different image is selected.
    useEffect(() => {
        if (!cropImageUrl) return;

        return () => {
            URL.revokeObjectURL(cropImageUrl);
        };
    }, [cropImageUrl]);

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];

        // Allow the same file to be selected again.
        event.target.value = "";

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image.");
            return;
        }

        setError(null);
        setPendingFile(file);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);

        // Opening the dialog is triggered by selecting the image.
        const objectUrl = URL.createObjectURL(file);
        setCropImageUrl(objectUrl);
    };

    const handleCropComplete = (
        _croppedArea: Area,
        croppedAreaPixels: Area,
    ) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleApplyCrop = async () => {
        if (!cropImageUrl || !pendingFile || !croppedAreaPixels) {
            setError("Please select an image and adjust the crop.");
            return;
        }

        try {
            setIsCropping(true);
            setError(null);

            const croppedFile = await getCroppedImage(
                cropImageUrl,
                croppedAreaPixels,
                pendingFile.name,
            );

            // Save the cropped file in the parent component's state.
            onImageChange(croppedFile);

            // Close the dialog.
            setCropImageUrl(null);
            setPendingFile(null);
        } catch (err) {
            setError(
                "Unable to crop this image. Please try another image.",
            );
        } finally {
            setIsCropping(false);
        }
    };

    const handleCancelCrop = () => {
        setCropImageUrl(null);
        setPendingFile(null);
        setCroppedAreaPixels(null);
        setError(null);
    };

    const ratioLabel =
        expectedRatio === 1
            ? "1:1"
            : expectedRatio === 16 / 9
                ? "16:9"
                : expectedRatio === 2 / 3
                    ? "2:3"
                    : `${expectedRatio.toFixed(2)}:1`;

    return (
        <>
            {/* Image selection */}
            <input
                id={inputId}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
            />

            {/* Image preview */}
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
                            onClick={() => {
                                onImageChange(null);
                                setError(null);
                            }}
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

            {error && (
                <p role="alert" className="mt-2 text-sm text-red-600">
                    {error}
                </p>
            )}

            {/* Image cropping dialog */}
            {cropImageUrl && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={`${inputId}-crop-title`}
                >
                    <div className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl">
                        {/* Dialog header */}
                        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                            <div>
                                <h2
                                    id={`${inputId}-crop-title`}
                                    className="text-lg font-semibold text-gray-900"
                                >
                                    Crop {label} image
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Drag the image to reposition it.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleCancelCrop}
                                disabled={isCropping}
                                aria-label="Cancel cropping"
                                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>

                        {/* Cropping area */}
                        <div className="relative h-75 bg-gray-950 sm:h-100">
                            <Cropper
                                image={cropImageUrl}
                                crop={crop}
                                zoom={zoom}
                                aspect={expectedRatio}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={handleCropComplete}
                                restrictPosition
                            />
                        </div>

                        {/* Zoom control */}
                        <div className="px-5 pt-5">
                            <div className="mb-2 flex items-center justify-between">
                                <label
                                    htmlFor={`${inputId}-zoom`}
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Zoom
                                </label>

                                <span className="text-sm text-gray-500">
                                    {zoom.toFixed(1)}x
                                </span>
                            </div>

                            <input
                                id={`${inputId}-zoom`}
                                type="range"
                                min={1}
                                max={3}
                                step={0.1}
                                value={zoom}
                                onChange={(event) =>
                                    setZoom(Number(event.target.value))
                                }
                                className="w-full accent-primary"
                            />

                            <p className="mt-2 text-xs text-gray-500">
                                Required aspect ratio: {ratioLabel}
                            </p>
                        </div>

                        {/* Dialog actions */}
                        <div className="flex justify-end gap-3 px-5 py-5">
                            <button
                                type="button"
                                onClick={handleCancelCrop}
                                disabled={isCropping}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleApplyCrop}
                                disabled={isCropping}
                                className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isCropping ? "Applying..." : "Apply crop"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ImagePreview;