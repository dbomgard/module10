const btn = document.querySelector(".btn")
const firstIcon = document.getElementById("first_icon")
const secondIcon = document.getElementById("second_icon")

btn.addEventListener('click', () => {
  secondIcon.classList.toggle("hidden")
  firstIcon.classList.toggle('hidden')
})