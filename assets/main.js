const trackList = music.map(track => {
    const index = music.indexOf(track) + 1
    const artworkUrl30 = track.artworkUrl30
    const collectionName = track.collectionName
    const trackName = track.trackName
    const artistName = track.artistName
    const releaseDate = track.releaseDate.slice(0, 10)
    const trackPrice = track.trackPrice
    const currency = track.currency
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