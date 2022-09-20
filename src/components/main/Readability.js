/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-multi-assign */
/* eslint-disable prefer-regex-literals */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-properties */
/* eslint-disable prefer-exponentiation-operator */
import React from 'react';
import Typography from '@mui/material/Typography';
import { ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/material/styles';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { CONTAINER_HEIGHT } from '../../config/constants';
import 'react-circular-progressbar/dist/styles.css';

const useStyles = makeStyles(() => ({
  typography: { textAlign: 'center' },
}));

const Readability = ({ sentence }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const getScores = function (text) {
    /*
     * To speed the script up, you can set a sampling rate in words. For example, if you set
     * sampleLimit to 1000, only the first 1000 words will be parsed from the input text.
     * Set to 0 to never sample.
     */
    const sampleLimit = 1000;

    // Manual rewrite of the textstat Python library (https://github.com/shivam5992/textstat/)

    /*
     * Regular expression to identify a sentence. No, it's not perfect.
     * Fails e.g. with abbreviations and similar constructs mid-sentence.
     */
    const sentenceRegex = new RegExp('[.?!]\\s[^a-z]', 'g');

    /*
     * Regular expression to identify a syllable. No, it's not perfect either.
     * It's based on English, so other languages with different vowel / consonant distributions
     * and syllable definitions need a rewrite.
     * Inspired by https://bit.ly/2VK9dz1
     */
    const syllableRegex = new RegExp('[aiouy]+e*|e(?!d$|ly).|[td]ed|le$', 'g');

    // Baseline for FRE - English only
    const freBase = {
      base: 206.835,
      sentenceLength: 1.015,
      syllablesPerWord: 84.6,
      syllableThreshold: 3,
    };

    const cache = {};

    const punctuation = [
      '!',
      '"',
      '#',
      '$',
      '%',
      '&',
      "'",
      '(',
      ')',
      '*',
      '+',
      ',',
      '-',
      '.',
      '/',
      ':',
      ';',
      '<',
      '=',
      '>',
      '?',
      '@',
      '[',
      ']',
      '^',
      '_',
      '`',
      '{',
      '|',
      '}',
      '~',
    ];

    const legacyRound = function (number, precision) {
      const k = Math.pow(10, precision || 0);
      return Math.floor(number * k + 0.5 * Math.sign(number)) / k;
    };

    const removePunctuation = function (text) {
      return text
        .split('')
        .filter(function (c) {
          return punctuation.indexOf(c) === -1;
        })
        .join('');
    };

    const lexiconCount = function (text, useCache, ignoreSample) {
      if (useCache && cache.lexiconCount) return cache.lexiconCount;
      if (ignoreSample !== true && sampleLimit > 0)
        text = text.split(' ').slice(0, sampleLimit).join(' ');
      text = removePunctuation(text);
      const lexicon = text.split(' ').length;
      return useCache ? (cache.lexiconCount = lexicon) : lexicon;
    };

    const getWords = function (text, useCache) {
      if (useCache && cache.getWords) return cache.getWords;
      if (sampleLimit > 0)
        text = text.split(' ').slice(0, sampleLimit).join(' ');
      text = text.toLowerCase();
      text = removePunctuation(text);
      const words = text.split(' ');
      return useCache ? (cache.getWords = words) : words;
    };

    const syllableCount = function (text, useCache) {
      if (useCache && cache.syllableCount) return cache.syllableCount;
      const syllables = getWords(text, useCache).reduce(function (a, c) {
        return a + (c.match(syllableRegex) || [1]).length;
      }, 0);
      return useCache ? (cache.syllableCount = syllables) : syllables;
    };

    const sentenceCount = function (text, useCache) {
      if (useCache && cache.sentenceCount) return cache.sentenceCount;
      if (sampleLimit > 0)
        text = text.split(' ').slice(0, sampleLimit).join(' ');
      let ignoreCount = 0;
      const sentences = text.split(sentenceRegex);
      sentences.forEach(function (s) {
        if (lexiconCount(s, true, false) <= 2) {
          ignoreCount += 1;
        }
      });
      const count = Math.max(1, sentences.length - ignoreCount);
      return useCache ? (cache.sentenceCount = count) : count;
    };

    const avgSentenceLength = function (text) {
      const avg = lexiconCount(text, true) / sentenceCount(text, true);
      return legacyRound(avg, 2);
    };

    const avgSyllablesPerWord = function (text) {
      const avg = syllableCount(text, true) / lexiconCount(text, true);
      return legacyRound(avg, 2);
    };

    const fleschReadingEase = function (text) {
      const sentenceLength = avgSentenceLength(text);
      const syllablesPerWord = avgSyllablesPerWord(text);
      return legacyRound(
        freBase.base -
          freBase.sentenceLength * sentenceLength -
          freBase.syllablesPerWord * syllablesPerWord,
        2,
      );
    };

    return fleschReadingEase(text);
  };

  const percentage = sentence.length !== 0 ? getScores(sentence) : 0;

  return (
    <>
      <Typography variant="h6" className={classes.typography}>
        {t(`Readability`)}
      </Typography>
      <ResponsiveContainer width="95%" height={CONTAINER_HEIGHT}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`} // customize text: hard, grade 5....
          styles={buildStyles({
            // Text size
            textSize: '16px',

            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
            // Colors
            pathColor: `rgba(25, 140, 99, ${percentage / 100})`,
            textColor: 'black',
            trailColor: 'whitesmoke',
          })}
          counterClockwise="true"
        />
      </ResponsiveContainer>
    </>
  );
};

export default Readability;
