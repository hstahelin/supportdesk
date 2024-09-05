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
  hours = hours % 12 || 12;

  return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
}

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export function isRoleAuthorized(userRole, roleList) {
  const roles = ["Agent", "Manager", "Team Lead", "Customer"];
  return roleList.includes(roles[userRole - 1]);
}
