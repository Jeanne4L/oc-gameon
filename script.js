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
const eventLocation = document.getElementsByName('location');
const form = document.querySelector('#reserve');

const validationMessageContainer = document.createElement('div');
const validationMessage = document.createElement('h2');
const closeModalBtn = document.createElement('button');

// regex for input validation
const onlyLetterRegex = /^[A-Za-zÀ-ÿ' -]+$/u;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const nbRegex = /^\d+$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const inputs = {
	first: function (value) {
		return onlyLetterRegex.test(value);
	},
	last: function (value) {
		return onlyLetterRegex.test(value);
	},
	email: function (value) {
		return emailRegex.test(value);
	},
	birthdate: function (value) {
		return dateRegex.test(value);
	},
	quantity: function (value) {
		return nbRegex.test(value);
	},
	location: function (value) {
		return onlyLetterRegex.test(value);
	},
	useterms: function (elt) {
		return elt.checked;
	},
};

// check valid input
const validateInput = () => {
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		let isValidForm = true;
		const formElts = form.elements;

		for (let key in inputs) {
			let formElt = formElts[key];
			let formEltName = formElts[key].name;
			let formEltValue = formElts[key].value;
			let formEltType = formElts[key].type;

			if (formEltType === 'checkbox') {
				if (!inputs[key](formElt)) {
					document.querySelector('#useterms-error').classList.remove('hidden');
					isValidForm = false;
				} else {
					document.querySelector('#useterms-error').classList.add('hidden');
				}
			} else {
				if (!inputs[key](formEltValue)) {
					if (key === 'location') {
						document
							.querySelector('#location-error')
							.classList.remove('hidden');
					} else {
						displayError(formElt);
					}
					isValidForm = false;
				} else {
					if (key === 'location') {
						document.querySelector('#location-error').classList.add('hidden');
					} else {
						removeError(formElt);
					}
				}
			}
		}
		if (isValidForm) {
			handleValidForm();
		}
	});
};
validateInput();

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

// Display and hide form errors
const displayError = (elt) => {
	elt.classList.add('error');
	elt.nextElementSibling.classList.remove('hidden');

	elt.focus();
};
const removeError = (elt) => {
	elt.classList.remove('error');
	elt.nextElementSibling.classList.add('hidden');
};

const changeModalStyle = (maxHeight, height) => {
	modalContent.style.maxHeight = maxHeight;
	modal.style.height = height;
};

// handle valid form
const handleValidForm = () => {
	// remove the form to display the validation message
	form.reset();
	form.classList.add('hidden');

	if (validationMessageContainer.classList.contains('hidden')) {
		validationMessageContainer.classList.remove('hidden');
	} else {
		// create the validation message
		validationMessage.innerHTML = 'Merci pour<br>votre inscription';
		closeModalBtn.textContent = 'Fermer';

		validationMessageContainer.classList.add('modal-validation-container');
		validationMessage.classList.add('validation-title');
		closeModalBtn.classList.add('btn', 'btn--red');

		modalContent.appendChild(validationMessageContainer);
		validationMessageContainer.appendChild(validationMessage);
		validationMessageContainer.appendChild(closeModalBtn);
	}

	// Change modal style
	changeModalStyle('85vh', '100vh');
};
