

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

    $('.toggleImg').on("mouseenter", function () {
        $(".imgDetails").finish().slideToggle(400);
        console.log("test ON")
    });

    $('.toggleImg').on("mouseleave", function () {
       $(".imgDetails").finish().slideToggle(400);
        console.log("test OFF")
    });


   


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


    // CAROUSEL: Automatically load carousel images;
    console.log('Loading carousel images...')
    var requestString = 'http://localhost:5555/carouselImages';
    $.get(requestString, function (data, status) {
        var i = 0
        data.forEach(function (entry) {
            sentImage = entry.LINK
            sentImageFinal = "http://localhost:5555" + sentImage
            console.log(sentImageFinal)
            document.getElementById('carouselIndicators').innerHTML += `<li data-target="#carousel_header" data-slide-to="${i} id="target_${i}"></li>`
            console.log('i = ', i)
            if (i === 0) {
                var className = "carousel-item active"
            } else {
                var className = "carousel-item"
            }
            document.getElementById('carouselImages').innerHTML += `<div class="${className}" >`
                + ` <img src="${sentImageFinal}" class="d-block w-100" id="carousel_image_${i}">`
                + `</div>`
            i++
            // Build delete table;
            document.getElementById("carousel-section-table").innerHTML += `<tr><td>${sentImageFinal}</td><td class='tickBox'> <input type="checkbox"/></td></tr >`
        });
    });

    // Gallery: Automatically load gallery images;
    console.log('Loading gallery images...');
    var requestString = 'http://localhost:5555/images';
    $.get(requestString, function (data, status) {
        var j = 0
        data.forEach(function (entry) {
            console.log('loading images number:', j);
           
            console.log(entry);
            var caption = 'this is a caption';
            var gridImage = "http://localhost:5555" + entry.LINK
            var gridImageCaption = entry.CAPTION

            console.log('grid image = ', gridImage)
            console.log('grid image caption = ', gridImageCaption)


            if(j <= 3) {
                var classType = 'class="col-sm-6 col-md-4 col-lg-4 item"'
            } else {
                var classType = 'class="col-sm-6 col-md-4 col-lg-3 item"'
            }
            document.getElementById('populateGridImages').innerHTML += `<div ${classType}>`

                + `<a class="testMe" href=".jpg" data-lightbox="photos"><img class="toggleImg" src="${gridImage}"></a>`
                + `<p class="imgDetails">${gridImageCaption}</p>`
                + `<button class="btn btn-danger btn-sm rounded-0 imageDeleteButton editModeElement" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i> Delete Me</button>`
                + `<p class="text-warning" id="gridDeleteMsg"></p>`
                + `</div>`
            j++
        });
    });

    $('.toggleImg').hover(function () {
        console.log("test ON")
    });


    // POST VIDEO DATA TO DATA BASE;

    $("#sender").off().submit(function (event) {
        event.preventDefault();

        var input = $(this).find('input');
        var inputValue = input.val();
        var postUrl = 'http://localhost:5555/videos'
        // Get some values from elements on the page

        console.log('inputValue =', inputValue);
        console.log('url =', postUrl);
        // Send the data using post
        $.post(postUrl, { videoInput: inputValue, user: userName })
            .done(function (data) {
                $('#videoMsg').html(data).show().delay(4000).fadeOut();
            });
    });


    //POST ARTICLE DATA TO DATA BASE

    $('#articleSender').off().submit(function (event) {
        event.preventDefault();

        var input = $(this).find('input');
        var inputValue = input.val();
        console.log('to be posted:', inputValue)
        var postUrl = 'http://localhost:5555/articles'
        $.post(postUrl, { articleInput: inputValue, accountOwner: userName })
            .done(function (data) {
                $('#articleMsg').html(data).show().delay(4000).fadeOut();
            });

    });



    // POST IMAGE DATA TO DATA BASE
    $('.imageUpload').on('click', function () {
        console.log('Image uploader clicked')
        var imageType = this.id

        var file_data = $(`#${imageType}`).prop('files')[0];

        var captionId = "#" + imageType + "Caption"
        console.log('caption id = ', captionId)
        var imageCaption = $(captionId).val();

        console.log('the file  is:', file_data);
        console.log('the caption  Value is:', imageCaption);

        var imageData = new FormData();
        imageData.append('uploadedImage', file_data);
        imageData.append('uploadedImage', imageType);
        imageData.append('uploadedImage', imageCaption);

        console.log('Show Get ALL', imageData.getAll('uploadedImage'));

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
                $('.imageMsg').html(response).show().delay(3000).fadeOut(); // display success response from the server
            },
            error: function (response) {
                $('.imageMsg').html(response).show().delay(3000).fadeOut();  // display error response from the server
            }
        });
    });

    // DELETE DATA 


    // Carousel image delete button;

    $('.imageDelete').on('click', function () {
        console.log('image delete button clicked')

        var checkboxes = document.getElementsByClassName("tickBox");
        console.log(checkboxes.length)
        for (var i = 0; i < checkboxes.length; i++) {
            var checkbox = checkboxes[i];
            checkbox.onclick = function () {
                var currentRow = this.parentNode.parentNode;
                var imageValue = currentRow.getElementsByTagName("td")[0].textContent;
                var imageValueClean = imageValue.replace('http://localhost:5555', '')
                var context = 'carouselImage'
                var type = 'image'
                console.log('corresponding image: ', imageValueClean);

                
                var imageDeleteData = [];
                imageDeleteData.push(imageValueClean);
                imageDeleteData.push(userName);
                imageDeleteData.push(context);
                imageDeleteData.push(type);
                $("#deleteSelectedCarouselImages").on('click', function () {
                    console.log('Show Get ALL', imageDeleteData);

                    var deleteUrl = 'http://localhost:5555/carouselImages';
                    $.ajax({
                        url: deleteUrl + '?' + $.param({ "deleteMeCarouselImages": imageDeleteData, "deleteMeUserName": userName }),
                        type: 'DELETE',
                        success: function (response) {
                            $('#carouselDeleteMsg').html(response).show().delay(3000).fadeOut(); // display success response from the server
                        },
                        error: function (response) {
                            $('#carouselDeleteMsg').html(response).show().delay(3000).fadeOut();  // display error response from the server
                        }

                    });
                   
                });
            };
        };
    });
        

        // Video delete button
    $(document).on('click', '.videoDeleteButton', function (e) {
        console.log('Video Button found...')

        var iFrameToDelete = $(this.previousSibling)
        var iFrameString = iFrameToDelete[0].outerHTML
        console.log('iFrame to delete = ', iFrameString)
        //Need to clean out additional characters that are not in the original string;

        var iFrameStringClean = iFrameString.replace('allowfullscreen=""', 'allowfullscreen')
        var deleteUrl = 'http://localhost:5555/videos';
        $.ajax({
            url: deleteUrl + '?' + $.param({ "deleteMeVideo": iFrameStringClean }),
            type: 'DELETE',

       });
    });

      // Article delete button

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


    //Image gallery delete button;

    $(document).on('click', '.imageDeleteButton', function () {
        console.log('new message: delete button successfully identified...')
        //solution: https://stackoverflow.com/questions/38857875/javascript-code-stops-working-after-click-on-button
        console.log('this is', this)
        console.log('this.parentNode =', this.parentNode)
        var imageToDelete = $('img', this.parentNode).attr('src');
        var imageToDeleteClean = imageToDelete.replace('http://localhost:5555', '')
        console.log('the source is:', imageToDelete)
        this.parentNode.parentNode.removeChild(this.parentNode);
        var requestString = 'http://localhost:5555/images';
        $.ajax({
            url: requestString + '?' + $.param({ "deleteMeImage": imageToDeleteClean }),
            type: 'DELETE',
            success: function (response) {
                $('#gridDeleteMsg').html(response).show().delay(3000).fadeOut(); // display success response from the server;
            },
            error: function (response) {
                $('#gridDeleteMsg').html(response).show().delay(3000).fadeOut();  // display error response from the server
            }
        })

    });






});
    
 
    
