const trackList = music.map(track => {
    const index = music.indexOf(track) + 1
    const preview = track.previewUrl
    const artworkUrl30 = track.artworkUrl30
    const collectionName = track.collectionName
    const trackName = track.trackName
    const artistName = track.artistName
    let trackPrice = track.trackPrice
    let currency = track.currency

    if (currency == `USD`) {
        currency = "$"
    }

    if (trackPrice == `-1`) {
        trackPrice = "Album only"
        currency = ""
    }

    const releaseDate = track.releaseDate.slice(0, 10)

    return `
      <tr>
        <td>${index}</td>
        <td>
            <button id="play${index}" onclick="SoS_Play(${index})"><i class="fas fa-play"></i></button>
            <button id="pause${index}" onclick="SoS_Pause(${index})"><i class="fas fa-pause"></i></button>
            <audio id="player${index}" class="audioplayer" loop><source src="${preview}"></audio>
        </td>
        <td><img alt="${collectionName}" title="${collectionName}" src="${artworkUrl30}"></td>
        <td>${trackName}</td>
        <td>${artistName}</td>
        <td class="nowrap">${releaseDate}</td>
        <td>${trackPrice}&nbsp;${currency}</td>
      </tr>`
})

document.querySelector('.tracklist').innerHTML = trackList.join("")