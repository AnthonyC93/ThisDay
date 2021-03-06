//declare variables
var NASAurl ="https://api.nasa.gov/planetary/apod?api_key=54lBa2rMDnkIC43dEmrnkzykVy4aWrfLWxYDJfXO";
var NASAimg;
var nytArticles;
var date;
var picInfo;
var picTitle;
var numbersInfo;
var mm;
var dd;
var yyyy;
var savedDays;

//trigger the Materialbox that allows the picture to be clicked and opened as per Materialize Documentation
$('.materialboxed').materialbox();

//trigger sidenav and set function (as per Materialize Documentation) to hide the "X" button when the sidenav closes.
$(".sidenav").sidenav({
  onCloseEnd:function(){
    $(".clearSaved").css("display","none")
  },
});

//only trigger the tooltips if the screen size is over 1024 pixels (tooltip behaves strangely on mobile). This is the size of the biggest iPad. 
if(window.screen.width>=1024){

  $(".tooltipped").tooltip({
    enterDelay: 700,
    inDuration: 500,
  });
 }//else{

//   console.log(window.screen.width)
//   $(".showDelete").on("touchstart",function(){
//     if($(".clearSaved").css("display")==="none"){
//       // $(".clearSaved").css("display","block")
//       $(".clearSaved").fadeIn();
//     }else{
//       // $(".clearSaved").css("display","none")
//       $(".clearSaved").fadeOut(250);
//     }
//   });

//   $("li").on("touchstart",".clearSaved",function(){
//     console.log("touch been started")
//     $("#"+event.path[02].id).remove();
//     savedDays.splice(savedDays.indexOf(event.path[02].id), 1);
//     localStorage.setItem("savedDays", JSON.stringify(savedDays));
//   });
// }

// run a check for "savedDays" item inside of localStorage. 
// if it gets no result, set savedDays variable to an empty array
if (localStorage.getItem("savedDays") === null) {
  savedDays = [];
} else {
// if it returns anything other than "null": set savedDays array equal to the "savedDays" item in localStorage, check if it's empty and if it has days saved: make the links in the sidenav and show the menu button 
  savedDays = JSON.parse(localStorage.getItem("savedDays"));
  makeSavedLinks();
  if (savedDays.length > 0) {
    $("#menu").css("display", "inline-block");
  }
}

//trigger datepicker using jQuery. set input to the format desired, set maxDate to current date so user can't select tomorrow or beyond, autoClose so it closes as soon as a date is pressed, set the function for when the datepicker closes. 
$(".datepicker").datepicker({
  format: "yyyy-mm-dd",
  maxDate: new Date(),
  autoClose: true,
  onClose: function(datePicked) {

    //when the datepicker closes, hide pickDay button if not already hidden, show menu buttons, set date and break it up, run changePage function
    if($("#pickDay").attr("display")!="none"){
      // $("#pickDay").css("display", "none")
      $("#pickDay").fadeOut();
    }

    $(".btn-floating").css("display", "inline-block");

    date = $(".datepicker")[0].value;
    mm = date.split("-")[1];
    dd = date.split("-")[2];
    yyyy = date.split("-")[0];

    changePage();
  }
});

//when user clicks on the #saveDay button, the icon switches to its alternate version and checks if date is already saved before appending sidenav link and adding to localStorage    
$("#saveDay").on("click", function() {
  if ($("#saveIcon").html() === "favorite") {
    $("#saveIcon").html("favorite_border");
  } else {
    $("#saveIcon").html("favorite");
  }

  //if current Date is already saved, remove it from the "savedDays" array using splice, set the new value of "savedDays" item in localStorage, and remove the sidenav button
  if (savedDays.includes(date) === true) {
    savedDays.splice(savedDays.indexOf(date), 1);
    localStorage.setItem("savedDays", JSON.stringify(savedDays));
    $("#" + date).remove();
  } else {
  //if current date is NOT saved, add it to savedDays array, set new value of savedDays in localStorage, and append link on side
    savedDays.push(date);
    localStorage.setItem("savedDays", JSON.stringify(savedDays));
    $("#savedDays").append(
      "<li id='" + date + "' class='savedItem'><a id='"+ date +"'class='waves-effect savedDayButton'>" + readDate() + "<i class='material-icons clearSaved'>clear</i></a></li>"
    );
  }
});

$("#newDateButton").on("click", function() {
  $(".datepicker").datepicker("open");
});

$(".showDelete").on("click",function(){
  if($(".clearSaved").css("display")==="none"){
    // $(".clearSaved").css("display","block")
    $(".clearSaved").fadeIn();
  }else{
    // $(".clearSaved").css("display","none")
    $(".clearSaved").fadeOut(250);
  }
})

$("#clearAllButton").click(function(){
  $("#savedDays").empty()
  savedDays=[]
  localStorage.setItem("savedDays", JSON.stringify(savedDays));
  checkIcon();
})

//when a sidenav link is pressed, set date to the value of the html, break up the date into mm/dd/yyyy, and run changePage
$("#savedDays").on("click", "a",function() {

  if(event.target.className.includes("clearSaved")){
    $("#"+event.path[02].id).remove();
    savedDays.splice(savedDays.indexOf(event.path[02].id), 1);
    localStorage.setItem("savedDays", JSON.stringify(savedDays));
    checkIcon();
  }else{
    date = $(this).attr("id");
    mm = date.split("-")[1];
    dd = date.split("-")[2];
    yyyy = date.split("-")[0];
    
    //this is in case the user pressses a sidenav link BEFORE pressing the #pickDay button. 
    if ($("#pickDay").css("display") != "none") {
      $("#pickDay").css("display", "none");
      $(".btn-floating").css("display", "inline-block");
    }
    changePage();
  }
});

// $("#savedDays").on("click","i.clearSaved",function(){
//   console.log("clicked clearSaved!!");
//   $("#"+event.path[02].id).remove();
//   savedDays.splice(savedDays.indexOf(event.path[02].id), 1);
//   localStorage.setItem("savedDays", JSON.stringify(savedDays));
// });

//when "new trivia" button is pressed, run newNumber to call ajax and change html of #trivia
$(".numberBlock").on("click", "a", function() {
  // newNumber();
});


//call ajax and change html for trivia card
function newNumber() {

  $.ajax({
    url: "https://numbersapi.p.mashape.com/" + mm + "/" + dd + "/date",
    method: 'GET', 
    header: {
       'X-Mashape-Key': 'RR4vbj1JoFmsh2LbrfgQDRtLCUCCp1UAX7ajsnVrcTSRttqII3',
       'Content-type': 'application/x-www-form-rule coded',
       'Accept': 'application/json'
    },
    crossDomain: true,
    success: function(data) { console.log(data)}
    });
  $(".triviaCard").css("display", "block");
}

//makes NYT card and appends to page. display set to "none" by default.
function addnyt() {
  var nytCard = $("<div class='nytCard card hoverable'></div>");
  var nytContent = $("<div class='card-content nytContent'></div>");
  for (let index = 0; index < 5; index++) {
    var storySection = $("<div class='section'></div>");
    storySection.append(
      "<a id='link" +
        index +
        "' href='' target='_blank'><p id='headline" +
        index +
        "' class='flow-text'></p></a>"
    );
    storySection.append("<p id='snippet" + index + "'></p>");
    nytContent.append(storySection);
  }

  nytContent.prepend("<span class='card-title flow-text'>New York Times Articles</span>");
  nytCard.append(nytContent);
  $(".nytBlock").append(nytCard);
}

//makes links to display in sideNav. display set to "none" by default.
function makeSavedLinks() {
  for (var a = 0; a < savedDays.length; a++) {
    date=savedDays[a];
    mm = date.split("-")[1];
    dd = date.split("-")[2];
    yyyy = date.split("-")[0];
  
    $("#savedDays").append(
      "<li id='" +savedDays[a] +"' class='savedItem'><a id='"+savedDays[a] +"'class='waves-effect savedDayButton'>" +readDate() +"<i class='material-icons clearSaved'>clear</i></a></li>"
    );
  }
}

//checks icon every time page is changed. makes sure 
function checkIcon() {
  if (
    savedDays.includes(date) === true &&
    $("#saveIcon").html() === "favorite_border"
  ) {
    console.log("this needs an icon change");
    $("#saveIcon").html("favorite");
  } else if (
    savedDays.includes(date) === false &&
    $("#saveIcon").html() === "favorite"
  ) {
    console.log("icon's good");
    $("#saveIcon").html("favorite_border");
  }
}

//make date more readable
function readDate(){
  var suffix="th";
  var newMonth;
  var newDay=dd;

  //if the date is from 01-09, get rid of "0"
  if(dd.charAt(0)==="0"){
    newDay=dd.charAt(1);
  }

  //if dd is 11, 12, or 13, suffix remains as "th". If not, check second number for 1, 2, or 3 to change the suffix
  if(dd!="11"&&dd!="12"&&dd!="13"){
    switch(dd.charAt(1)){
      case "1":
      suffix="st"
      break;

      case "2":
      suffix="nd"
      break;

      case "3":
      suffix="rd"
      break;
    }
  }

  switch(mm){
    case "01":
    newMonth="January"
    break;

    case "02":
    newMonth="February"
    break;

    case "03":
    newMonth="March"
    break;
    case "04":
    newMonth="April"
    break;
    case "05":
    newMonth="May"
    break;
    case "06":
    newMonth="June"
    break;
    case "07":
    newMonth="July"
    break;
    case "08":
    newMonth="August"
    break;
    case "09":
    newMonth="September"
    break;
    case "10":
    newMonth="October"
    break;
    case "11":
    newMonth="November"
    break;
    case "12":
    newMonth="December"
    break;
  }
  
  return(newMonth+" "+newDay+suffix+", "+yyyy)
}

//the meat and potatos of the page. runs ajax calls to each API to change HTML 
function changePage() {
  $(".sidenav").sidenav("close");
  checkIcon();
  
  $("#dateDisplay").animate({opacity:0},300);
  $(".apodCard").animate({opacity:0},300);
  $(".nytCard").animate({opacity:0},300);
  $(".viewCard").animate({opacity:0},300);

  //display viewImage card and .apodCard to show loading sign. give feedback to user
  $(".viewCard").css("display","block");
  $(".apodCard").css("display", "block");
  $(".nytCard").css("display", "block");;
  
  
  //run NASA ajax to change background
  $.ajax({
    url: NASAurl + "&date=" + date,
    success: function(result) {
      console.log(result.copyright);
      // $(".preloader-wrapper").fadeIn();
      $(".material-placeholder").remove();
      $(".added").remove();

      
      if (result.media_type == "video") {
        $("#dateDisplay").css("color","black");
        $(".nasaContent").append("<div class='added video-container'><iframe id='videoPlace' src='"+result.url+"'frameborder='0' allowfullscreen></iframe></div>");
        $(".video-container").css("display","block");
      }else{
        //change background color
        $("#dateDisplay").css("color","white");
        $(".nasaContent").append("<img class='added responsive-img materialboxed' src='"+result.url+"'>");
        $('.materialboxed').materialbox();
      }
      
      $("body").css("background-image", "url(" + result.url + ")");
      
      picInfo = result.explanation;
      $(".apodInfo").html(picInfo);
      picTitle = result.title;
      $(".apodTitle").html(picTitle);

      //APOD is longest AJAX call so the page fades in when this call is done.
      $("#dateDisplay").text(readDate());
      $("#dateDisplay").animate({opacity:1},300).promise().done(function(){
        $(".apodCard").animate({opacity:1},350).promise().done(function(){
          $(".viewCard").animate({opacity:1},400);
          $(".nytCard").animate({opacity:1},400);
        });
      });
            
  
    },
    error: function(status, err){
      console.log("wow it didn't work");
    }   
  });

  //run newNumber to change trivia
  // newNumber();

  //adds 1 to day. ajax call to NYT needs to send date and date+1. this means headaches for last day of the month.
  var dayPlus = parseInt(dd) + 1;
  console.log(dayPlus);

  $.ajax({
    url:"https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=49af0056ae9e46d5a207000ad5232d9d&begin_date=" +yyyy + mm + dd + "&end_date=" + yyyy + mm + dayPlus,
    method: "GET"
  })
    .done(function(result) {
      nytArticles = result.response.docs;

      //runs for loop to change HTML of NYT card. changes headline, adds "href" attribute to <a> tag, changes <p> tag
      for (let index = 0; index < nytArticles.length; index++) {
        //CHANGE STORIES
        var story = nytArticles[index];

        if (story.document_type != "article") {
          $("#headline" + index).html(story.headline.name);
        }

        $("#link" + index).attr("href", story.web_url);
        $("#headline" + index).html(story.headline.main);
        $("#snippet" + index).html(story.snippet);
      }
      // $(".nytCard").css("display", "block");
    })
    .fail(function(err) {
      throw err;
    });
}

