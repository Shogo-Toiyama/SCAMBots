from connections import connect_mqtt, connect_internet
from time import sleep
import temperature

def main():
    try:
        connect_internet("HAcK-Project-WiFi-1",password="UCLA.HAcK.2024.Summer") #ssid (wifi name), pass
        client = connect_mqtt("cc45de04996e4ff5b6c2074e4965149b.s1.eu.hivemq.cloud", "scambots", "weRSCAMh@ck3rs") # url, user, pass

        while True:
            client.check_msg()
            sleep(0.1)
            updated_temp = temperature.fahrenheit()
            updated_humidity = temperature.humid()
            print(updated_temp)
            client.publish('picow/tem', str(updated_temp))
            client.publish('picow/hum', str(updated_humidity))
            sleep(1)
            

    except KeyboardInterrupt:
        print('keyboard interrupt')
        
        
if __name__ == "__main__":
    main()
