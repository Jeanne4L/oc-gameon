// DOM Elements
const modalOverlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const modalBtn = document.querySelectorAll('.btn-signup');
const closeCrossBtn = document.querySelector('.close');
const firstName = document.querySelector('#first');
const lastName = document.querySelector('#last');
const email = document.querySelector('#email');
const birthDate = document.querySelector('#birthdate');
const qty = document.querySelector('#quantity');
const useTerms = document.getElementsByName('usesterms');
const submitBtn = document.querySelector('#submit-btn');
const form = document.querySelector('#reserve');

const validationMessageContainer = document.createElement('div');
const validationMessage = document.createElement('h2');
const closeModalBtn = document.createElement('button');

// regex for input validation
const onlyLetterRegex = /^[A-Za-zÀ-ÿ' -]+$/u;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const nbRegex = /^\d+$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const inputValidationHandlers = {
	first: function (elt) {
		return onlyLetterRegex.test(elt.value);
	},
	last: function (elt) {
		return onlyLetterRegex.test(elt.value);
	},
	email: function (elt) {
		return emailRegex.test(elt.value);
	},
	birthdate: function (elt) {
		return dateRegex.test(elt.value);
	},
	quantity: function (elt) {
		return nbRegex.test(elt.value);
	},
	location: function (elt) {
		return onlyLetterRegex.test(elt.value);
	},
	useterms: function (elt) {
		return elt.checked;
	},
};

// display responsive menu
const displayMenu = () => {
	var x = document.getElementById('header');
	if (x.className === 'header') {
		x.className += ' responsive';
	} else {
		x.className = 'header';
	}
};

// launch modal form
const launchModal = () => {
	modalOverlay.classList.remove('hidden');
	modal.classList.remove('hide-modal-content');
	form.classList.remove('hidden');

	modal.style.height = 'auto';
	modalContent.style.maxHeight = 'none';
};

// close modal
const closeModal = () => {
	modal.classList.add('hide-modal-content');
	setTimeout(() => {
		modalOverlay.classList.add('hidden');
		validationMessageContainer.classList.add('hidden');
	}, 400);
};

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// close modal event
closeCrossBtn.addEventListener('click', () => {
	closeModal();
});
closeModalBtn.addEventListener('click', () => {
	closeModal();
});

// check input value and submit form
const validateInput = () => {
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		let isValidForm = true;
		const formElts = form.elements;

		Object.entries(inputValidationHandlers).forEach(([key, value]) => {
			let formElt = formElts[key];

			if (!inputValidationHandlers[key](formElt)) {
				displayError(formElt, key);
				isValidForm = false;
			} else {
				removeError(formElt, key);
			}
		});

		if (isValidForm) {
			handleValidForm();
		}
	});
};
validateInput();

// Display and hide form errors
const displayError = (elt, key) => {
	if (elt.id === key) {
		elt.classList.add('error');
		elt.focus();
	}
	document.querySelector(`#${key}-error`).classList.remove('hidden');
};
const removeError = (elt, key) => {
	if (elt.id === key) {
		elt.classList.remove('error');
	}
	document.querySelector(`#${key}-error`).classList.add('hidden');
};

// Change validation modal height
const changeModalStyle = (maxHeight, height) => {
	modalContent.style.maxHeight = maxHeight;
	modal.style.height = height;
};

// Create validation message
const createValidationMessage = () => {
	validationMessage.innerHTML = 'Merci pour<br>votre inscription';
	closeModalBtn.textContent = 'Fermer';

	validationMessageContainer.classList.add('modal-validation-container');
	validationMessage.classList.add('validation-title');
	closeModalBtn.classList.add('btn', 'btn--red');

	modalContent.appendChild(validationMessageContainer);
	validationMessageContainer.appendChild(validationMessage);
	validationMessageContainer.appendChild(closeModalBtn);
};

// handle valid form
const handleValidForm = () => {
	// remove the form
	form.reset();
	form.classList.add('hidden');

	// display validation message
	if (validationMessageContainer.classList.contains('hidden')) {
		validationMessageContainer.classList.remove('hidden');
	} else {
		createValidationMessage();
	}

	changeModalStyle('85vh', '100vh');
};
