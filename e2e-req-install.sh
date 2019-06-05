#!/usr/bin/env bash

# create virtualenv
python3 -m venv venv

# activate it
source venv/bin/activate

# install dependencies
pip3 install -r requirements.txt
