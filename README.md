# ssc-homework

## Notes

### Part 1: UI App Coding

**front-end:** I've chosen react/redux, since familiar with these.
I have completely disregarded the visual aspect and focused solely on functionality.

**back-end:** For convenience reasons I chose express.

**Important note:** Only one of each product can be purchased within one order, so as not to deplete the supply too quickly.


### Part 2: UI App Testing

For this I've chosen pytest and my own pageobject library which I'd written ~3 years ago.
Here I would like to draw your attention to the architecture - all the browser automation heavy lifting happens in the page object layer, 
the tests are merely a thin wrapper around it. This means easy migration to different testing framework (e.g. behave or robotframework),
but also the page objects can be used independently in an interactive python session like this (obviously all dependencies need to be installed
and the server and client must be running, see the 'How to use' section below):

```
(shell in the repo root dir)
$ source venv/bin/activate
$ cd e2e-tests/
$ python3
```
then
```
>>> from selenium.webdriver import Chrome
>>> from pageobjects import App
>>>
>>> wd = Chrome()
>>> app = App(webdriver=wd)
>>>
>>> app.load()
>>> order_id = app.order_products(['Tesla Model X', 'Tesla Roadster'])
>>>
>>> app.delete_order(order_id)
```


### Part 3: Delivery

Honestly, this part I've struggled the most with because of my limited dev-ops experience. On the positive note, that also means
I have plenty of room for growth in this area :) The self-imposed time pressure also played a (significant) role...

There is no docker image being deployed to AWS, merely a post-commit hook that assumes both client and server are already running.


### Part 4: Doc

You are reading it right now :)



## How to use

### prerequisites

You need to have these installed:

* node
* python3
* chrome / chromium
* chromedriver executable in the path (comes with chromium installation on Arch linux)


### installation

All commands in the repo root dir:
```
$ yarn install
$ yarn install:e2e
```

### running the app

```
$ yarn start:client
```
and
```
$ yarn start:server
```

### running the tests

```
$ yarn e2e:test
```
