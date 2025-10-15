const hour = document.getElementById("hour");
const min = document.getElementById("min");
const sec = document.getElementById("sec");
const countrySelect = document.getElementById("country");
const digitalTime = document.getElementById("digitalTime");
const dateDay = document.getElementById("dateDay");

let selectedZone = countrySelect.value;

// Update timezone when user selects a different country
countrySelect.addEventListener("change", () => {
  selectedZone = countrySelect.value;
});

// Update clock every second
setInterval(() => {
  const now = new Date();

  // Get localized time for the selected country
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: selectedZone,
  };
  const timeString = new Intl.DateTimeFormat("en-US", options).format(now);
  const [time, period] = timeString.split(" ");
  const [hours, minutes, seconds] = time.split(":").map(Number);

  // Clock hand rotations
  const hRotation = 30 * (hours % 12) + minutes / 2;
  const mRotation = 6 * minutes;
  const sRotation = 6 * seconds;

  hour.style.transform = `rotate(${hRotation}deg)`;
  min.style.transform = `rotate(${mRotation}deg)`;
  sec.style.transform = `rotate(${sRotation}deg)`;

  // Digital time display
  digitalTime.textContent = `${timeString}`;

  // Date & day display
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: selectedZone,
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(now);
  dateDay.textContent = formattedDate;
}, 1000);
