(function () {
  const BASE_URL = "https://www.app.philantrac.com/charity/selfembeded/checkout/";

  window.PhilantracWidget = {
    open: function (slug) {
      const finalUrl = BASE_URL + encodeURIComponent(slug);
      console.log("PhilantracWidget ➜ Opening:", finalUrl);

      let existingOverlay = document.getElementById('philantrac-modal');

      // ✅ If modal already exists, just update the iframe URL
      if (existingOverlay) {
        const iframe = existingOverlay.querySelector('iframe');
        if (iframe) iframe.src = finalUrl;
        return;
      }

      // Otherwise create modal fresh
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
      `;

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

      const iframe = document.createElement('iframe');
      iframe.src = finalUrl;
      iframe.style = `
        flex-grow: 1;
        border: none;
        width: 100%;
      `;

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
      modalContainer.appendChild(iframe);
      overlay.appendChild(modalContainer);
      document.body.appendChild(overlay);
    }
  };
})();
