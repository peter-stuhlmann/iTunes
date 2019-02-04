const trackList = music.map(track => {
    const index = music.indexOf(track) + 1
    const artworkUrl30 = track.artworkUrl30
    const collectionName = track.collectionName
    const trackName = track.trackName
    const artistName = track.artistName
    let trackPrice = track.trackPrice
    let currency = track.currency

    if (trackPrice == `-1`) {
        trackPrice = "Album only"
        currency = ""
    }

    const releaseDate = track.releaseDate.slice(0, 10)
    return `
      <tr>
        <td>${index}</td>
        <td><img alt="${collectionName}" title="${collectionName}" src="${artworkUrl30}"></td>
        <td>${trackName}</td>
        <td>${artistName}</td>
        <td>${trackPrice} ${currency}</td>
        <td>${releaseDate}</td>
      </tr>`
})

document.querySelector('.tracklist').innerHTML = trackList.join("")
