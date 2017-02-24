# Neighborhood Map APP
### Find Starbucks in Your Area!
*Author: Wayne Ye*
*Date: 02/22/2017*

#### Where are the data from
Markers' data are from [Yelp API.](https://www.yelp.com/developers/documentation/v2/overview)
The requests are run using the python methods. Since the response data is overwhelming. I simplify the response data and tidy them up as a JSON, which will be requested as a .js.


#### How to run
[Link to the page](https://wayneyeye.github.io/neighborhood_map/) Should be straightforward to use.
The map initially opens a google map with markers representing Starbucks stores near [Richardson, TX](https://en.wikipedia.org/wiki/Richardson,_Texas). Click the 'Search' button on the top right corner will toggle a sidebar for filtering purpose. Input any string in the box will try to match the addresses (road, zipcode, city) with any of the 40 prepopulated Starbucks stores data. The results will change dynamically as you input the keywords. Click the apply will mark the matched result on the map. Click the result in the list will animate the corresponding marker on the map and display detailed address and phone number just below the search box. Click the marker will pop an infowindow, which contains any place of interest around the spot, up to 8. The data is asynchronously requested from the [Foursqaure API.](https://developer.foursquare.com/). Click on the place name will redirect to their official web page, if any. In case of any corrupt connection, there will be an error message displayed in the DOM. Most of the animations on my API are based on the use of [Knockoutjs](http://knockoutjs.com/).

Please feel free to let me know if you have any comments!

#### Credits to
- https://github.com/lacyjpr/neighborhood
- https://github.com/wayneyeye/ud864
