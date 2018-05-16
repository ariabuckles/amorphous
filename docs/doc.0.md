# Amorphous

[![version](https://img.shields.io/npm/v/amorphous.svg)][npm]
[![license](https://img.shields.io/github/license/ariabuckles/amorphous.svg)][LICENSE]
[![build status](https://travis-ci.com/ariabuckles/amorphous.svg?branch=master)](https://travis-ci.com/ariabuckles/amorphous)
React state management, without the new concepts.

Amorphous is designed to help you get your app's state management up and
running as quickly as possible while avoiding as many pitfalls as possible
given the first constraint.

Amorphous provides you with `this.appState` and `this.setAppState`, which
work like `this.state` and `this.setState`, *but for your whole app (or
library or subtree)*.

Amorphous also provides you several tools to help avoid potential pitfalls,
and uses React's new context API to prevent having actual globals that could
poorly interact with third party code.


