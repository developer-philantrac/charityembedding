(function () {
  const BASE_URL = "https://www.philantrac.com/charity/";

  window.PhilantracWidget = {
    iframe: null,

    open: function (slug) {
      const finalUrl = BASE_URL + encodeURIComponent(slug) + "?checkout=qr";
      console.log("PhilantracWidget ➜ Opening URL:", finalUrl);

      // Remove existing modal if present
      const existingModal = document.getElementById('philantrac-modal');
      if (existingModal) {
        console.log("PhilantracWidget ➜ Removing existing modal.");
        document.body.removeChild(existingModal);
      }

      // Create overlay
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

      // Create iframe
      const iframe = document.createElement('iframe');
      iframe.src = finalUrl;
      iframe.allow = 'payment'; // ✅ ALLOW Stripe/Google Pay
      iframe.style = `
        flex-grow: 1;
        border: none;
        width: 100%;
        height: 100%;
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
        console.log("PhilantracWidget ➜ Manual close clicked.");
        this.close();
      };

      modalContainer.appendChild(close);
      modalContainer.appendChild(iframe);
      overlay.appendChild(modalContainer);
      document.body.appendChild(overlay);

      this.iframe = overlay;

      console.log("PhilantracWidget ➜ Modal with iframe injected.");
    },

    close: function () {
      const modal = document.getElementById('philantrac-modal');
      if (modal) {
        document.body.removeChild(modal);
        this.iframe = null;
        console.log("PhilantracWidget ➜ Widget closed and DOM cleaned.");
      } else {
        console.warn("PhilantracWidget ➜ Tried to close, but modal not found.");
      }
    }
  };

  // ✅ Listen for message from iframe (success page)
  window.addEventListener('message', function (event) {
    console.log("PhilantracWidget ➜ Message received:", event.data);

    if (event.data && event.data.type === 'PHILANTRAC_DONATION_COMPLETE') {
      console.log("PhilantracWidget ➜ Donation complete message detected. Closing widget.");
      window.PhilantracWidget.close();
    }
  });

  console.log("PhilantracWidget ➜ Script loaded and message listener active.");
})();
