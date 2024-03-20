## Setup
- Install and/or open Postman
  
- Make a post request to ```http://localhost:8000/register``` (was deployed and functional, but back on localhost)

with body:

{
    "eventType": "New payment", 
    "callbackUrl": "Your callback URL",
    "amount": the amount of the payment
    }

You can also see active events by making a get request to
- "http://localhost:8000/ping"

Or delete an active event with the callback Url by making a delete request to
- "http://localhost:8000/unregister/'callbackUrl'"
