from rembg.bg import remove
import numpy as np
import io
from PIL import Image, ImageFile

input_path = './ml_model/01_016_01016019_160474294028095_1.jpg'
output_path = './ml_model/out.jpg'

# Uncomment the following line if working with trucated image formats (ex. JPEG / JPG)
ImageFile.LOAD_TRUNCATED_IMAGES = True

print('-- file read --')
f = np.fromfile(input_path)
print('-- remove --')
result = remove(f)
img = Image.open(io.BytesIO(result)).convert("RGB")
print('-- save --')
img.save(output_path)
print('-- end --')