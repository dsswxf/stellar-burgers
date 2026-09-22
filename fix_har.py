import json

with open('tests/hars/network.har', 'r') as f:
    text = f.read()

# find the first ]}} and truncate
idx = text.find(']}}')
if idx != -1:
    text = text[:idx+3]

with open('tests/hars/network.har', 'w') as f:
    f.write(text)

