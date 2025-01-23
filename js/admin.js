document.addEventListener('DOMContentLoaded', function () {
    const tbody = document.querySelector('tbody');
    const polls = JSON.parse(localStorage.getItem('polls')) || [];
  
    tbody.innerHTML = '';
  
    polls.forEach((poll) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${poll.id}</td>
        <td>${poll.question}</td>
        <td>${poll.options[0]}</td>
        <td>${poll.options[1]}</td>
        <td>${poll.options[2]}</td>
        <td class="action-icons"><i class="fa-regular fa-copy" data-tooltip="Copy Embed"></i></td>
        <td class="action-icons"><a href="pulse-rate.html?id=${poll.id}" data-tooltip="View Results"><i class="fa-solid fa-chart-simple"></i></a></td>
        <td class="action-icons"><i class="fa-solid fa-pen-to-square" data-tooltip="Edit"></i></td>
        <td class="action-icons"><i class="fa-solid fa-trash" data-tooltip="Delete"></i></td>
      `;
      tbody.appendChild(row);
  
      // Copy Embed Code
      row.querySelector('.fa-copy').addEventListener('click', () => {
        const embedCode = `<iframe src="view-pulse.html?id=${poll.id}" width="800" height="600"></iframe>`;
        navigator.clipboard.writeText(embedCode);
        showPopup('Embed code copied!', false);
      });
  
      // Delete Poll
      row.querySelector('.fa-trash').addEventListener('click', () => {
        showPopup('Are you sure you want to delete this pulse?', true, () => {
          const updatedPolls = polls.filter(p => p.id !== poll.id);
          localStorage.setItem('polls', JSON.stringify(updatedPolls));
          row.remove();
        });
      });
  
      // Edit Poll
      row.querySelector('.fa-pen-to-square').addEventListener('click', () => {
        const isEditing = row.classList.contains('editing');
  
        if (isEditing) {
          row.querySelectorAll('td').forEach((cell, index) => {
            if (index > 0 && index < 5) {
              const input = cell.querySelector('input');
              if (input) {
                cell.textContent = input.value;
              }
            }
          });
          row.classList.remove('editing');
        } else {
          row.querySelectorAll('td').forEach((cell, index) => {
            if (index > 0 && index < 5) {
              const text = cell.textContent;
              cell.innerHTML = `<input type="text" value="${text}" />`;
            }
          });
          row.classList.add('editing');
        }
      });
    });
  
    function showPopup(message, isConfirmation, onConfirm) {
      const popup = document.getElementById('popup');
      const overlay = document.getElementById('overlay');
      popup.style.display = 'block';
      overlay.style.display = 'block';
  
      if (isConfirmation) {
        popup.innerHTML = `
          <p>${message}</p>
          <button class="confirm">Yes</button>
          <button class="cancel">No</button>
        `;
        popup.querySelector('.confirm').onclick = function () {
          onConfirm();
          closePopup();
        };
        popup.querySelector('.cancel').onclick = closePopup;
      } else {
        popup.innerHTML = `<p>${message}</p><button class="cancel">OK</button>`;
        popup.querySelector('.cancel').onclick = closePopup;
      }
    }
  
    function closePopup() {
      document.getElementById('popup').style.display = 'none';
      document.getElementById('overlay').style.display = 'none';
    }
  });
  