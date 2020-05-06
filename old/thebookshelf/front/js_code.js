

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

        $.get(requestString, function (data, status) {
            console.log(data[0])
            console.log(data[0].videoLink);

            data.forEach(function (entry) {
                console.log(entry)
                videoContent = entry.videoLink
                console.log(videoContent)
                document.getElementById('video-section-content').innerHTML += '<div class="col-6"><div id=`vidFrame`><iframe id =responsiveIframe src = ' + videoContent
                    + 'frameborder = "0" allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen = ""></iframe></div>'
                    + '<button id= "buttonD" class="btn btn-danger btn-sm rounded-0 videoDeleteButton" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>'            
            });                
        });
    });

    // POST DATA TO DATA BASE
    //see home.html
    
    // DELETE DATA IN THE DATA BASE
        // Need seperate buttons because to find data to be deleted I need to specift the content type (img etc.)

        //Image delete button;
    $(document).on('click', '.imageDeleteButton', function () {
            console.log('new message: delete button successfully identified...')
            //solution: https://stackoverflow.com/questions/38857875/javascript-code-stops-working-after-click-on-button
            console.log('this is', this)
            console.log('this.parentNode =', this.parentNode)
            dataToDelete = $('img', this.parentNode).attr('src');
            console.log('the source is:', dataToDelete)
            this.parentNode.parentNode.removeChild(this.parentNode);
            var requestString = 'http://localhost:5555/images';


    });

        // Video delete button
    $(document).on('click', '.videoDeleteButton', function (e) {
        console.log('Video Button found...')
        console.log('this is ', this)
        var dataToDelete = $('iframe', this.parentNode).attr('src');
        console.log('video data to delete:', dataToDelete);
        this.parentNode.parentNode.removeChild(this.parentNode);

        var deleteUrl = 'http://localhost:5555/videos';
        // clean out non-url elemnts of the string that get added.
        var addedShit = 'frameborder'
        var dataToDeleteClean = dataToDelete.replace(addedShit, "");

        $.ajax({
            url: deleteUrl + '?' + $.param({ "deleteMeVideo": dataToDeleteClean }),
            type: 'DELETE',   
        });
    });
    


});
    
 
    
