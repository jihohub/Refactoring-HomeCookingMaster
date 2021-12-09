import os
import uuid
import boto3
from dotenv import load_dotenv
# from PIL import Image

# Load AWS KEY Values
load_dotenv()
BUCKET_NAME = "hcmk-bucket"
AWS_ACCESS_KEY_ID = os.getenv("AWS_Access_Key_Id")
AWS_SECRET_KEY = os.getenv("AWS_Secret_Key")
aws_public_root_url = f"https://{BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/"

# Set S3 Client
s3_client = boto3.client('s3',
                    aws_access_key_id=AWS_ACCESS_KEY_ID,
                    aws_secret_access_key=AWS_SECRET_KEY,
                    region_name='ap-northeast-2'
                    )

def boto3_image_upload(file):
    '''
    input: img file
    output: 저장한 image url
    '''
    file_name = uuid.uuid4().hex
    file_type = file.filename.split(".")[-1]
    file_path = f"uploaded_images/{file_name}.{file_type}"
    s3_client.put_object(
        ACL='public-read',  # 읽기 권한 부여
        Bucket=BUCKET_NAME, 
        Body=file, 
        Key=file_path, 
        ContentType= f"image/{file_type}",
    )
    result = aws_public_root_url + file_path
    return result
# # Example
# img = open('./maincharacter.png', 'rb') #<_io.BufferedReader name='./maincharacter.png'>
# image_url = boto3_image_upload(img)
# print(image_url)
# # img_url 형태: "https://hcmk-bucket.s3.ap-northeast-2.amazonaws.com/uploaded_images/8215f60b23b749e49c0cdacddda45d4b.png"

def boto3_image_delete(image_url):
    '''
    input: image url
    '''
    file_name = image_url.split(aws_public_root_url)[-1] # 입력박는 image_url 보고 수정 예정
    s3_client.delete_object(Bucket=BUCKET_NAME, Key=file_name)
## Example
# tmp_url = 'https://hcmk-bucket.s3.ap-northeast-2.amazonaws.com/uploaded_images/1eab904e55c449bfb53e34418805f77c.'
# boto3_image_delete(tmp_url)

def default_profile_img():
    # img = open('./mainavatar.png', 'r')
    # file_name = uuid.uuid4().hex
    # file_type = img.name.split(".")[-1]
    # file_path = f"uploaded_images/{file_name}.{file_type}"
    # s3_client.put_object(
    #     ACL='public-read',  # 읽기 권한 부여
    #     Bucket=BUCKET_NAME, 
    #     Body=img, 
    #     Key=file_path, 
    #     ContentType= f"image/{file_type}",
    # )
    # result = aws_public_root_url + file_path
    return 'https://hcmk-bucket.s3.ap-northeast-2.amazonaws.com/uploaded_images/mainAvatar.png'