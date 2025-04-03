(function () {
  window.PhilantracWidget = {
    open: function (charityId) {
      if (!document.getElementById('philantrac-modal')) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'philantrac-modal';
        overlay.style = `
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999;
        `;

        // Create iframe
        const iframe = document.createElement('iframe');
        iframe.src = 'https://philantrac.com/embed/' + charityId;
        iframe.style = `
          width: 90%; height: 90%;
          border: none; border-radius: 12px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        `;

        // Create close button
        const closeBtn = document.createElement('div');
        closeBtn.innerHTML = '&times;';
        closeBtn.style = `
          position: absolute;
          top: 20px; right: 30px;
          font-size: 36px;
          color: white;
          cursor: pointer;
        `;
        closeBtn.onclick = () => document.body.removeChild(overlay);

        overlay.appendChild(closeBtn);
        overlay.appendChild(iframe);
        document.body.appendChild(overlay);
      }
    }
  };
})();
