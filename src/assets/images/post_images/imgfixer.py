import os

def remove_non_webp_images():
    # Get the current directory
    current_dir = os.getcwd()

    # Iterate over all files in the directory
    for filename in os.listdir(current_dir):
        # Check if the file is an image and not a WebP file
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.tiff')) and not filename.lower().endswith('.webp'):
            # Remove the file
            os.remove(filename)
            print(f"Removed {filename}")

if __name__ == "__main__":
    remove_non_webp_images()