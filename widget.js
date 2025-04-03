(function () {
  const BASE_URL = "https://www.app.philantrac.com/charity/selfembeded/checkout/";

  window.PhilantracWidget = {
    open: function (slug) {
      if (document.getElementById('philantrac-modal')) return;

      // ✅ Log the URL for debugging
      const finalUrl = BASE_URL + encodeURIComponent(slug);
      console.log("PhilantracWidget ➜ Opening:", finalUrl);

      // Detect system theme
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

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

      const modalContainer = document.createElement('div');
      modalContainer.style = `
        width: 90%;
        height: 90%;
        background: ${isDarkMode ? '#1e1e1e' : 'white'};
        border-radius: 16px;
        box-shadow: 0 0 20px rgba(0,0,0,0.2);
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      `;

      const logo = document.createElement('img');
      logo.src = isDarkMode
        ? 'https://developer-philantrac.github.io/app.personalization/logowhite.png' // Optional: your light version
        : 'https://developer-philantrac.github.io/app.personalization/logowhite.png';
      logo.alt = 'Philantrac';
      logo.style = `
        height: 40px;
        margin: 16px auto 0;
        display: block;
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
        color: ${isDarkMode ? '#eee' : '#999'};
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
