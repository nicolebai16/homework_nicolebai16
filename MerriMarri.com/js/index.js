$(function(){
    var pages = {
        'home': {
            'title': 'Home'
        },
        'planners': {
            'title': 'Top Rated Planners',
            'planner': [
                {
                    'file': 'ijou.jpg',
                    'name': 'I-jou Tsai',
                    'title': 'Sunny Wedding',
                    'description': 'Deliver perfect wedding no matter how much your budget is.'
                },
                {
                    'file': 'debbie.jpg',
                    'name': 'Debbie Lu',
                    'title': 'WanderfulMarrige',
                    'description': 'Always there for you.'
                },
                {
                    'file': 'michelle.jpg',
                    'name': 'Michelle Tu',
                    'title': 'Creative Planning',
                    'description': 'Best wedding planner in SoCal.'
                },
                {
                    'file': 'sandy.jpg',
                    'name': 'Sandy Liang',
                    'title': 'A Plus Wedding',
                    'description': 'Being able to help every single couple.'
                }
            ]
        },
        'procedure': {
            'title': 'Western Wedding Programs',
            'events': [
                {
                    'file': '3.jpg',
                    'program': 'Reception',
                    'description': 'BA wedding reception is a party usually held after the completion of a marriage ceremony as hospitality for those who have attended the wedding, hence the name reception: the couple receives society, in the form of family and friends, for the first time as a married couple. Hosts provide their choice of food and drink, although a wedding cake is popular.'
                },
                {
                    'file': '2.jpg',
                    'program': 'Cocktail Hour',
                    'description': 'The cocktail hour is a chance for wedding guests to mingle and catch up with old friends and family members, enjoy some tasty food and drinks, and just chill before the party kicks into full gear. Many times, this is also when the reception area is still being readied, so guests are often confined to an area.'
                },
                {
                    'file': '1.jpg',
                    'program': 'Ceremony',
                    'description': 'The wedding ceremony is perhaps the most important part of your wedding. Most wedding ceremonies involve an exchange of marriage vows by the couple, presentation of a gift (offering, ring(s), symbolic item, flowers, money), and a public proclamation of marriage by an authority figure. '
                }             
            ]
        },
        'search': {
            'title': 'Search Venues'
        },
        'contact': {
            'title': 'Contact'
        }
    }

    function loadPages()
    {
        //load tagline
        $(document).ready(function(){
            $('#tagline').hide();
            $('#tagline').fadeIn(2000);
        });

        //load planners
        $.each(pages.planners.planner, function(key, planner){
            var s = "";
            s += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">';
            s += '   <div class="person">';
            s += '       <img src="./img/'+ planner.file + '" class="img-thumbnail img-circle"/>';
            s += '       <h3>'+ planner.name +'</h3>';
            s += '       <h4>'+ planner.title +'</h4>';
            s += '       <p>'+ planner.description +'</p>';
            s += '   </div>';
            s += '</div>';

            $('#planner').append(s);
        });

        //load procedure
        $.each(pages.procedure.events, function(key, events){
            var s = "";
            s += '<li>';
            s += '  <div class="timeline-image">';
            s += '      <img class="img-circle img-responsive" src="./img/' + events.file + '"/>';
            s += '  </div>';
            s += '   <div class="timeline-panel">';
            s += '      <div class="timeline-heading">';
            s += '          <h3 class="subheading">' + events.program + '</h3>';
            s += '      </div>';
            s += '      <div class="timeline-body">';
            s += '          <p class="text-muted">' + events.description + '</p>';
            s += '      </div>';
            s += '  </div>';
            s += '</li>';

            $('#events').prepend(s);
        });

        //Here I tried to do a hover statement, when hover on li, add or replace class=timeline-inverted
        /*$('li').mouseover(function(){
            $( this ).replaceWith('<li class="timeline-inverted">');
        } function(){
            $( this ).replaceWith('<li>'); 
        });*/
    }



    //Search map function from previous class (API call)
    $('#lookup').on('click', function(clickEvent){
        var encoded_address = encodeURIComponent($('#address').val());
        var keyword = $('#keyword').val();
        console.log($('#address').val(), encoded_address);
        //The GET request that Google expects:
        //https://maps.googleapis.com/maps/api/geocode/json?&address=360%20E%202nd%20Street%2C%20Los%20Angeles%2C%20CA
        var request_url = "https://maps.googleapis.com/maps/api/geocode/json?&address=" + encoded_address
        console.log(request_url);

        //Make an API request to the request_url and write an anonymous function to handle the response
        $.get(request_url,function(response){
            console.log(response);

            var lat = response["results"][0]["geometry"]["location"]["lat"];
            var lng = response["results"][0]["geometry"]["location"]["lng"];

            $('#lat').text(lat);
            $('#long').text(lng);

            //Step 1 - add "lat" and "lng" keys to the position object
            //         and assign their value to the lat and lng variables above
            var position = {
                lat: lat, 
                lng: lng
            };

            //Step 2 - invoke loadMap and pass it your position object as a variable
            loadMap(position, keyword);
        });
    });

    loadPages();

    //This just closes the "hamburger" menu whenever a menu item is clicked
    $('.nav a').on('click', function(){
        var _opened = $(".navbar-collapse").hasClass("collapse in");
        if (_opened === true) {
            $('.navbar-toggle').click();
        }
    });
});

//The Callback function we tell Google to call once the map script is loaded
var map;
var infowindow
function loadMap(position, keyword) {
    if(!position)
    {
        position = { lat: 34.0478914, lng: -118.2401423 };
    }
    if(!keyword)
    {
        keyword = "wedding venue";
    }
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: position
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.textSearch({location: position, radius: 500, query:keyword}, callback);
}
function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}