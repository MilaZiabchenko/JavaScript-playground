const inputs = document.querySelectorAll('input');
const infoToHide = document.querySelector('h3');

const patterns = {
  username: /^[a-z\d]{3,12}$/i,
  password: /^[\w@-]{8,20}$/,
  email: /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  telephone: /^\+380\d{9}$/,
  slug: /^[a-z\d-]{8,20}$/,
};

const validate = (field, regex) => {
  if (regex.test(field.value)) {
    field.className = 'valid';
  } else {
    field.className = 'invalid';
  }
};

inputs.forEach(input => {
  input.addEventListener('keyup', e => {
    validate(e.target, patterns[e.target.attributes.name.value]);
    infoToHide.classList.add('hidden');
  });
});
