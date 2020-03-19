"""
NOTE: analyze(peer, model)
"""
from . import analyze


peer = "Tokyo is the one of the biggest city in the world."
model = "The capital of Japan, Tokyo, is the center of Japanese economy."
score = analyze(peer, model)
print(score)

