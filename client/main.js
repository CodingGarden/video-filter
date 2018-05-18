const API_URL = 'https://coding-garden-videos.now.sh/videos';
const videosElement = document.querySelector('#videos');
const filterInput = document.querySelector('#filter');

let allVideos;
let videoElementsById = {};

filterInput.addEventListener('keyup', filterList);

fetch(API_URL)
  .then(response => response.json())
  .then(videos => {
    allVideos = videos;
    console.log(videos);
    
    videos.forEach((video) => {
      const colDiv = document.createElement('div');
      colDiv.className = 'col-4 video';
      videoElementsById[video.id] = colDiv;

      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.href = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;

      const videoElement = document.createElement('div');
      videoElement.className = 'card ma-1';

      const img = document.createElement('img');
      
      const imageRes = video.snippet.thumbnails.standard || video.snippet.thumbnails.medium || video.snippet.thumbnails.high;

      img.src = imageRes.url;
      img.className = 'card-img-top';

      videoElement.appendChild(img);

      const mediaBody = document.createElement('div');
      mediaBody.className = 'card-body';

      videoElement.appendChild(mediaBody);

      const h5 = document.createElement('h5');
      h5.className = 'card-title';
      h5.textContent = video.snippet.title;
      mediaBody.appendChild(h5);
      
      link.appendChild(videoElement);
      colDiv.appendChild(link);
      videosElement.appendChild(colDiv);
    });

  });

function filterList(event) {
  const filter = event.target.value;
  if (allVideos) {
    const regExp = new RegExp(filter, 'gi');
    allVideos.forEach(video => {
      if (video.snippet.title.match(regExp)) {
        videoElementsById[video.id].className = 'video col-4';
        videoElementsById[video.id].style.visibility = 'visible';
        videoElementsById[video.id].style.opacity = '1';
        videoElementsById[video.id].style.width = '';
      } else {
        videoElementsById[video.id].className = 'video';
        videoElementsById[video.id].style.visibility = 'hidden';
        videoElementsById[video.id].style.opacity = '0';
        videoElementsById[video.id].style.width = '0px';
      }
    });
    
  }
}