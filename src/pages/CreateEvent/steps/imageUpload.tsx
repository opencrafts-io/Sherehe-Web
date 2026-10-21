import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImagePreview from "../components/imagePreview";

export interface ImageUploadProps {
    cardImage: File | null;
    setCardImage: (file: File | null) => void;

    bannerImage: File | null;
    setBannerImage: (file: File | null) => void;

    posterImage: File | null;
    setPosterImage: (file: File | null) => void;
}

function ImageUpload({
    cardImage,
    setCardImage,
    bannerImage,
    setBannerImage,
    posterImage,
    setPosterImage,
}: ImageUploadProps) {
    return (
        <>
            <div>
                <h2 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>Event Images</h2>
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

                        <ImagePreview
                            image={cardImage}
                            onImageChange={setCardImage}
                            inputId="cardImage"
                            aspectRatio="aspect-square"
                            expectedRatio={1}
                            label="Card"
                        />
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

                        <ImagePreview
                            image={bannerImage}
                            onImageChange={setBannerImage}
                            inputId="bannerImage"
                            aspectRatio="aspect-video"
                            expectedRatio={16 / 9}
                            label="Banner"
                        />
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

                        <ImagePreview
                            image={posterImage}
                            onImageChange={setPosterImage}
                            inputId="posterImage"
                            aspectRatio="aspect-[2/3]"
                            expectedRatio={2 / 3}
                            label="Poster"
                        />
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