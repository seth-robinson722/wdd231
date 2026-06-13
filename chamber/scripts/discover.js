// scripts/discover.js
import { itemsOfInterest } from '../data/discover.mjs';

document.addEventListener("DOMContentLoaded", () => {
    handleVisitorMessage();
    renderDiscoverCards();
    handleFooterDates();
});

// Calculate and render structural localStorage messaging configurations
function handleVisitorMessage() {
    const messageDisplay = document.getElementById("visitor-message");
    if (!messageDisplay) return;

    const lastVisit = localStorage.getItem("lastChamberVisit");
    const currentTimestamp = Date.now();

    if (!lastVisit) {
        messageDisplay.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDifference = currentTimestamp - parseInt(lastVisit);
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

        if (timeDifference < oneDayInMilliseconds) {
            messageDisplay.textContent = "Back so soon! Awesome!";
        } else {
            const calculatedDays = Math.floor(timeDifference / oneDayInMilliseconds);
            if (calculatedDays === 1) {
                messageDisplay.textContent = "You last visited 1 day ago.";
            } else {
                messageDisplay.textContent = `You last visited ${calculatedDays} days ago.`;
            }
        }
    }
    // Update structural key tracking point
    localStorage.setItem("lastChamberVisit", currentTimestamp.toString());
}

// Generate components mapping distinctly onto sequential ID areas
function renderDiscoverCards() {
    const gridContainer = document.getElementById("discover-grid-container");
    if (!gridContainer) return;

    gridContainer.innerHTML = "";

    itemsOfInterest.forEach((item) => {
        const card = document.createElement("section");
        card.className = "discover-card";
        // Assign the inline element ID style property mapping to grid-template-areas
        card.style.gridArea = item.id;

        card.innerHTML = `
            <h2>${item.title}</h2>
            <figure>
                <img src="${item.image}" alt="${item.title}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button type="button" class="learn-more-btn">Learn More</button>
        `;
        gridContainer.appendChild(card);
    });
}

// Global layout utility metrics helper routines
function handleFooterDates() {
    const yearSpan = document.getElementById("copyright-year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const lastModSpan = document.getElementById("last-modified");
    if (lastModSpan) lastModSpan.textContent = document.lastModified;
}