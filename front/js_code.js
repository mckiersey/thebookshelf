

$(document).ready(function () {


    console.log('Javascript loaded')

    // Simulate log in on/off edit function
    userName = 'sean'

    if (userName == 'sean') {
        $('#editModeSwitch').show()
    }

    $('#editModeSwitch').on("change", function () {
        $('.editModeElement').toggle()
    });

  

    $('#toggle-event').on("change", function (e) {
        var isClicked = $('#toggle-event').is(':checked');
        if (isClicked == true) {
            $('#modalTurnOff').show();
            $('.toggle').addClass('off');
        }
    });


    //Music players


    $('.musicLogo').click(function () {
        console.log('music logo clicked.')
        console.log(this.id)
        musicElementClicked = this.id
        $(`#${musicElementClicked}`).hide()
        if (this.id == 'deezerLogo') {
            console.log('showing deezer player')
            $('#deezerPlayer').show();
        } else if (this.id == 'spotLogo') {
            console.log('showing spot player')
            $('#spotPlayer').show()
        }
    })

    $('#openVideos').click(function () {
        console.log('Video section clicked.');
        $('#video-section-content').slideToggle('slow');
        
    });

    $('#openPodcasts').click(function () {
        console.log('Podcasts section clicked.');
        $('#podcast-section-content').slideToggle('fast');

    });

    $('#openArticles').click(function () {
        console.log('Article section clicked.');
        $('#article-section-content').slideToggle('fast');

    });

   
    $('.toggleImg').mouseenter(function () {
        $(".imgDetails").finish().slideToggle(400);
    });

    $('.toggleImg').mouseleave(function () {
        $(".imgDetails").finish().slideToggle(400);
    });

  console.log('this is the correct file.')
   


// FETCH DATA FROM DATABASE            
    //Videos

    $('#openVideos').click(function () {
        console.log('Video data fetch requested');
        //Send a request to the server;

        var requestString = 'http://localhost:5555/videos';

        $.get(requestString, function (data, status) {

            data.forEach(function (entry) {
                console.log(entry)
                videoContentIframe = entry.link
                console.log(videoContentIframe)
                document.getElementById('video-section-content').innerHTML += videoContentIframe    
                + '<button class="btn btn-danger btn-sm rounded-0 videoDeleteButton editModeElement" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>'   
            });
        });
    });
    //Articles

    $('#openArticles').click(function () {
        console.log('Article data fetch requested')
        var requestString = 'http://localhost:5555/articles';

        $.get(requestString, function (data, status) {
            console.log('Requet status is:', status)
            data.forEach(function (entry) {
                articleContent = entry.link
                console.log('article:', articleContent)
                document.getElementById('article-section-content').innerHTML += `<iframe class="articleIFrame" src="${articleContent}"></iframe>`
                    + '<button class="btn btn-danger btn-sm rounded-0 articleDeleteButton editModeElement" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>'   

            });
        });
    });


    // CAROUSEL
    $('#openCarousel').click(function () {
        console.log('carousel fetcher...')
        var requestString = 'http://localhost:5555/carouselImages';
        $.get(requestString, function (data, status) {
            console.log('data response is: ', data)
            var i= 0
            data.forEach(function (entry) {
                sentImage = entry.LINK
               // sentImageClean = sentImage.replace('./', '/');
                sentImageFinal = "http://localhost:5555" + sentImage
                console.log(sentImageFinal)
                //console.log('image: ', sentImageClean);
                document.getElementById('imageTest').innerHTML += `<li data-target="#carousel_header" data-slide-to="${i}"></li>`
                console.log('i = ', i)
                if (i === 0) {
                    var className = "carousel-item active"
                } else {
                    var className = "carousel-item"
                }
                console.log('class name is', className)
                i++



                    //`<img src="${sentImageFinal}">`;
            })
        });
    });
    // 
       //  <div class="carousel-item active">
      //       <img src="data/parissunset.jpg" class="d-block w-100" id="carousel_image">
     //    </div>


    // POST VIDEO DATA TO DATA BASE;
    $("#sender").off().submit(function (event) {
        event.preventDefault();

        // Stop form from submitting normally;

        try {
            var input = $(this).find('input');
            var inputValue = input.val();
            var postUrl = 'http://localhost:5555/videos'
            // Get some values from elements on the page

                console.log('inputValue =', inputValue);
                console.log('url =', postUrl);
            // Send the data using post
            var posting = $.post(postUrl, { videoInput: inputValue , user: userName});
                console.log('posting = ', posting);
        } catch (ex) {
            alert('An error occurred and I need to write some code to handle this!');
        }
        event.preventDefault();
        
    });

    //POST ARTICLE DATA TO DATA BASE

    $('#articleSender').off().submit(function (event) {
        event.preventDefault();
        try {
            var input = $(this).find('input');
            var inputValue = input.val();
            console.log('to be posted:', inputValue)
            var postUrl = 'http://localhost:5555/articles'
            $.post(postUrl, { articleInput: inputValue, accountOwner: userName });
            //$.post("test.php", { name: "John", time: "2pm" });

        } catch (exception) {
            alert('An error occured and I need to write code to handle it')
        }
        console.log('article submitted')
        
    });



    // POST IMAGE DATA TO DATA BASE
    $('.imageUpload').on('click', function () {
        console.log('Image uploader clicked')
        var imageType = this.id

        var file_data = $(`#${imageType}`).prop('files')[0];

        var imageData = new FormData();
        imageData.append('uploadedImage', file_data);
        imageData.append('uploadedImage', imageType);
        console.log('Show Get ALL',imageData.getAll('uploadedImage'));

        var postUrl = 'http://localhost:5555/images'


        $.ajax({
            url: postUrl, // point to server-side controller method
            dataType: 'text', // what to expect back from the server
            cache: false,
            contentType: false,
            processData: false,
            data: imageData,
            type: 'post',
            success: function (response) {
                $('#msg').html(response); // display success response from the server
            },
            error: function (response) {
                $('#msg').html(response); // display error response from the server
            }
        });
    });

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

        var iFrameToDelete = $(this.previousSibling)
        var iFrameString = iFrameToDelete[0].outerHTML
        console.log('iFrame to delete = ', iFrameString)
        //Need to clean out additional characters that are not in the original string
        var iFrameStringClean = iFrameString.replace('allowfullscreen=""', 'allowfullscreen')

       
        var deleteUrl = 'http://localhost:5555/videos';
        $.ajax({
            url: deleteUrl + '?' + $.param({ "deleteMeVideo": iFrameStringClean }),
            type: 'DELETE',

       });
    });

      // Video delete button

    $(document).on('click', '.articleDeleteButton', function (e) {
        console.log('Article delete Button found...')

        var previousSibling = $(this.previousSibling)
        console.log(previousSibling)
        var linkToDelete = previousSibling[0].src
        console.log('link to delete = ', linkToDelete)


        var deleteUrl = 'http://localhost:5555/articles';
        $.ajax({
            url: deleteUrl + '?' + $.param({ "deleteMeArticle": linkToDelete, "deleteMeUserName":userName }),
            type: 'DELETE',

        });
    });







});
    
 
    
