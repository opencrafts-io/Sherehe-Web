import { faCloudArrowUp, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ImageUpload() {
    return (
        <>
            <div>
                <h2 className='text-4xl my-2 font-bold'>Event Images</h2>
                <h3>Upload images to make your event more engaging. Each image is used in different parts of the app.</h3>
            </div>
            <div className="my-4 rounded-lg border border-gray-200 p-6">
                <div className="grid gap-8 md:grid-cols-3">
                    <div>
                        <div className="mb-3">
                            <h4 className="font-bold">
                                Card Image
                            </h4>

                            <p className="mt-1 text-sm text-gray-600">
                                Used in event listings and when sharing on the event on Chirp.
                                This is the main image people will see first.
                            </p>

                            <p className="mt-1 text-xs font-medium text-gray-500">
                                Recommended ratio: 1:1
                            </p>
                        </div>

                        <label
                            htmlFor="cardImage"
                            className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-primary hover:bg-purple-50"
                        >
                            <FontAwesomeIcon
                                icon={faCloudArrowUp}
                                className="mb-3 text-2xl text-gray-500"
                            />

                            <span className="text-sm font-medium text-gray-600">
                                Click to upload
                            </span>

                            <span className="mt-1 text-xs text-gray-400">
                                1:1 image
                            </span>

                            <input
                                id="cardImage"
                                type="file"
                                accept="image/*"
                                className="hidden"
                            />
                        </label>
                    </div>

                    <div>
                        <div className="mb-3">
                            <h4 className="font-bold">
                                Banner Image
                            </h4>

                            <p className="mt-1 text-sm text-gray-600">
                                Displayed on the event details page
                                (event preview screen with date, description, and people attending the event).
                            </p>

                            <p className="mt-1 text-xs font-medium text-gray-500">
                                Recommended ratio: 16:9
                            </p>
                        </div>

                        <label
                            htmlFor="bannerImage"
                            className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-primary hover:bg-purple-50"
                        >
                            <FontAwesomeIcon
                                icon={faCloudArrowUp}
                                className="mb-3 text-2xl text-gray-500"
                            />

                            <span className="text-sm font-medium text-gray-600">
                                Click to upload
                            </span>

                            <span className="mt-1 text-xs text-gray-400">
                                16:9 image
                            </span>

                            <input
                                id="bannerImage"
                                type="file"
                                accept="image/*"
                                className="hidden"
                            />
                        </label>
                    </div>

                    <div>
                        <div className="mb-3">
                            <h4 className="font-bold">
                                Poster Image
                            </h4>

                            <p className="mt-1 text-sm text-gray-600">
                                Used when sharing your event externally
                                (e.g., WhatsApp and other social media platforms).
                                Acts like a preview image for your event.
                            </p>

                            <p className="mt-1 text-xs font-medium text-gray-500">
                                Recommended ratio: 2:3
                            </p>
                        </div>

                        <label
                            htmlFor="posterImage"
                            className="flex aspect-2/3 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-primary hover:bg-purple-50"
                        >
                            <FontAwesomeIcon
                                icon={faCloudArrowUp}
                                className="mb-3 text-2xl text-gray-500"
                            />

                            <span className="text-sm font-medium text-gray-600">
                                Click to upload
                            </span>

                            <span className="mt-1 text-xs text-gray-400">
                                2:3 image
                            </span>

                            <input
                                id="posterImage"
                                type="file"
                                accept="image/*"
                                className="hidden"
                            />
                        </label>
                    </div>

                </div>

                <div className="mt-8 flex items-start gap-3 rounded-lg border border-purple-200 bg-purple-50 p-4">
                    <FontAwesomeIcon
                        icon={faImage}
                        className="mt-0.5 text-primary"
                    />

                    <p className="text-sm text-gray-700">
                        <strong>Important:</strong> For any image not uploaded,
                        a default color palette will be used instead
                    </p>
                </div>
            </div>
        </>
    );
}

export default ImageUpload;