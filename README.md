## Setup
- Install and/or open Postman
  
- Make a post request to ```https://niklas.serveo.net/register``` 

with body:

{\
    "eventType": "New payment", \
    "callbackUrl": "Your callback URL",\
    "amount": the amount of the payment\
    }

You can also see active events by making a get request to
- "https://niklas.serveo.net/ping"

Or delete an active event with the callback Url by making a delete request to
- "https://niklas.serveo.net/unregister/'callbackUrl'"
