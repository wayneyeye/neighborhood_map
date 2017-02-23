import io
import json, jsonpickle
from yelp.client import Client
from yelp.oauth1_authenticator import Oauth1Authenticator

# read API keys
with io.open('../secrets/config_secret.json') as cred:
    creds = json.load(cred)
    auth = Oauth1Authenticator(**creds)
    client = Client(auth)

params = {
    'term': 'Starbucks',
    'lang': 'en',
    'radius_filter' : 10000,
    'category_filter' : 'coffee',
    'limit' : 25
}
response = client.search('Richardson, TX',**params)
response_json=jsonpickle.encode(response)
f = open('starbucks.json', 'w')
f.write(response_json)
f.close()