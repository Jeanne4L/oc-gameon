// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBody = document.querySelector('.modal-body');
const modalContent = document.querySelector('.content');
const modalBtn = document.querySelectorAll('.btn-signup');
const closeBtn = document.querySelector('.close');
const formData = document.querySelectorAll('.formData');
const firstName = document.querySelector('#first');
const lastName = document.querySelector('#last');
const email = document.querySelector('#email');
const birthDate = document.querySelector('#birthdate');
const qty = document.querySelector('#quantity');
const useTerms = document.querySelector('#checkbox1');
const submitBtn = document.querySelector('#submit-btn');
const eventLocation = document.getElementsByName('location');
const form = document.querySelector('form');
const invalidForm = document.querySelector('#form-error');

const validationMessage = document.createElement('h2');

// regex for input validation
const letterRegex = /^[A-Za-zÀ-ÿ']+$/u;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const nbRegex = /^\d+$/;

// display responsive menu
function displayMenu() {
	var x = document.getElementById('myTopnav');
	if (x.className === 'topnav') {
		x.className += ' responsive';
	} else {
		x.className = 'topnav';
	}
}

// launch modal form
function launchModal() {
	modalbg.classList.remove('hidden');
	modalContent.classList.remove('hide-modal-content');
	form.classList.remove('hidden');
}
// close modal
function closeModal() {
	modalContent.classList.add('hide-modal-content');
	setTimeout(() => {
		modalbg.classList.add('hidden');
	}, 400);
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));
// close modal event
closeBtn.addEventListener('click', () => {
	closeModal();
});

// check input value
function handleInputChange(elt, regex) {
	elt.addEventListener('change', (e) => {
		// if (!regex.test(e.target.value)) {
		// 	elt.classList.add('error');
		// 	elt.nextElementSibling.classList.remove('hidden');
		// } else {
		// 	elt.classList.remove('error');
		// 	elt.nextElementSibling.classList.add('hidden');
		// }
		console.log(elt);
	});
}

handleInputChange(firstName, letterRegex);
handleInputChange(lastName, letterRegex);
handleInputChange(email, emailRegex);
handleInputChange(qty, nbRegex);

// form submit event
submitBtn.addEventListener('click', () => {
	handleSubmitClick();
});

// handle form submit
function handleSubmitClick() {
	const locationValue = getSelectedLocation();
	if (
		isValidInput(firstName) &&
		isValidInput(lastName) &&
		isValidInput(email) &&
		isValidInput(birthDate) &&
		isValidInput(locationValue) &&
		isValidInput(qty) &&
		useTerms.checked === true
	) {
		handleValidForm();
	} else {
		handleInvalidForm();
	}
}

// get location checkbox
function getSelectedLocation() {
	for (let i = 0; i < eventLocation.length; i++) {
		if (eventLocation[i].checked) {
			return eventLocation[i].value;
		}
	}
	return '';
}

// check valid input
function isValidInput(input) {
	return input.value !== null && input.value !== '';
}

function changeModalStyle(maxHeight, height) {
	modalBody.style.maxHeight = maxHeight;
	modalContent.style.height = height;
}

// handle valid form
function handleValidForm() {
	// remove the form to display the validation message
	form.reset();
	form.classList.add('hidden');

	// create the validation message
	validationMessage.innerHTML = 'Merci pour<br>votre inscription';
	validationMessage.classList.add('validation-title');
	modalBody.appendChild(validationMessage);
	modalBody.appendChild(submitBtn);

	// Change the button content
	submitBtn.textContent = 'Fermer';

	// Change modal style
	changeModalStyle('70vh', '100vh');
	invalidForm.classList.add('hidden');

	// Close button event
	submitBtn.addEventListener('click', () => {
		closeModal();
		validationMessage.classList.add('hidden');

		// Change modal style
		submitBtn.textContent = "C'est parti";
		changeModalStyle('none', 'auto');
	});
}

// handle invalid form
function handleInvalidForm() {
	if (!form.classList.contains('hidden')) {
		invalidForm.classList.remove('hidden');
	}
}
