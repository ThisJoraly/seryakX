const trackList = document.getElementById("track-list");
const addTrackForm = document.getElementById("add-track-form");
const editTrackForm = document.getElementById("edit-track-form");
const audio = document.getElementById("my-audio");


let tracks = [];

function addTrack(title, artist, duration) {
    const track = {
        id: Date.now(),
        title,
        artist,
        duration,
    };

    tracks.push(track);
    renderTracks();
}

addTrackForm.addEventListener("submit", (e) => {
    e.preventDefault();
    audio.play();
    const title = document.getElementById("track-title").value;
    const artist = document.getElementById("track-artist").value;
    const duration = parseInt(document.getElementById("track-duration").value);

    if (title && artist && !isNaN(duration)) {
        addTrack(title, artist, duration);
        $("#addTrackModal").modal("hide");
    }
});

function renderTracks() {
    trackList.innerHTML = "";

    tracks.forEach((track) => {
        const trackItem = document.createElement("div");
        trackItem.className = "card mb-3";
        trackItem.innerHTML = `
      <div class="card-body">
        <h5 class="card-title"><b>${track.title}</b></h5>
        <p class="card-text">НАВАЛИЛ BA$$: ${track.artist}</p>
        <p class="card-text">${track.duration} СЕКУНД ЧИСТОГО КАЙФА</p>
        <button class="btn btn-primary edit-btn" data-id="${track.id}">✏️</button>
        <button class="btn btn-danger delete-btn" data-id="${track.id}">🗑️</button>
      </div>
    `;

        trackList.appendChild(trackItem);
    });

    const editBtns = document.querySelectorAll(".edit-btn");
    const deleteBtns = document.querySelectorAll(".delete-btn");

    editBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            const track = tracks.find((track) => track.id == id);
            if (track) {
                document.getElementById("edit-track-title").value = track.title;
                document.getElementById("edit-track-artist").value = track.artist;
                document.getElementById("edit-track-duration").value = track.duration;
                document.getElementById("edit-track-id").value = track.id;
                $("#editTrackModal").modal("show");
            }
        });
    });

    editTrackForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("edit-track-id").value;
        const title = document.getElementById("edit-track-title").value;
        const artist = document.getElementById("edit-track-artist").value;
        const duration = parseInt(document.getElementById("edit-track-duration").value);

        if (id && title && artist && !isNaN(duration)) {
            const trackIndex = tracks.findIndex((track) => track.id == id);
            if (trackIndex !== -1) {
                tracks[trackIndex].title = title;
                tracks[trackIndex].artist = artist;
                tracks[trackIndex].duration = duration;
                renderTracks();
                $("#editTrackModal").modal("hide");
            }
        }
    });

// Delete functionality
    deleteBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            const trackIndex = tracks.findIndex((track) => track.id == id);
            if (trackIndex !== -1) {
                tracks.splice(trackIndex, 1);
                renderTracks();
            }
        });
    });
    // TODO edit delete сделать нада
}

renderTracks();