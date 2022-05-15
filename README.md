# Bevly
Link to live app: https://acheng-01.github.io/Bevly/

## Overview
Bevly is an app that allows users to search up cocktail recipes using an open API called cocktailDB. Users are able to search by a type of cocktail through the search bar. Alternatively, a random cocktail may be chosen should the user not have one in mind.

![](https://github.com/acheng-01/Bevly/blob/main/Bevly-Sample.gif)

This was my second mini application from the Thinkful Bootcamp, created using HTML, CSS, and Javascript. jQuery is used as the library.

## Limitations
For some of the longer search results, users might need to scroll all the way to the bottom to find what they need.

To expand this app, a page navigation feature could be added, limiting each page to display only a handful of results. This way, if a result is near the end, users can click on a higher page number to find it directly without long scroll sessions. Sorting based on certain criteria is another feature that could be implemented.

Stylistically, the images of each cocktail also vary by dimensions and quality. Some of them leave a gap in the page. Unfortunately, no good solution was found for this without warping/stretching the image itself. For me this was a sacrificial styling decision to preserve the image quality. (This is not an issue when viewing the application on mobile though.)

## Usage
The application can return cocktail recipes in one of two ways: using the search bar or using the 'I'm not sure what I want...' button (the latter options chooses a cocktail recipe at random).

Search can be done with a specific cocktail name or with one term in a bigger name (i.e. 'Vodka').

## Local Installation and Run Guide
To run this app locally on your machine:
1. Fork this repository over and download it either with git or by zip.
2. Right click index.html and open with your default browser.
