/****************************** video_details SECTION ******************************/

const video_details_div = document.getElementById('video_details');

const playVideo = () => {

    let data = JSON.parse(localStorage.getItem('clicked_item'));
    // console.log('data:', data);

    let iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${data.videoId}?autoplay=1`;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.setAttribute('allowfullscreen', true);
    iframe.allow = 'autoplay';

    let title = document.createElement('h4');
    title.innerText = data.snippet.title;
    title.setAttribute('class', 'title');

    let hr = document.createElement('hr');
    hr.setAttribute('class', 'hr1');

    let div1 = document.createElement('div');
    div1.setAttribute('class', 'div1');

    let channelTitle = document.createElement('p');
    channelTitle.innerText = data.snippet.channelTitle;
    channelTitle.setAttribute('class', 'channelTitle');

    let btn1 = document.createElement('button');
    btn1.innerText = 'SUBSCRIBE';
    btn1.setAttribute('class', 'btn1');

    div1.append(channelTitle, btn1);

    let description = document.createElement('p');
    description.innerText = data.snippet.description;
    description.setAttribute('class', 'description');

    video_details_div.append(iframe, title, hr, div1, description);
}


/****************************** RECOMMENDATION SECTION ******************************/

const api_key_2 = `AIzaSyDIRafJx3sVys8spVtMTC0be-5VP6PzP9U`;
const video_link = 'https://www.googleapis.com/youtube/v3/videos?';


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

        let actual_data = data.items;

        console.log('actual_data:', actual_data);
        appendRecommendation(actual_data);
    } catch (error) {
        console.log('error:', error);
    }

}
displayMovie();


const appendRecommendation = (actual_data) => {

    actual_data.forEach(el => {

        let div = document.createElement('div');
        div.setAttribute('class', 'rec-div');

        let thumbnail = document.createElement('img');
        thumbnail.setAttribute('src', el.snippet.thumbnails.high.url);
        thumbnail.setAttribute('class', 'rec-img');

        let div2 = document.createElement('div');
        div2.setAttribute('class', 'rec-div2');

        let title = document.createElement('h4');
        title.innerText = el.snippet.title;
        title.setAttribute('class', 'rec-title');

        let channel = document.createElement("p");
        channel.innerText = el.snippet.channelTitle;
        channel.setAttribute('class', 'rec-channel');

        div2.append(title, channel);
        div.append(thumbnail, div2);
        document.getElementById('recommendation').append(div);

    });
}