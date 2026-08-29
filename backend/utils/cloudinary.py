import cloudinary
import cloudinary.uploader
import cloudinary.api
from fastapi import UploadFile, HTTPException, status

# Configure your credentials (can also be read from environment variables)
cloudinary.config(
    cloud_name="your_cloud_name",
    api_key="your_api_key",
    api_secret="your_api_secret",
    secure=True,
)


def upload_image(file: UploadFile, folder: str = "projects") -> dict:
    """Uploads an image to Cloudinary and returns image_url and image_public_id."""
    try:
        response = cloudinary.uploader.upload(
            file.file,
            folder=folder,
            resource_type="image",
        )
        return {
            "image_url": response.get("secure_url"),
            "image_public_id": response.get("public_id"),
        }
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Cloudinary upload failed: {str(exc)}",
        )


def delete_image(public_id: str) -> None:
    """Deletes an image from Cloudinary using its public_id."""
    try:
        cloudinary.uploader.destroy(public_id, resource_type="image")
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Cloudinary deletion failed: {str(exc)}",
        )