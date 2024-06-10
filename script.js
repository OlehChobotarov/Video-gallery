document.getElementById('add-video-form').addEventListener('submit', function(e) {
    e.preventDefault();
    addVideo();
});

function addVideo() {
    const url = document.getElementById('video-url').value;
    const author = document.getElementById('video-author').value;
    const date = document.getElementById('video-date').value;
    const tags = document.getElementById('video-tags').value.split(',');

    const video = {
        id: Date.now(),
        url: url,
        author: author,
        date: date,
        tags: tags
    };

    let videos = JSON.parse(localStorage.getItem('videos')) || [];
    videos.push(video);
    localStorage.setItem('videos', JSON.stringify(videos));

    displayVideos(videos);
    document.getElementById('add-video-form').reset();
}

function displayVideos(videos) {
    const videoList = document.getElementById('video-list');
    videoList.innerHTML = '';

    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';

        const videoContent = video.url.includes('youtube.com') ? `
            <iframe src="${video.url.replace('watch?v=', 'embed/')}" frameborder="0" allowfullscreen></iframe>
        ` : `
            <video controls>
                <source src="${video.url}" type="video/mp4">
                Ваш браузер не підтримує відео тег.
            </video>
        `;

        videoCard.innerHTML = `
            ${videoContent}
            <p>Автор: ${video.author}</p>
            <p>Дата: ${new Date(video.date).toLocaleString()}</p>
            <p class="tags">Теги: ${video.tags.join(', ')}</p>
        `;

        videoList.appendChild(videoCard);
    });
}

function searchByTags() {
    const searchTags = document.getElementById('search-tags').value.toLowerCase().split(',').map(tag => tag.trim());
    const videos = JSON.parse(localStorage.getItem('videos')) || [];

    const filteredVideos = videos.filter(video => {
        return video.tags.some(tag => searchTags.includes(tag.toLowerCase()));
    });

    displayVideos(filteredVideos);
}

function resetSearch() {
    document.getElementById('search-tags').value = '';
    displayVideos(JSON.parse(localStorage.getItem('videos')) || []);
}

document.addEventListener('DOMContentLoaded', function() {
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    displayVideos(videos);
});
