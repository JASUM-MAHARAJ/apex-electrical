document.addEventListener("DOMContentLoaded", () => {
  // Dynamic Dispatch Status based on time of day
  const statusText = document.getElementById("dispatchStatus");
  const currentHour = new Date().getHours();

  if (statusText) {
    if (currentHour >= 7 && currentHour < 17) {
      statusText.textContent = "Day Shift Active • 3 Vans Available Now";
    } else {
      statusText.textContent = "24/7 Night Emergency Unit On Standby";
    }
  }

  // Handle Instant Callback Form
  const callbackForm = document.getElementById("callbackForm");
  if (callbackForm) {
    callbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("clientName").value;
      const issue = document.getElementById("clientIssue").value;

      alert(
        `Urgent Request Received, ${name}! Our on-duty technician has been alerted regarding "${issue}" and will call you within 10 minutes.`,
      );
      callbackForm.reset();
    });
  }
});
