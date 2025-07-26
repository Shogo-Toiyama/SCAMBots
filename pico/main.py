from connections import connect_mqtt, connect_internet
from time import sleep
import temperature
import light
import distance

def main():
    try:
        connect_internet("HAcK-Project-WiFi-1",password="UCLA.HAcK.2024.Summer") #ssid (wifi name), pass
        client = connect_mqtt("cc45de04996e4ff5b6c2074e4965149b.s1.eu.hivemq.cloud", "scambots", "weRSCAMh@ck3rs") # url, user, pass

        while True:
            client.check_msg()
            sleep(0.1)
            updated_temp = temperature.fahrenheit()
            updated_humidity = temperature.humid()
            updated_light = light.lumens()
            updated_dist = distance.dist()
            print(updated_temp)
            client.publish('temp', str(updated_temp))
            client.publish('humidity', str(updated_humidity))
            client.publish('light', str(updated_light))
            client.publish('ultrasonic', str(updated_dist))
            sleep(1)
            

    except KeyboardInterrupt:
        print('keyboard interrupt')
        
        
if __name__ == "__main__":
    main()

