// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBody = document.querySelector('.modal-body');
const modalContent = document.querySelector('.content');
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
	// location: function (elt) {
	// 	return elt.checked;
	// },
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

		// console.log(formElts['location'].value);

		for (let key in inputs) {
			let formElt = formElts[key];
			let formEltName = formElts[key].name;
			let formEltValue = formElts[key].value;
			let formEltType = formElts[key].type;

			if (formEltType === 'checkbox') {
				if (!inputs[formEltName](formElt)) {
					document.querySelector('#useterms-error').classList.remove('hidden');
					isValidForm = false;
				} else {
					document.querySelector('#useterms-error').classList.add('hidden');
				}
			} else {
				if (!inputs[formEltName](formEltValue)) {
					displayError(formElt);
					isValidForm = false;
				} else {
					removeError(formElt);
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
	var x = document.getElementById('myTopnav');
	if (x.className === 'topnav') {
		x.className += ' responsive';
	} else {
		x.className = 'topnav';
	}
};

// launch modal form
const launchModal = () => {
	modalbg.classList.remove('hidden');
	modalContent.classList.remove('hide-modal-content');
	form.classList.remove('hidden');
};
// close modal
const closeModal = () => {
	modalContent.classList.add('hide-modal-content');
	setTimeout(() => {
		modalbg.classList.add('hidden');
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
};
const removeError = (elt) => {
	elt.classList.remove('error');
	elt.nextElementSibling.classList.add('hidden');
};

const changeModalStyle = (maxHeight, height) => {
	modalBody.style.maxHeight = maxHeight;
	modalContent.style.height = height;
};

// handle valid form
const handleValidForm = () => {
	// remove the form to display the validation message
	form.reset();
	form.classList.add('hidden');

	// create the validation message
	validationMessage.innerHTML = 'Merci pour<br>votre inscription';
	closeModalBtn.textContent = 'Fermer';

	validationMessageContainer.classList.add('modal-validation-container');
	validationMessage.classList.add('validation-title');
	closeModalBtn.classList.add('btn', 'btn--red');

	modalBody.appendChild(validationMessageContainer);
	validationMessageContainer.appendChild(validationMessage);
	validationMessageContainer.appendChild(closeModalBtn);

	// Change modal style
	changeModalStyle('90vh', '100vh');
};
