use example: https://github.com/d60/twitter_login
Please use the fingerprint generated in your environment if the token doesn't work.


## Quick Example
```python
import time
import uuid

from castle_token import CastleToken

init_time = int(time.time()*1000)
cuid = uuid.uuid4().hex

print(CastleToken(init_time, cuid).create_token())
```
