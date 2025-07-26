from machine import Pin
from time import sleep
import dht

dht_pin = Pin(15)
sensor = dht.DHT11(dht_pin)

while True:
    try:
        sensor.measure()
        temp = sensor.temperature() - 3
        humidity = sensor.humidity()
        temp = temp*9/5 + 32
        print("Temperature: {:.2f}°F".format(temp))
        print("Humidity: {:.1f}%".format(humidity))
        

    except RuntimeError as error:
        print("Error")

    sleep(1)
