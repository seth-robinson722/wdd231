document.addEventListener("DOMContentLoaded", () => {
    // Extract incoming parameter strings via native URLSearchParams
    const urlParams = new URLSearchParams(window.location.search);

    const firstName = urlParams.get("firstName") || "";
    const lastName = urlParams.get("lastName") || "";
    const email = urlParams.get("email") || "";
    const phone = urlParams.get("phone") || "";
    const organization = urlParams.get("organization") || "";
    const timestamp = urlParams.get("timestamp") || "N/A";

    // Inject data securely into the view DOM nodes
    document.getElementById("res-name").textContent = `${firstName} ${lastName}`.trim() || "Not Provided";
    document.getElementById("res-email").textContent = email || "Not Provided";
    document.getElementById("res-phone").textContent = phone || "Not Provided";
    document.getElementById("res-org").textContent = organization || "Not Provided";
    document.getElementById("res-time").textContent = decodeURIComponent(timestamp);
});