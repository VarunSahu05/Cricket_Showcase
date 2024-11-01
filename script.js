// Initialize the map and set its initial view
const map = L.map('world-map').setView([20, 0], 2);  // Coordinates [20, 0] and zoom level 2 for a global view

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define player data with their hometown coordinates
const playersData = [
    {
        name: "Rohith Sharma",
        hometown: "Mumbai, India",
        coordinates: [19.0760, 72.8777],  // Coordinates for Mumbai, India
        statistics: "Tests: 3,677 runs, 53.5 average, 10 centuries ODIs: 10,031 runs, 48.7 average, 30 centuries T20Is: 3,853 runs, 31.3 average, 4 centuries",
        achievements: "World Cup Winner (2011), ICC Player of the Year (2012),World cup 2024"
    },
    {
        name: "Jusprit Bumrah",
        hometown: "Maharastra, India",
        coordinates: [19.7515, 75.7139],  // Coordinates for Mumbai, India
        statistics: "Tests: 128 wickets, 21.99 average, 8 five-wicket hauls ODIs: 134 wickets, 23.31 average, 2 five-wicket hauls T20Is: 74 wickets, 20.57 average, 1 four-wicket haul",
        achievements: "ICC Bowler of the Year (2010), Ashes Winner (2013),World cup 2024"
    },
    // Add more players as needed
];

// Add markers for each player's hometown or country
playersData.forEach(player => {
    const marker = L.marker(player.coordinates).addTo(map);
    marker.bindPopup(`
        <b>${player.name}</b><br>
        <i>${player.hometown}</i><br>
        <strong>Career Statistics:</strong> ${player.statistics}<br>
        <strong>Achievements:</strong> ${player.achievements}
    `);
});

// Handle Voting
let voteResults = {
    "Rohith Sharma": 0,
    "Jasprit Bumrah": 0,
    "Sachin Tendulkar": 0,
    "MS Dhoni": 0
    // Add more players as needed
};

document.getElementById('submit-vote').addEventListener('click', function() {
    const selectedPlayer = document.getElementById('player-select').value;
    if (voteResults[selectedPlayer] !== undefined) {
        voteResults[selectedPlayer]++;
        updateVoteResults();
    }
});

function updateVoteResults() {
    let voteResultsDiv = document.getElementById('vote-results');
    voteResultsDiv.innerHTML = '<h3>Current Votes:</h3>';
    for (const player in voteResults) {
        voteResultsDiv.innerHTML += `<p>${player}: ${voteResults[player]} votes</p>`;
    }
}

// Handle Story Submissions
let fanStories = [];

document.getElementById('submit-story').addEventListener('click', function() {
    const fanName = document.getElementById('fan-name').value;
    const fanStory = document.getElementById('fan-story').value;

    if (fanName && fanStory) {
        fanStories.push({ name: fanName, story: fanStory });
        displayFanStories();
        clearStoryForm();
    }
});

function displayFanStories() {
    let storiesDiv = document.getElementById('fan-stories');
    storiesDiv.innerHTML = '<h3>Fan Stories:</h3>';
    fanStories.forEach(story => {
        storiesDiv.innerHTML += `<p><strong>${story.name}</strong>: ${story.story}</p>`;
    });
}

function clearStoryForm() {
    document.getElementById('fan-name').value = '';
    document.getElementById('fan-story').value = '';
}

// Optional: Load match cards dynamically (from the previous top matches section)
const matchesData = [
    {
        img: "match1.jpg",
        title: "India vs Pakistan - 2007",
        description: "An epic T20 World Cup final.",
        videoSrc: "match1_highlight.mp4"
    },
    {
        img: "match2.jpg",
        title: "Australia vs England - 2005",
        description: "A thrilling Ashes encounter.",
        videoSrc: "match2_highlight.mp4"
    },
    // Add more match data here
];

function loadTopMatches() {
    const matchGrid = document.getElementById('match-grid');
    matchesData.forEach(match => {
        const matchCard = document.createElement('div');
        matchCard.className = 'match-card';
        matchCard.innerHTML = `
            <img src="${match.img}" alt="${match.title}">
            <h3>${match.title}</h3>
            <p>${match.description}</p>
            <video width="100%" controls>
                <source src="${match.videoSrc}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
        matchGrid.appendChild(matchCard);
    });
}

// Call the function to load matches when the page loads
document.addEventListener('DOMContentLoaded', loadTopMatches);

