document.addEventListener('DOMContentLoaded', function() {
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    displayVideos(videos);
});

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
