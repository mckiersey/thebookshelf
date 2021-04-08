console.log('SUCCESS')
// SET GLOBAL FAKE TOKEN
const CookieToken = 'abc'
// SET GLOBAL FAKE USER ID
const user_id = 1

// PODCAST API
function SearchPodcast() {
    const CookieToken = 'abc'

    console.log('Search podcast function executed')
    PodcastSearchTerm = document.getElementsByTagName("input")[0].value; // Retrieve submitted data
    PodcastSearchTermQueryFormat = PodcastSearchTerm.replaceAll(" ", "%20")
    console.log('To search: podcast name = ', PodcastSearchTermQueryFormat)

    try {
        $.post('http://localhost:80/api/podcasts', {
            token: CookieToken,
            ProfileId: user_id,
            PodcastSearchTerm: PodcastSearchTermQueryFormat
        }).done(function (data) {
            console.log('Server response :', data)
            if (data.lenght === 0) {
                alert('Error- no podcast data available')
            } else {
                title = data[0]
                thumbnail = data[1]
                listenURL = data[2]

                document.getElementById('podThumbmail').innerHTML += `<img src=${thumbnail}></img>`
                document.getElementById('podTitle').innerHTML += title
                document.getElementById('podUrl').innerHTML += listenURL
            }
        });
    } catch (err) {
        console.log('failed to post to backend')
        console.log('Error: ' + err)
    }
}


SearchParameter = "This American Life"
SearchParameterQuery = SearchParameter.replaceAll(" ", "%20")
console.log("search parameter: ", SearchParameterQuery)
$("#podcastsAPI").on("click", function (event) {
    console.log("podcast button clicked!")
    console.log("search parameter: ", SearchParameterQuery)

    var requestString = "http://localhost/api/podcasts?search=" + SearchParameterQuery
    $.get(requestString, function (data, status) {
        console.log(data)
        title = data[0]
        thumbnail = data[1]
        listenURL = data[2]
        id = data[3]

        document.getElementById('podThumbmail').innerHTML += `<img src=${thumbnail}></img>`
        document.getElementById('podTitle').innerHTML += title
        document.getElementById('podUrl').innerHTML += listenURL
        document.getElementById('podId').innerHTML += id
    });
});



// GET PODCAST DATA
var ThisAmericanLifeList = {
    "Heavy listening but great journalism on guns and schools in the US": "https://www.thisamericanlife.org/487/harper-high-school-part-one",
    "A good one to get started with This American Life": "https://www.thisamericanlife.org/323/the-super",
    "Amazing listening": "https://www.thisamericanlife.org/664/the-room-of-requirement",
    "This one's funny": "https://www.thisamericanlife.org/515/good-guys",
    "Fanscinating look into a crucial lost opportunity for peace in Palestein": "https://www.thisamericanlife.org/570/the-night-in-question",
    "Birds and Bees": "https://www.thisamericanlife.org/557/birds-bees",
    "Captain's Log": "https://www.thisamericanlife.org/559/captains-log",
    "Poetry of Propaganda": "https://www.thisamericanlife.org/575/poetry-of-propaganda"
}

function populatePodcast(obj) {
    podcastSource = obj.getAttribute("href")
    $("#podcastPlayer").attr('src', podcastSource);
    $(".removable").slideDown("slow");

    return false;
}

function TALShow() {
    $("#TALRemovable").slideDown("slow")
}


$(".close").on("click", function (event) {
    $("#podcastPlayer").attr('src', "");
    $(".removable").slideUp("slow");

})

var videoRackList = ["https://www.youtube.com/embed/DgZPQMyzKiE",
    "https://www.youtube.com/embed/zo_nrcKUffw",
    "https://www.youtube.com/embed/BC2dRkm8ATU", "https://www.youtube.com/embed/cuqZPx0H7a0",
    "https://www.youtube.com/embed/XnRCZK3KjUY", "https://www.youtube.com/embed/CHp639vhUJg"
]
$("#videoRack").on("click", function (event) {
    videoRackList.forEach(function (item, index) {
        document.getElementById('populateVideoRack').innerHTML +=
            `<iframe class='vidRack' width="60" height="50" src="${item}" frame="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

    })


});


$(".vidRack").on("mouseover", function (event) {
    console.log('mouseover')
    $(this).width(200);
    $(this).height(150);
});
$(".vidRack").mouseout(function () {
    $(this).width(80);
    $(this).height(60);
});

//GET ARTICLE DATA
var articleList = {
    "On careers": "https://waitbutwhy.com/2018/04/picking-career.html",
    "A Supposedly Fun Thing": "https://harpers.org/wp-content/uploads/2008/09/HarpersMagazine-1996-01-0007859.pdf",
    "Consider the Lobster": "http://www.columbia.edu/~col8/lobsterarticle.pdf",
    "The Meaning of Life in 100 Spoons": "https://mckiersey.medium.com/i-just-proved-that-a-spoon-has-100-different-uses-7b505d4db33f",
    "Anthony Bourdain": "https://www.newyorker.com/magazine/1999/04/19/dont-eat-before-reading-this",
    "Covid Survivor's Log": "https://mckiersey.medium.com/log-covid-19-38f565944bcd",
    "A Love Letter (of sorts) to Paris from a Foreigner": "https://mckiersey.medium.com/my-paris-is-3d4bd3d4405b",
    "My 'Words' Project": "https://mckiersey.medium.com/words-68b6d5e89e16",
    "Searching for Failure": "https://mckiersey.medium.com/searching-for-failure-6173c120c366",
    "Il Maestro- Scorese on the art of Cinema & its death": "https://harpers.org/archive/2021/03/il-maestro-federico-fellini-martin-scorsese/",
    "The (nearly lethal) comforts of a luxury cruise ship": "https://harpers.org/wp-content/uploads/2008/09/HarpersMagazine-1996-01-0007859.pdf",
    "Consider the lobster": "http://www.columbia.edu/~col8/lobsterarticle.pdf"
}


var i = 1;
console.log(i)


for (const property in articleList) {
    console.log(i)

    var caption = property
    var articleLink = articleList[property]
    var pathArray = articleLink.split('/');
    var protocol = pathArray[0];
    var host = pathArray[2];
    var baseUrl = protocol + '//' + host;
    if (i <= 4) {
        document.getElementById('populateArticles-col1').innerHTML +=
            `<li><img height="18" width="18" src="http://www.google.com/s2/favicons?domain=${baseUrl}"/><a class="ArticleTextLinkClass" href =${articleLink} target="_blank">  ${property}</a></li>`
    } else if (i >= 4 && i <= 8) {
        document.getElementById('populateArticles-col2').innerHTML +=
            `<li><img height="18" width="18" src="http://www.google.com/s2/favicons?domain=${baseUrl}"/><a href =${articleLink} target="_blank">  ${property}</a></li>`

    } else if (i >= 8 && i <= 12) {
        document.getElementById('populateArticles-col3').innerHTML +=
            `<li><img height="18" width="18" src="http://www.google.com/s2/favicons?domain=${baseUrl}"/><a href =${articleLink} target="_blank">  ${property}</a></li>`
    }
    i += 1
    console.log('value of i:' + i)
}