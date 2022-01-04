from pymatting import cutout

input_path = 'E:\workspace\\elice_web_project3\\ml\\imgs\\bzjg.jpg'
tripmap_path = 'E:\workspace\\elice_web_project3\\ml\\imgs\\bzjg_back.jpg'
output_path = 'E:\workspace\\elice_web_project3\\ml\\imgs\\out.jpg'

print('-- remove --')


cutout(
    # input image path
    input_path,
    # input trimap path
    tripmap_path,
    # output cutout path
    output_path)

print('-- end --')