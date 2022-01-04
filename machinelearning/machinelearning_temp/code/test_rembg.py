from rembg.bg import remove
import numpy as np
import io
from PIL import Image, ImageFile

input_path = 'E:\workspace\\elice_web_project3\\ml\\imgs\\bzjg.jpg'

output_path = 'E:\workspace\\elice_web_project3\\ml\\imgs\\out.jpg'

# Uncomment the following line if working with trucated image formats (ex. JPEG / JPG)
ImageFile.LOAD_TRUNCATED_IMAGES = True

print('-- file read --')
f = np.fromfile(input_path)
print('-- remove --')
result = remove(f, 
    alpha_matting=True,
    alpha_matting_foreground_threshold=240,
    alpha_matting_background_threshold=10,
    alpha_matting_erode_structure_size=10,
    alpha_matting_base_size=1000,)

img = Image.open(io.BytesIO(result)).convert("RGB")
print('-- save --')
img.save(output_path)
print('-- end --')