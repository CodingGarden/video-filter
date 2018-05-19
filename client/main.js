const API_URL = 'https://coding-garden-videos.now.sh/videos';
const loadingElement = document.querySelector('#loading');
const videosElement = document.querySelector('#videos');
const filterInput = document.querySelector('#filter');

let allVideos = localStorage.videos ? JSON.parse(localStorage.videos) : [];
let videoElementsById = {};

filterInput.addEventListener('keyup', filterList);

fetch(API_URL)
  .then(response => response.json())
  .then(showVideos);

function showVideos(videos) {
  localStorage.videos = JSON.stringify(videos);
  allVideos = videos;
  loadingElement.style.display = 'none';

  videos.forEach((video) => {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-xs-1 col-sm-6 col-md-4 video';
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
}

function filterList(event) {
  const filter = event.target.value;
  if (allVideos) {
    const regExp = new RegExp(filter, 'gi');
    allVideos.forEach(video => {
      if (video.snippet.title.match(regExp)) {
        videoElementsById[video.id].className = 'video video-show col-xs-1 col-sm-6 col-md-4';
      } else {
        videoElementsById[video.id].className = 'video video-hide';
      }
    });
    
  }
}