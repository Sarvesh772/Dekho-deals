const yearSlot = document.getElementById('year');
if (yearSlot) {
  yearSlot.textContent = String(new Date().getFullYear());
}
