

$(document).ready(function () {
    $('#video-section-banner').click(function () {
        console.log('Video section clicked.');
        $('#video-section-content').slideToggle('fast');
        
    });
    console.log('Action taken');

                   

    $('#fetcher').click(function () {
        console.log('Data fetch requested');
        //Send a request to the server;
        var requestString = 'http://localhost:5555/videos';

        $.get(requestString, function (data, status) {
            console.log(data[0])
            console.log(data[0].videoLink)

            data.forEach(function (entry) {
                console.log(entry)
                videoContent = entry.videoLink
                console.log(videoContent)
                document.getElementById('video-section-content').innerHTML += '<div class="col-6"><div id="vidFrame"><iframe id =responsiveIframe src = ' + videoContent + 'frameborder = "0" allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen = ""></iframe></div></div>'              
            });                
        });
    });

    


});
    
 
    
