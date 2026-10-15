import type { Area } from "react-easy-crop";

export const getCroppedImage = (
    imageUrl: string,
    pixelCrop: Area,
    originalFileName: string,
): Promise<File> => {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            if (!context) {
                reject(new Error("Unable to process this image."));
                return;
            }

            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;

            context.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height,
            );

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error("Unable to crop this image."));
                        return;
                    }

                    const fileName =
                        originalFileName.replace(/\.[^/.]+$/, "") + ".jpg";

                    resolve(
                        new File([blob], fileName, {
                            type: "image/jpeg",
                            lastModified: Date.now(),
                        }),
                    );
                },
                "image/jpeg",
                0.92,
            );
        };

        image.onerror = () => {
            reject(new Error("Unable to load the selected image."));
        };

        image.src = imageUrl;
    });
};