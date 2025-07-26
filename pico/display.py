from machine import Pin, I2C
import ssd1306

def print_message(user_input):
    WIDTH =128 
    HEIGHT= 64
    i2c=I2C(0,scl=Pin(1),sda=Pin(0),freq=200000)
    oled = ssd1306.SSD1306_I2C(WIDTH,HEIGHT,i2c)
    oled.fill(0)
    oled.text(user_input, 0, 0)
    oled.show()