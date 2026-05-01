import os
from PIL import Image

def compress_images(source_dir, target_dir):
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)

    print(f"Starting conversion in: {source_dir}")
    
    for filename in os.listdir(source_dir):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.jfif')):
            try:
                # Clean filename: lowercase, replace spaces and commas with hyphens
                clean_name = filename.lower().replace(' ', '-').replace(',', '-').split('.')[0]
                output_path = os.path.join(target_dir, f"{clean_name}.webp")
                
                with Image.open(os.path.join(source_dir, filename)) as img:
                    # Maintain 1:1 if possible, or just convert to WebP
                    # (User said they are already 1:1)
                    
                    # Convert to RGB if necessary (for PNGs with alpha or CMYK JPEGs)
                    if img.mode in ("RGBA", "P"):
                        img = img.convert("RGB")
                    
                    # Save as WebP with 80% quality (excellent balance)
                    img.save(output_path, "WEBP", quality=80)
                    print(f"Successfully converted: {filename} -> {clean_name}.webp")
            except Exception as e:
                print(f"Error converting {filename}: {e}")

if __name__ == "__main__":
    source = "src/assets/indian_food"
    target = "src/assets/indian_food_webp"
    compress_images(source, target)
    print("\nConversion Complete! Your Gourmet Assets are ready.")
