# Project - Neon Asymmetry => Backend

## APIs

### Buyer

**Base URL:** `api/buyer/` <!-- keep code inline -->

#### token/

- This gets the access and refresh token using JWT auth when login is done.

#### token/refresh/

- This gets the refresh token using JWT auth.

#### register/

- This registers the buyer.

### Stock

**Base URL:** `api/stock/`

#### tshirts/

- This Lists returns all the t shirts on home page **requires authentication**.

#### `tshirts/<int:id>/`

- This returns the info about specific stock **requires authentication**.
