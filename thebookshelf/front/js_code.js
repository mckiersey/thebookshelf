

$(document).ready(function () {

    console.log('Javascript loaded')

    $('#video-section-banner').click(function () {
        console.log('Video section clicked.');
        $('#video-section-content').slideToggle('fast');
        
    });
    
    $('.toggleImg').mouseenter(function () {
        $(".imgDetails").finish().slideToggle(400);
    });

    $('.toggleImg').mouseleave(function () {
        $(".imgDetails").finish().slideToggle(400);
    });

  
   


     // FETCH DATA FROM DATABASE            

    $('#fetcher').click(function () {
        console.log('Data fetch requested');
        //Send a request to the server;
        var requestString = 'http://localhost:5555/videos';
        document.getElementById('insertHere').innerHTML += '<div><button id= "buttonD" class="btn btn-danger btn-sm rounded-0 deleteButton" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button></div>'

        $.get(requestString, function (data, status) {
            console.log(data[0])
            console.log(data[0].videoLink);

            var i = 0;

            data.forEach(function (entry) {
                console.log(entry)
                videoContent = entry.videoLink
                console.log(videoContent)
                document.getElementById('video-section-content').innerHTML += '<div class="col-6"><div id=`vidFrame_${i}`><iframe id =responsiveIframe src = ' + videoContent
                    + 'frameborder = "0" allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen = ""></iframe></div>'
                    + '<button id= "buttonD" class="btn btn-danger btn-sm rounded-0 deleteButton" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>'            
            });                
        });
    });

    // POST DATA TO DATA BASE
    //see home.html
    
    // DELETE DATA IN THE DATA BASE

    $(document).on('click', '.deleteButton', function () {
        console.log('new message: delete button successfully identified...')
        //solution: https://stackoverflow.com/questions/38857875/javascript-code-stops-working-after-click-on-button
        //var toBeDeleted = document.getElementById("item2").previousSibling.innerHTML;
        console.log(this.id)
        console.log(this.class)
        console.log(parentNode)

    });

  

    


});
    
 
    
