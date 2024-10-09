function createModal() {
  const modal = document.createElement('div');
  modal.id = 'myExtensionModal';
  modal.innerHTML = `
    <div class="modal-content">
      <input type="text" id="modalInput">
    </div>
  `;
  document.body.appendChild(modal);

  const modalInput = modal.querySelector('#modalInput');
  modalInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit();
    }
  });

  modalInput.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      modal.style.display = 'none';
    }
  });

  submit = () => {
    const input = modal.querySelector('#modalInput').value;
    console.log('Input submitted:', input);
    modal.style.display = 'none';
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openModal") {
    const modal = document.getElementById('myExtensionModal');
    if (modal) {
      modal.style.display = 'block';
      modal.querySelector('#modalInput').focus();
    } else {
      createModal();
      const newModal = document.getElementById('myExtensionModal');
      newModal.style.display = 'block';
      newModal.querySelector('#modalInput').focus();
    }
  }
});

createModal();
