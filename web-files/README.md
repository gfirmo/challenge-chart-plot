# Design Justifications
## General Application Rundown

The Application is a simple interface that accepts text data in a JSON (or semi-JSON) format, and produces a simple graph. It has specific considerations for data point types as established in the brief.
Before drawing the graph, the Application cleans, splits, and parses the inputted data into a dictionary format that allows it to be accessed similar to JSON accesses regardless of if input was indeed in exact JSON formatting.
The backbone of the application is built on three open source  libraries: Bootstrap, p5.js, and Vue.js.

## Data Parsing
The data parsing performed by the application comprises a great deal of the work being done in the backend. I chose to perform a rather stringent/abranging data parsing/string cleanup in order to make the input robust against small mistakes and compatible with JSON-esque formats instead of just strict JSON, including the format outlined in the brief. 
The resulting format is organized by group combinations attached to each select outlined in the "start" data point. That is, if group = {"os", "browser"} and select = { "data1, "data2"}, the individual data points will be stored in a dictionary with key " {os-instance} + {browser-instance} + data1" or equivalent for data2. This not only makes the data easy to feed into p5.js' graphing functions, it also breaks down the data into classes as opposed to simple timeline, allowing distinct data trends/lines to be handled and observed in isolation if so need be.

## Bootstrap
The usage of Bootstrap mainly boiled to backend usability and frontend consistency: Bootstrap is relatively lightweight, mobile-friendly, and has clean styling that is up to date with modern web design trends.

## p5.js
P5.js is a javascript library that is, in essence, an adaptation of the Processing graphical library for integration with Javascript. It's license is open-source and free, and while it's out of the box graphs are somewhat less visually standardized, it gives access to many other (similarly open-source) libraries and a great deal of customization outside of the graphical realm.
The usage of p5 offers multiple opportunities for expansion--it, in addition to being a very flexible graphical library, also includes many reactive and interactive methods that could elevate the program towards interactive data reading/parsing as opposed to simply static graphs.

## Vue.js
I decided to use Vue mostly due to the ease of upkeep. Vue syntax is more approachable than React.js, and requires less specific knowledge, meaning the barrier to entry for someone intending to update the Application is significantly lower. 
Vue syntax for components is in HTML, making the backend code more instantly legible and correlatable with what ends up on the front-end, and allows for small changes without need for specific knowledge outside of baseline HTML.
Vue does not offer the same variety of packages as are offered by React, but for the relatively simple goal of this Application, baseline Vue more than gets the job done.