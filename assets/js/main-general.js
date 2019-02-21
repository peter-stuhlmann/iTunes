const renderTracks = (filterValue) => {
    let arrayTracks = null

    const url = `https://dci-fbw12-search-itunes.now.sh/?term=${filterValue || ""}&limit=20`
    const req = new XMLHttpRequest()
    req.open("GET", url, true)
    req.responseType = "json"

    req.onload = () => {
        var jsonResponse = req.response
        arrayTracks = jsonResponse.results;

        const trackList = arrayTracks.map(track => {
            const index = arrayTracks.indexOf(track) + 1
            const preview = track.previewUrl
            const artworkUrl30 = track.artworkUrl30 || 'https://via.placeholder.com/30'
            const collectionName = track.collectionName

            let trackName = track.trackName

            if (trackName != undefined) {

                let trackNameExcerpt = track.trackName.slice(0, 45)
                let trackNameOverTheLimit = track.trackName.slice(45);

                if (trackNameOverTheLimit != ``) {
                    trackNameOverTheLimit = " ..."
                } else {
                    trackNameOverTheLimit = ""
                }

                trackName = trackNameExcerpt + trackNameOverTheLimit
            } else {
                trackName = "???"
            }

            let artistName = track.artistName

            if (artistName != undefined) {
                let artistNameExcerpt = track.artistName.slice(0, 45)
                let artistNameOverTheLimit = track.artistName.slice(45)

                if (artistNameOverTheLimit != ``) {
                    artistNameOverTheLimit = " ..."
                } else {
                    artistNameOverTheLimit = ""
                }

                artistName = artistNameExcerpt + artistNameOverTheLimit
            } else {
                artistName = "???"
            }

            let trackPrice = track.trackPrice
            let currency = track.currency

            if (currency == `USD`) {
                currency = "$"
            }

            if (trackPrice == `-1`) {
                trackPrice = "Album only"
                currency = ""
            } else if (trackPrice == `0`) {
                trackPrice = "free"
                currency = ""
            } else if (trackPrice == undefined) {
                trackPrice = "???"
                currency = ""
            }

            const trackViewUrl = track.trackViewUrl
            const releaseDate = track.releaseDate.slice(0, 10)

            //            if (artworkUrl30 || trackName || artistName || releaseDate || trackPrice || currency != undefined) {
            return `
      <tr>
        <td>${index}</td>
        <td>
            <button id="play${index}" class="play" onclick="SoS_Play(${index})"><i class="fas fa-play"></i></button>
            <button id="pause${index}" onclick="SoS_Pause(${index})"><i class="fas fa-pause"></i></button>
            <audio id="player${index}" loop><source src="${preview}"></audio>
        </td>
        <td><img alt="${collectionName}" title="${collectionName}" src="${artworkUrl30}"></td>
        <td>${trackName}</td>
        <td>${artistName}</td>
        <td class="nowrap">${releaseDate}</td>
        <td><a title="Redirect to iTunes" target="_blanc" href="${trackViewUrl}">${trackPrice}&nbsp;${currency}</a></td>
      </tr>`
            //            }
        })
        document.querySelector('.tracklist').innerHTML = trackList.join("")
    }

    req.send(null)
}

function SoS_Play(index) {
    let playerOff = document.querySelectorAll(`audio`);

    for (let i = 0; i < playerOff.length; i++) {
        playerOff[i].pause()
    }

    let buttonOff = document.querySelectorAll(`.play`);

    for (let i = 0; i < buttonOff.length; i++) {
        buttonOff[i].style.color = "rgb(165, 165, 165, .3)"
    }

    let player = document.querySelector(`#player${index}`);

    player.play();

    let button = document.querySelector(`#play${index}`).style.color = "rgb(165, 165, 165)";
}

function SoS_Pause(index) {
    let player = document.querySelector(`#player${index}`);
    let button = document.querySelector(`#play${index}`).style.color = "";
    player.pause();
}

renderTracks()

let filterInput = document.querySelector("#filter-input")

filterInput.onkeyup = function (e) {
    renderTracks(filterInput.value)
    heading(filterInput.value)
}


// Heading h1 is the filterValue
function heading(filterValue) {
    let heading = filterValue || `Search`

    document.querySelector("#heading").innerHTML = heading

    if (heading != "Search") {
        document.querySelector("#searchResults").style.display = "block"
        document.querySelector("#bestsellers").style.display = "none"
    } else {
        document.querySelector("#searchResults").style.display = "none"
        document.querySelector("#bestsellers").style.display = "block"
    }
}
heading()


// sort table (found at https://codepen.io/andrese52/pen/ZJENqp)

function sortTable(n) {
    var table,
        rows,
        switching,
        i,
        x,
        y,
        shouldSwitch,
        dir,
        switchcount = 0;
    table = document.querySelector("table");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < rows.length - 1; i++) { //Change i=0 if you have the header th a separate table.
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
