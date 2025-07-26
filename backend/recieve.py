import requests
import os

script_dir = os.path.dirname(os.path.abspath(__file__))

ai_dir = os.path.abspath(os.path.join(script_dir, '..', 'AI'))

os.makedirs(ai_dir, exist_ok=True)

filename = os.path.join(ai_dir, "downloaded_image.jpg")

def download_image():
    url = "http://192.168.50.180/1280x1024.jpg"
    response = requests.get(url)

    if response.status_code == 200:
        with open(filename, "wb") as f:
            f.write(response.content)
        print(f"Image saved to: {filename}")
    else:
        print("Failed to download image. Status code:", response.status_code)

while True:
    user_input = input("Enter 'update' to download a new photo or 'quit' to exit: ").strip().lower()

    if user_input == 'update':
        download_image()
    elif user_input == 'quit':
        print("Exiting the program.")
        break
    else:
        print("Invalid input. Please enter 'update' or 'quit'.")