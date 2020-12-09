

$(window).scroll(testScroll);
var viewed = false;

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function testScroll() {
  if (isScrolledIntoView($(".count-numbers")) && !viewed) {
      viewed = true;
      $('.value').each(function () {
      $(this).prop('Counter',0).animate({
          Counter: $(this).text()
      }, {
          duration: 5000,
          easing: 'swing',
          step: function (now) {
              $(this).text(Math.ceil(now));
          }
      });
    });
  }
}
window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let windSpeed = document.querySelector('.wind-text');
    const temperatureSpan = document.querySelector('.temperature span');

    //alert("Open Gps to allow site work,It's based on your geolocation.");
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(position => {
          long = position.coords.longitude;
          lat = position.coords.latitude;

          const proxy = "https://cors-anywhere.herokuapp.com/";
          const api = `${proxy}https://api.darksky.net/forecast/a6fe8c98d4b231bd4dfd327eb9b4e936/${lat},${long}`;

          fetch(api)
          .then(response => {
              return response.json();
          })
          .then(data => {
            console.log(data);
            const {temperature, summary, icon} = data.currently;
            // set DOM elements from api
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;
            windSpeed.textContent = data.currently.windSpeed;
            // set formula for celsius
            let celsius = (temperature -32) * (5 / 9);
            //  set icons
            setIcons(icon, document.querySelector('.icon'));
            // change F to c
            document.getElementById("degree").textContent = Math.floor(celsius) + "°";
            let windspeed = data.currently.windSpeed * 1.852;
            document.getElementById("wind").textContent = "Wind Speed: " + Math.floor(windspeed) + " Km/h";

            var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var d = new Date();
            var monthName=months[d.getMonth()]; // "July" (or current month)
            document.getElementById("month").textContent = new Date().getDate() +" " + monthName[0]+monthName[1]+monthName[2];
           

          });

      });


    }

    function setIcons(icon, iconID)
    {
      const skycons = new Skycons({ color:"white" });  //,{"resizeClear": true}
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);
    }

});
(function ($) {
  "use strict";
  
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })

    Notification.requestPermission(result => {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification('Hey!', {
            body: 'Open Gps to allow site work,It is based on your geolocation.!',
            tag: 'Hey!'
          });
        });
      }
    });
}

  /*==================================================================
  [ Change Value room name input ]*/
  //$('#room_input').val($('#room_input').val() + 'General');
  $('#input').on("click", function(){

      var text = "01";
      var input = $('#input');
      var textLocation = $(input).val().indexOf(text);
    
      if(textLocation === -1){
        $(input).val( $(input).val() + text );
      }else{
        $(input).val( $(input).val().substr(0, textLocation) + text );
      }
    
    });

    

})(jQuery);