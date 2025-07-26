from machine import Pin, ADC
import time

adc = ADC(Pin(26))

def lumens():
    adcvalue = adc.read_u16()
    lumens = (65535 - adcvalue) / 62535
    return lumens
