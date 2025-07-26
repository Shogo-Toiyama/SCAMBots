import base64
from pathlib import Path
from openai import OpenAI
from secrets import API_KEY

client = OpenAI(api_key=API_KEY)
image_path = Path(__file__).parent.parent / "frontend" / "src" / "downloaded_image.jpg"
speech_file_path = Path(__file__).parent / "speech.mp3"

# Image encoding, code provided
def encode_image(image_path):
    with open(image_path, "rb") as image_F:
        return base64.b64encode(image_F.read()).decode('utf-8')

base64_image = encode_image(image_path)

response = client.responses.create(
    model="gpt-4.1",
    input=[
        {
            "role": "user",
            "content": [
                { "type": "input_text", "text": "You are an intelligence analyst for a covert operations unit. Examine the image and describe exactly what is visible—nothing more, nothing less. Use concise, tactical language, as if reporting to a field agent during an active mission. Keep it brief, cold, and focused." },
                {
                    "type": "input_image",
                    "image_url": f"data:image/jpeg;base64,{base64_image}",
                },
            ],
        }
    ],
)

print("Response from supercomputer:\n", response.output_text)

with client.audio.speech.with_streaming_response.create(
    model="gpt-4o-mini-tts",
    voice="ash",
    input=response.output_text,
    speed=1.15,
    instructions="Speak in the tone of a secret task force report—solving global crises in an instant, using sharp intellect and cutting-edge robotics, all without anyone ever knowing",
) as response:
    response.stream_to_file(speech_file_path)

