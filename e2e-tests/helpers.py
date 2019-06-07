import requests
from requests.exceptions import ConnectionError

url = 'http://localhost:5000/orders'
timeout = 0.5

def poll_server():
    try:
        response = requests.get(url, timeout=timeout)
    except ConnectionError:
        raise Exception('server does not respond')
