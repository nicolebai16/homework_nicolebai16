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
                    'name': 'Michelle Jiang',
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
            'title': 'Procedure'
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

        //load gallery
        $.each(pages.planners.gallery, function(key, item)
        {
            var s = "";
            s += '<div class="col-xs-12 col-sm-6">';
            s += '  <img src="' + item.image + '" class="img-thumbnail"/>';
            s += '<h2>' + item.info + '</h2>';
            s += '</div>';
            $('#gallery').append(s);
        });

        //load search venues
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
    }


/*!!!!!!!!!!!!!!!!!!!!! PROBLEM SHOOTING*/
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
    console.log("HERE")
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