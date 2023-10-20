// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBody = document.querySelector('.modal-body');
const modalContent = document.querySelector('.content');
const modalBtn = document.querySelectorAll('.btn-signup');
const closeBtn = document.querySelector('.close');

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
