from machine import Pin
from time import sleep
import dht

dht_pin = Pin(15)
sensor = dht.DHT11(dht_pin)

def fahrenheit():
    sensor.measure()
    updated_temp = sensor.temperature() - 3
    updated_temp = updated_temp * 9/5 + 32
    return updated_temp

def humid():
    sensor.measure()
    updated_humidity = sensor.humidity()
    return updated_humidity
