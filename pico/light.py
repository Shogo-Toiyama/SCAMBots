from machine import Pin, ADC
import time

adc = ADC(Pin(26))

def lumens():
    adcvalue = adc.read_u16()
    lumens = (56000 - adcvalue) / 54000
    return lumens
