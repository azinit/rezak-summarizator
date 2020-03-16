#!/usr/bin/python
# -*- coding: utf-8 -*-

from .summarizer import Summarizer

class TextTeaser:

  def __init__(self, language=None):
    self.language = language or "English"
    self.summarizer = Summarizer(language=self.language)

  def summarize(self, title, text, category = "Undefined", source = "Undefined", count = 5):
    result = self.summarizer.summarize(text, title, source, category)
    result = self.summarizer.sortSentences(result[:count])
    result = [res['sentence'] for res in result]

    return result
