# This Day:

## Purpose:
The purpose of this website is to inform the user of a date that they would like to know about. It gives them information on the astronomy Picture of the day, histroical trivia of the date and month selected as well as New York Times articles published on that day.

## Link to website:
[Deployed Website]( https://anthonyc93.github.io/ThisDay/)

## Explanation of flow:
The website has the user select a date from the pop up Datepicker that pops up from the "Pick a Day" Button. This creates a value that is put into the NASA API to append to the website a card that populates with the information form the object called. It also changes the bacground to be the actual Astronomy Picture of the Day. The date selected by the user is stored as a value and then spliced to be used for the trivia API that we use to generate trivia. Using those same values they are used to call the NYT API. A for loop is used to generate 5 anchors for the articles to link to.

## Features:
After a date has been picked the user can interact with a number of elements on the page
  * Click the Trivia Button to generate a new trivia fact about the day
  * There are three buttons above the APOD segment:
    1. The Menu button opens up the side navigation bar
    2. The Calendar button opens up a new datepicker to pick a new date for the website to generate
    3. The Heart button will favorite the date and save it to the side navigation bar for future use
  * 
    
## API's Used:
![NASA API](https://api.nasa.gov/images/logo.png)
![Numbers API](https://www.programmableweb.com/wp-content/numbersapiscreen.png)
![NYT API](https://developer.nytimes.com/img/NYTDevLogo.svg)

## Team Members:
- **Anthony Cartagena** 
![Ant](https://pbs.twimg.com/profile_images/773176104815366144/Bb0iUK6F_400x400.jpg)

- **Miriam Hidalgo** 
![Miriam](https://avatars1.githubusercontent.com/u/22244945?s=460&v=4)

- **Ulyses Colon** 
![Ulyses](https://avatars2.githubusercontent.com/u/42300114?s=400&u=76146ef4c4b28f7a4d49bea03a6cc08d6d3169b3&v=4)

- **Sandra Nunez**
![Placeholder](https://cdn.nanalyze.com/uploads/2016/09/UBTECH-Cool-Robot-Alpha-1S.jpg)
