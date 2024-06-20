// script.js
console.log('initialize script');

const sqsPageElement = 'page-section-5f7f6af007b2df73f173ea2b';

document.addEventListener("DOMContentLoaded", function () {
    // Load date-fns from CDN
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/date-fns@2.24.0/dist/date-fns.min.js";
    script.onload = function () {
      // Use date-fns after it has loaded
      const { format } = dateFns;
      const now = new Date();
      const formattedDate = format(now, "yyyy-MM-dd HH:mm:ss");
      console.log("Current date and time:", formattedDate);
  
      // Example: Display the formatted date in an element with ID 'date-display'
      const dateDisplay = document.getElementById(sqsPageElement);
      if (dateDisplay) {
        dateDisplay.innerHTML = formattedDate;
      }
    };
    document.head.appendChild(script);
  });
