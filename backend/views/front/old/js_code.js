

$(document).ready(function () {
    $('#video-section-banner').click(function () {
        console.log('Video section clicked.');
        $('#video-section-content').slideToggle('fast');
        
    });
    console.log('Action taken');

    $('#fetcher').click(function () {
        console.log('Data fetch requested');
        //Send a request to the server;
        var requestString = 'http://localhost:5555/fetch_data';

        $.get(requestString, function (data, status) {

            console.log("RESPONSE DATA: ", data);

            console.log(data.fetchDatabase[0])
            //console.log(data.url[1])
            //console.log(data.url[2])
            //console.log(data.url[3])

            vid1 = data.fetchDatabase[0].url
            vid2 = data.fetchDatabase[1].url
            vid3 = data.fetchDatabase[2].url
            vid4 = data.fetchDatabase[3].url
                      
            document.getElementById('slot1').innerHTML +=
                '<div><iframe width="560" height="315" src=' + vid1 +
            ' frameborder="0" allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen = "" ></iframe> </div>'

            document.getElementById('slot2').innerHTML +=
                '<div><iframe width="560" height="315" src=' + vid2 +
            ' frameborder="0" allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen = "" ></iframe> </div>'

            document.getElementById('slot3').innerHTML +=
                '<div><iframe width="560" height="315" src=' + vid3 +
            ' frameborder="0" allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen = "" ></iframe> </div>'

            document.getElementById('slot4').innerHTML +=
                '<div><iframe width="560" height="315" src=' + vid4 +
                ' frameborder="0" allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen = "" ></iframe> </div>'  

            });

        });
    });
    
 
    
