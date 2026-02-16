use example: https://github.com/d60/twitter_login


## Install via pip
```bash
pip install git+https://github.com/d60/twitter_castle_token.git
```


## Quick Example
```python
import time
import uuid

from castle_token import CastleToken

init_time = int(time.time()*1000)
cuid = uuid.uuid4().hex

print(CastleToken(init_time, cuid).create_token())
```