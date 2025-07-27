import requests
import os
import sys

script_dir = os.path.dirname(os.path.abspath(__file__))
filename = os.path.join(script_dir, "../frontend/public/downloaded_image.jpg") 

frontend_dir = os.path.abspath(os.path.join(script_dir, '..', 'frontend'))
filename = os.path.join(frontend_dir, "downloaded_image.jpg")

os.makedirs(frontend_dir, exist_ok=True)

url = "http://192.168.50.107/1280x720.jpg"

def download_image():
    response = requests.get(url)
    if response.status_code == 200:
        with open(filename, "wb") as f:
            f.write(response.content)
        print(f"Image saved to: {filename}")
    else:
        print(f"Failed to download image. Status code: {response.status_code}")
        sys.exit(1)

if len(sys.argv) > 1 and sys.argv[1] == 'update':
    download_image()
else:
    print("Usage: python receive.py update")