from PIL import Image
import os

# Source and destination directories
src_dir = r"C:\Users\adham\Documents\GitHub\cydexyz\src\assets\images\post_images"
toolview_dir = r"C:\Users\adham\Documents\GitHub\cydexyz\src\assets\images\post_images\toolView"
sidebar_dir = r"C:\Users\adham\Documents\GitHub\cydexyz\src\assets\images\post_images\sidebarView"

# Create destination directories if they don't exist
for dir_path in [toolview_dir, sidebar_dir]:
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)

# Maximum dimensions
MAX_WIDTH = 316
MAX_HEIGHT = 79

def resize_image_by_width(image_path):
    with Image.open(image_path) as img:
        width_ratio = MAX_WIDTH / img.width
        new_height = int(img.height * width_ratio)
        resized_img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
        
        filename = os.path.basename(image_path)
        new_path = os.path.join(toolview_dir, filename)
        resized_img.save(new_path, quality=100, optimize=False)

def resize_image_by_height(image_path):
    with Image.open(image_path) as img:
        height_ratio = MAX_HEIGHT / img.height
        new_width = int(img.width * height_ratio)
        resized_img = img.resize((new_width, MAX_HEIGHT), Image.Resampling.LANCZOS)
        
        filename = os.path.basename(image_path)
        new_path = os.path.join(sidebar_dir, filename)
        resized_img.save(new_path, quality=100, optimize=False)

def main():
    for filename in os.listdir(src_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp')):
            image_path = os.path.join(src_dir, filename)
            try:
                # Resize for both toolview and sidebar
                resize_image_by_width(image_path)
                resize_image_by_height(image_path)
                print(f"Successfully resized: {filename} (both versions)")
            except Exception as e:
                print(f"Error processing {filename}: {str(e)}")

if __name__ == "__main__":
    main()