# CSS Filter Generator
## Convert from black to target hex color.

**Note:** This project is based off Barrett Sonntag's [codepen](https://codepen.io/sosuke/pen/Pjoqqp).

The problem I faced when using Barrett's version was that I had to try multiple times (sometimes 10-20 times) to get a filter value with  loss <= 1. So I created a version where the computation logic keeps spitting filter values till the time it hits a loss of less than equal to 1.

In addition to that I placed all the computation logic inside a web worker so that it doesn't put strain on the main thread.