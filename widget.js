(function () {
  window.PhilantracWidget = {
    open: function (charityId) {
      if (document.getElementById('philantrac-modal')) return;

      // Overlay
      const overlay = document.createElement('div');
      overlay.id = 'philantrac-modal';
      overlay.style = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        flex-direction: column;
      `;

      // Modal container
      const modalContainer = document.createElement('div');
      modalContainer.style = `
        width: 90%;
        height: 90%;
        background: white;
        border-radius: 16px;
        box-shadow: 0 0 20px rgba(0,0,0,0.2);
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      `;

      // Logo
      const logo = document.createElement('img');
      logo.src = 'https://developer-philantrac.github.io/app.personalization/logowhite.png'; // 🔁 Replace with your actual logo URL
      logo.alt = 'Philantrac';
      logo.style = `
        height: 40px;
        margin: 16px auto 0;
        display: block;
      `;

      // Iframe
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.app.philantrac.com/' + charityId;
      iframe.style = `
        flex-grow: 1;
        border: none;
        width: 100%;
      `;

      // Close button
      const close = document.createElement('div');
      close.innerHTML = '&times;';
      close.style = `
        position: absolute;
        top: 12px;
        right: 20px;
        font-size: 30px;
        color: #999;
        cursor: pointer;
        z-index: 1;
      `;
      close.onclick = () => {
        document.body.removeChild(overlay);
      };

      modalContainer.appendChild(close);
      modalContainer.appendChild(logo);
      modalContainer.appendChild(iframe);
      overlay.appendChild(modalContainer);
      document.body.appendChild(overlay);
    }
  };
})();
