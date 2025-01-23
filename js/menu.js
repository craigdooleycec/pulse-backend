document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const menuContent = document.querySelector('.menu-content');
  
    if (menuToggle && menuContent) {
      menuToggle.addEventListener('click', () => {
        if (menuContent.style.display === 'block') {
          menuContent.style.animation = 'fadeOut 0.3s ease';
          setTimeout(() => {
            menuContent.style.display = 'none';
          }, 300);
        } else {
          menuContent.style.display = 'block';
          menuContent.style.animation = 'fadeIn 0.3s ease';
        }
      });
    } else {
      console.error('Menu elements not found in DOM.');
    }
  });
  