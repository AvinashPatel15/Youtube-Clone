/******************************1. searchVideos ******************************/

const API_KEY = `AIzaSyCeEYA7Ud5kXe4rgbRIxQH2H82q_rz8fxE`;

const container_div = document.getElementById('container');

const api_key_2 = `AIzaSyDIRafJx3sVys8spVtMTC0be-5VP6PzP9U`;
const video_link = 'https://www.googleapis.com/youtube/v3/videos?';

const channel_link = 'https://www.googleapis.com/youtube/v3/channels?'

/****************************** FETCH URL FOR SEARCH ******************************/

const searchVideos = async() => {

    try {
        const query = document.getElementById('query').value;

        const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}&key=${API_KEY}`);

        const data = await res.json();

        const actual_data = data.items;

        appendVideos(actual_data);

        console.log('actual_data:', actual_data);

    } catch (error) {
        console.log('error:', error);
    }
}

/****************************** APPENDING THE VIDEOS IN SEARCH ******************************/

const appendVideos = (actual_data) => {

    container_div.innerHTML = null;

    actual_data.forEach(({ snippet, id }) => {

        const title = snippet.title;

        const videoId = id.videoId;

        const thumbnail = snippet.thumbnails.high.url;

        const channel_name = snippet.channelTitle;

        const div = document.createElement('div');

        let data = {
            videoId,
            snippet,
        }

        // div.addEventListener('click' function(){}) 1.WAY

        div.onclick = () => {

            storeClickedvideo(data);

        }


        const img = document.createElement('img');
        img.src = thumbnail;

        const title_html = document.createElement('h4');
        title_html.innerText = title;

        const channel_html = document.createElement('p');
        channel_html.innerText = channel_name;


        div.append(img, title_html, channel_name);
        document.getElementById('container').append(div);
    });
}

function storeClickedvideo(data) {

    localStorage.setItem('clicked_item', JSON.stringify(data));
    window.location.href = 'video.html';
}

/****************************** FETCH URL FOR HOME PAGE VIDEOS ******************************/

const displayMovie = async() => {

    try {

        let res = await fetch(video_link + new URLSearchParams({
            key: api_key_2,
            part: 'snippet',
            chart: 'mostPopular',
            maxResults: 50,
            regionCode: 'IN'
        }));

        let data = await res.json();
        data.items.forEach(item => {
            getChannelIcon(item);
        })
        console.log('data:', data);
    } catch (error) {
        console.log('error:', error);
    }

}
displayMovie();

/****************************** FETCH URL FOR CHANNEL ICON ******************************/

const getChannelIcon = (video_logo) => {

    fetch(channel_link + new URLSearchParams({
            key: api_key_2,
            part: 'snippet',
            id: video_logo.snippet.channelId,
        }))
        .then(res => res.json())
        .then(data => {
            video_logo.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            console.log('video_logo:', video_logo);
            appendVideosOnHome(video_logo);
        });
}

// fetch(video_link + new URLSearchParams({
//         key: api_key_2,
//         part: 'snippet',
//         chart: 'mostPopular',
//         maxResults: 1000,
//         regionCode: 'IN'
//     }))
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//     })

/****************************** APPENDING THE VIDEOS IN HOME PAGE ******************************/

const appendVideosOnHome = (video_logo) => {

    const video = document.createElement('div');
    video.setAttribute('class', 'video');

    const thumbnail = document.createElement('img');
    thumbnail.setAttribute('src', video_logo.snippet.thumbnails.high.url);
    thumbnail.setAttribute('class', 'video-img');

    const content = document.createElement('div');
    content.setAttribute('class', 'content');

    const channel_icon = document.createElement('img');
    channel_icon.setAttribute('src', video_logo.channelThumbnail);
    channel_icon.setAttribute('class', 'channel-icon');

    const info = document.createElement('div');
    info.setAttribute('class', 'info');

    const title = document.createElement('h4');
    title.innerText = video_logo.snippet.title;
    title.setAttribute('class', 'title');

    const channel_name = document.createElement('p');
    channel_name.innerText = video_logo.snippet.channelTitle;
    channel_name.setAttribute('class', 'channel-name')

    info.append(title, channel_name)
    content.append(channel_icon, info);
    video.append(thumbnail, content);
    document.getElementById('container').append(video);
}

/****************************** APPENDING THE VIDEOS IN HOME PAGE ******************************/

// const appendVideosOnHome = (data) => {

//     container_div.innerHTML += `
//     <div class="video" onclick="ClickedVideo()">
//             <img src="${data.snippet.thumbnails.high.url}" alt="" class="thumbnail">
//             <div class="content">
//                 <img src="${data.channelThumbnail}" alt="" class="channel-icon">
//                 <div class="info">
//                     <h4 class="title">${data.snippet.title}</h4>
//                     <p class="channel-name">${data.snippet.channelTitle}</p>
//                 </div>
//             </div>
//         </div>
//     `;

// }