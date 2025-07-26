from machine import Pin, time_pulse_us
import time
import utime

trigger = Pin(3, Pin.OUT)
echo = Pin(2, Pin.IN)

def dist():
    trigger.low()
    time.sleep_us(2)
    trigger.high()
    time.sleep_us(10)
    trigger.low()

    duration = time_pulse_us(echo, 1, 30000)
    dist = (duration / 58)
    return dist