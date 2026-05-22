document.addEventListener("DOMContentLoaded", () => {
    // 1. Dynamic Footer Metadata Configuration
    const copyrightYearElement = document.getElementById("copyright-year");
    const lastModifiedElement = document.getElementById("last-modified");

    if (copyrightYearElement) {
        copyrightYearElement.textContent = new Date().getFullYear();
    }
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }

    // 2. Responsive Mobile Navigation Management
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu").querySelector("ul");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        menuToggle.textContent = navMenu.classList.contains("open") ? "❌" : "☰";
    });

    // 3. Asynchronous Directory Data Parsing & Injections
    const directoryContainer = document.getElementById("directory-container");
    const gridBtn = document.getElementById("grid-btn");
    const listBtn = document.getElementById("list-btn");

    const membersUrl = "data/members.json";

    async function fetchAndRenderMembers() {
        try {
            const response = await fetch(membersUrl);
            if (!response.ok) {
                throw new Error(`HTTP fetch fault error status: ${response.status}`);
            }
            const data = await response.json();
            renderDirectory(data.members);
        } catch (error) {
            console.error("Failed to load business parameters directory records:", error);
            directoryContainer.innerHTML = `<p class="error-message">Unable to load business profiles record array entries at this time.</p>`;
        }
    }

    function renderDirectory(membersArray) {
        directoryContainer.innerHTML = ""; // Empty baseline wrapper element text

        membersArray.forEach(member => {
            const card = document.createElement("section");
            card.classList.add("member-card");

            // Mapping structural level keys to semantic text
            let membershipText = "Member";
            let badgeClass = "badge-member";
            if (member.membershipLevel === 3) {
                membershipText = "Gold";
                badgeClass = "badge-gold";
            } else if (member.membershipLevel === 2) {
                membershipText = "Silver";
                badgeClass = "badge-silver";
            }

            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} branding logo profile" loading="lazy">
                <h3>${member.name}</h3>
                <p class="tagline">"${member.tagline}"</p>
                <p class="address">📍 ${member.address}</p>
                <p class="phone">📞 ${member.phone}</p>
                <p class="website"><a href="${member.website}" target="_blank" rel="noopener noreferrer">🌐 Visit Site</a></p>
                <span class="membership-badge ${badgeClass}">${membershipText} Level</span>
            `;
            directoryContainer.appendChild(card);
        });
    }

    // 4. View Presentation Toggles (Grid vs List Layout Hooks)
    gridBtn.addEventListener("click", () => {
        directoryContainer.classList.add("grid-view");
        directoryContainer.classList.remove("list-view");
        gridBtn.classList.add("active-view");
        listBtn.classList.remove("active-view");
    });

    listBtn.addEventListener("click", () => {
        directoryContainer.classList.add("list-view");
        directoryContainer.classList.remove("grid-view");
        listBtn.classList.add("active-view");
        gridBtn.classList.remove("active-view");
    });

    // Initialize Page Execution
    fetchAndRenderMembers();
});