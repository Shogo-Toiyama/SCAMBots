import requests
import os
import sys

# Directorio donde está el backend
script_dir = os.path.dirname(os.path.abspath(__file__))
filename = os.path.join(script_dir, "../frontend/src/downloaded_image.jpg") 

# Subimos un nivel y luego entramos a frontend
frontend_dir = os.path.abspath(os.path.join(script_dir, '..', 'frontend'))
filename = os.path.join(frontend_dir, "downloaded_image.jpg")

# Aseguramos que la carpeta frontend exista
os.makedirs(frontend_dir, exist_ok=True)

# URL de la cámara ESP32
url = "http://192.168.50.180/800x600.jpg"

def download_image():
    response = requests.get(url)
    if response.status_code == 200:
        with open(filename, "wb") as f:
            f.write(response.content)
        print(f"Image saved to: {filename}")
    else:
        print(f"Failed to download image. Status code: {response.status_code}")
        sys.exit(1)

# Si el script recibe un argumento y es 'update', descarga la imagen
if len(sys.argv) > 1 and sys.argv[1] == 'update':
    download_image()
else:
    print("Usage: python receive.py update")