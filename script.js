// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBody = document.querySelector('.modal-body');
const modalContent = document.querySelector('.content');
const modalBtn = document.querySelectorAll('.btn-signup');
const closeBtn = document.querySelector('.close');
const form = document.querySelector('form');
const formData = document.querySelectorAll('.formData');
const firstName = document.querySelector('#first');
const lastName = document.querySelector('#last');
const email = document.querySelector('#email');
const birthDate = document.querySelector('#birthdate');
const qty = document.querySelector('#quantity');
const useTerms = document.querySelector('#checkbox1');
const submitBtn = document.querySelector('#submit-btn');
const eventLocation = document.getElementsByName('location');

const letterRegex = /^[A-Za-zÀ-ÿ']+$/u;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const nbRegex = /^\d+$/;

// display responsive menu
function editNav() {
	var x = document.getElementById('myTopnav');
	if (x.className === 'topnav') {
		x.className += ' responsive';
	} else {
		x.className = 'topnav';
	}
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
	modalbg.classList.remove('hidden');
	modalContent.classList.remove('hide-modal-content');
}
function closeModal() {
	modalContent.classList.add('hide-modal-content');
	setTimeout(() => {
		modalbg.classList.add('hidden');
	}, 400);
}
closeBtn.addEventListener('click', () => {
	closeModal();
});

// check input value
function handleInputChange(elt, regex) {
	elt.addEventListener('change', (e) => {
		if (!regex.test(e.target.value)) {
			elt.classList.add('error');
			elt.nextElementSibling.classList.remove('hidden');
		} else {
			elt.classList.remove('error');
			elt.nextElementSibling.classList.add('hidden');
		}
	});
}
