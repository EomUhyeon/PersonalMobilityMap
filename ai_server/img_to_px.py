from PIL import Image

# Paths to the original images
image_paths = [
    "./CCTV_off.jpg",  # Unpressed state image
    "./CCTV_on.jpg"    # Pressed state image
]

# Load images, resize to 50x50 px, and save them
resized_images = []
for index, path in enumerate(image_paths):
    img = Image.open(path)
    img_resized = img.resize((30, 30))
    resized_images.append(img_resized)
    # Save resized images
    img_resized.save(f"./CCTV_{'off' if index == 0 else 'on'}_30px.jpg")
