// export function formatDate(date) {
//   const dateObj = new Date(date);
//   return dateObj.toISOString().split("T")[0];
// }

export function formatDate(date) {
  const dateObj = new Date(date);

  const year = dateObj.getFullYear();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[dateObj.getMonth()];

  const day = String(dateObj.getDate()).padStart(2, "0");

  let hours = dateObj.getHours();
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format

  return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
}

export function scrollToTop() {
  window.scrollTo({
    top: 0, // Scroll to the top of the page
    behavior: "smooth", // Optional: Animate the scrolling
  });
}
