var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  document.getElementById(tabname).classList.add("active-tab");
  event.currentTarget.classList.add("active-link");
}
const toggleBtn = document.getElementById('mode-toggle');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('day-mode');

  
  if(document.body.classList.contains('day-mode')){
    toggleBtn.textContent = '🌙 Dark Mode';
  } else {
    toggleBtn.textContent = '☀️ Light Mode';
  }
});


