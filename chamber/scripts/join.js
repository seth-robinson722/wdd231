document.addEventListener("DOMContentLoaded", () => {
    // 1. Populate Hidden Form Timestamp with page load date/time
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toLocaleString();
    }

    // 2. Handle Accessible HTML Modal Dialogs
    const triggers = document.querySelectorAll(".modal-trigger");
    const closeButtons = document.querySelectorAll(".close-modal");

    triggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const modalId = trigger.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal(); // Opens dialog modally, locking keyboard tab focus natively
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const modal = e.target.closest("dialog");
            if (modal) {
                modal.close(); // Closes modal and returns keyboard focus automatically
            }
        });
    });

    // Close modal securely if clicked anywhere on the exterior backdrop
    window.addEventListener("click", (e) => {
        if (e.target.tagName === "DIALOG") {
            e.target.close();
        }
    });
});