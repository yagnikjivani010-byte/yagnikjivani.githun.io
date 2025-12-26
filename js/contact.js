emailjs.init("SVorwu6X3p-2MbXmr"); // 🔴 replace this

const form = document.getElementById("contactForm");
const modal = document.getElementById("successModal");
const loader = document.querySelector(".loader");
const btnText = document.querySelector(".btn-text");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors();

  const firstName = getValue("firstName");
  const lastName = getValue("lastName");
  const email = getValue("email");
  const description = getValue("description");

  let valid = true;

  if (!firstName) error("firstName", "First name required"), valid = false;
  if (!lastName) error("lastName", "Last name required"), valid = false;
  if (!email) error("email", "Email required"), valid = false;
  if (!description) error("description", "Message required"), valid = false;

  if (!valid) return;

  btnText.textContent = "Sending...";
  loader.style.display = "inline-block";

  emailjs.send("service_f9ba8ko", "template_s8gcc5o", {
    firstName,
    lastName,
    email,
    message: description
  }).then(() => {
    loader.style.display = "none";
    btnText.textContent = "Send Message";
    modal.style.display = "flex";
    form.reset();
  });
});

function getValue(id) {
  return document.getElementById(id).value.trim();
}

function error(id, msg) {
  document.getElementById(id).nextElementSibling.textContent = msg;
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(e => e.textContent = "");
}

function closeModal() {
  modal.style.display = "none";
}
