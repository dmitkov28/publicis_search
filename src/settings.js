import googleLogo from './img/google.svg';
import youtubeLogo from './img/youtube.svg';
import amazonLogo from './img/amazon.svg';
import walmartLogo from './img/walmart.svg';
import targetLogo from './img/target.svg';
import duckduckgoLogo from './img/duckduckgo.svg';
import instagramLogo from './img/instagram.svg';
import bingLogo from './img/bing.svg';
import ebayLogo from './img/ebay.svg';
import twitterLogo from './img/twitter.svg';
import yahooLogo from './img/yahoo.svg';
import tiktokLogo from './img/tiktok.svg';
import pinterestLogo from './img/pinterest.svg';

export const emojiFlags = require('emoji-flags');

export const LANGUAGES = [
  { name: 'English', code: 'en' },
  { name: 'German', code: 'de' },
  { name: 'Spanish', code: 'es' },
  { name: 'Italian', code: 'it' },
  { name: 'French', code: 'fr' },
  { name: 'Portuguese', code: 'pt' },

]

const amazonMarkets = [
  'United States',
  'Brazil',
  'Mexico',
  'Japan',
  'France',
  'Germany',
  'United Kingdom',
  'United Arab Emirates',
  'Singapore',
  'Japan',
  'Saudi Arabia',
  'Netherlands',
  'Spain',
  'Italy',
  'Sweden',
  'Turkey',
  'Poland',
  'India',
  'China',
  'Egypt',
  'Australia',
  'Canada',
]

const ebayMarkets = [
  'Canada',
  'Germany',
  'Switzerland',
  'United Kingdom',
  'Spain',
  'Italy',
  'France',
  'Belgium',
  'Australia',
  'Austria'
]


export const countryNames = emojiFlags.data
  .map(item => Object.assign({}, { code: item.code, emoji: item.emoji, name: item.name }))
  .sort((a, b) => a.name.localeCompare(b.name))

export const amazonCountries = countryNames.filter((c) => amazonMarkets.includes(c.name))

export const ebayCountries = countryNames.filter((c) => ebayMarkets.includes(c.name))

export const env = process.env.NODE_ENV

export const logos = {
  google: googleLogo,
  youtube: youtubeLogo,
  duckduckgo: duckduckgoLogo,
  bing: bingLogo,
  yahoo: yahooLogo,
  amazon: amazonLogo,
  ebay: ebayLogo,
  walmart: walmartLogo,
  target: targetLogo,
  instagram: instagramLogo,
  twitter: twitterLogo,
  tiktok: tiktokLogo,
  pinterest: pinterestLogo,
}
