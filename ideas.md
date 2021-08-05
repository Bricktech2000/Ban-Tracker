# User Tracker

## ideas

- create an aggressive user tracker
- assumption: when trying to escape a ban, most people will try only one measure at a time:
  - use a VPN
  - clear browsing data
  - use a different device
  - etc.
- idea: collect a bunch of information about the banned user. if most of it matches the database, it must be the same user
- server-side only or include client-side javascript?

## information collected

- from ua:
  - operating system + version
  - browser + version
  - device model
- from ip:
  - country
  - region
  - city
  - timezone
- from cookie:
  - user id
