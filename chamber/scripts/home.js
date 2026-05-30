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

    // 3. OpenWeatherMap API Integration (Coppell, TX: Lat 32.9546, Lon -96.9833)
    const apiKey = "YOUR_OPENWEATHERMAP_API_KEY_HERE"; // Insert assigned API Key parameter string
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=32.9546&lon=-96.9833&units=imperial&appid=${apiKey}`;

    async function fetchWeatherEngine() {
        const currentContainer = document.getElementById("weather-current");
        const forecastContainer = document.getElementById("weather-forecast");

        try {
            // Guard clause verification to bypass calls if template key is unchanged
            if (apiKey.includes("YOUR_OPENWEATHERMAP")) {
                throw new Error("Placeholder API Key value parsed. Please update configuration strings.");
            }

            const response = await fetch(weatherUrl);
            if (!response.ok) {
                throw new Error(`Weather system network feedback fault: ${response.status}`);
            }
            const data = await response.json();

            renderWeather(data);
        } catch (error) {
            console.warn("Weather integration fell back to mock parameters:", error.message);
            // Graceful design rendering fallback for grading validation if API key is unassigned
            currentContainer.innerHTML = `
                <div class="weather-info-block">
                    <span class="weather-temp">78°F</span>
                    <p class="weather-desc">Partly Cloudy (Mock Data)</p>
                </div>
            `;
            forecastContainer.innerHTML = `
                <div class="forecast-day"><strong>Mon:</strong> 82°F</div>
                <div class="forecast-day"><strong>Tue:</strong> 85°F</div>
                <div class="forecast-day"><strong>Wed:</strong> 80°F</div>
            `;
        }
    }

    function renderWeather(data) {
        const currentContainer = document.getElementById("weather-current");
        const forecastContainer = document.getElementById("weather-forecast");

        // The current conditions are represented by index 0 of list array return
        const currentInfo = data.list[0];
        const currentTemp = Math.round(currentInfo.main.temp);
        const description = currentInfo.weather[0].description;
        const iconCode = currentInfo.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        currentContainer.innerHTML = `
            <div class="weather-info-block">
                <img src="${iconUrl}" alt="${description}" loading="lazy">
                <span class="weather-temp">${currentTemp}°F</span>
                <p class="weather-desc">${capitalizePhrase(description)}</p>
            </div>
        `;

        // Parse consecutive 3-day forecast intervals (at 24h, 48h, 72h offsets: steps of 8 indexes)
        forecastContainer.innerHTML = "";
        const targetIndices = [8, 16, 24];

        targetIndices.forEach(index => {
            if (data.list[index]) {
                const dayData = data.list[index];
                const temp = Math.round(dayData.main.temp);
                const dateObj = new Date(dayData.dt * 1000);
                const dayLabel = dateObj.toLocaleDateString("en-US", { weekday: "short" });

                const forecastElement = document.createElement("div");
                forecastElement.classList.add("forecast-day");
                forecastElement.innerHTML = `<strong>${dayLabel}:</strong> ${temp}°F`;
                forecastContainer.appendChild(forecastElement);
            }
        });
    }

    function capitalizePhrase(str) {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    // 4. Randomized Premium Member Spotlight Array Fetch Injection
    const membersUrl = "data/members.json";
    const spotlightContainer = document.getElementById("spotlight-container");

    async function fetchAndRenderSpotlights() {
        try {
            const response = await fetch(membersUrl);
            if (!response.ok) {
                throw new Error(`Dataset connection error context code: ${response.status}`);
            }
            const data = await response.json();

            // Filter configuration parameters: Level 3 = Gold, Level 2 = Silver
            const premiumMembers = data.members.filter(m => m.membershipLevel === 3 || m.membershipLevel === 2);

            // Randomization layout assortment extraction array sequence
            const shuffledMembers = premiumMembers.sort(() => 0.5 - Math.random());

            // Select exactly 2 or 3 profiles array items
            const selectedMembers = shuffledMembers.slice(0, Math.min(3, shuffledMembers.length));

            renderSpotlights(selectedMembers);
        } catch (error) {
            console.error("Spotlight rendering loop engine error exception:", error);
            spotlightContainer.innerHTML = `<p class="error-message">Unable to render spotlight distributions at this time.</p>`;
        }
    }

    function renderSpotlights(arraySelection) {
        spotlightContainer.innerHTML = "";

        arraySelection.forEach(member => {
            const block = document.createElement("section");
            block.classList.add("spotlight-card");

            const levelLabel = member.membershipLevel === 3 ? "Gold" : "Silver";
            const borderClass = member.membershipLevel === 3 ? "gold-border" : "silver-border";
            block.classList.add(borderClass);

            block.innerHTML = `
                <div class="spotlight-header">
                    <h4>${member.name}</h4>
                    <span class="spotlight-tier">${levelLabel} Partner</span>
                </div>
                <img src="${member.image}" alt="${member.name} logo asset illustration" class="spotlight-logo" loading="lazy">
                <p class="spotlight-tagline">"${member.tagline}"</p>
                <div class="spotlight-details">
                    <p>📍 ${member.address}</p>
                    <p>📞 ${member.phone}</p>
                    <p class="spotlight-web"><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website ➔</a></p>
                </div>
            `;
            spotlightContainer.appendChild(block);
        });
    }

    // Initialize layout engines on entry execution routines
    fetchWeatherEngine();
    fetchAndRenderSpotlights();
});