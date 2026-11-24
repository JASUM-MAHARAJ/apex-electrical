document.addEventListener('DOMContentLoaded', () => {
  const callbackForm = document.getElementById('callbackForm');
  if (!callbackForm) return;

  const submitBtn = callbackForm.querySelector('button[type="submit"]');
  const statusEl = document.createElement('p');
  statusEl.id = 'callbackStatus';
  statusEl.className = 'callback-status';
  callbackForm.appendChild(statusEl);

  const setStatus = (msg, type) => {
    statusEl.textContent = msg;
    statusEl.className = `callback-status callback-status--${type}`;
  };

  callbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const accessKeyInput = callbackForm.querySelector('input[name="access_key"]');
    const accessKey = accessKeyInput ? accessKeyInput.value.trim() : '';

    const clientName = document.getElementById('clientName').value.trim();
    const clientPhone = document.getElementById('clientPhone').value.trim();
    const clientIssue = document.getElementById('clientIssue').value;

    if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      setStatus('Please paste your Web3Forms access key into index.html first.', 'warn');
      return;
    }

    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending Request...';
    setStatus('', 'success');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `10-Min Callback Request - ${clientName} (${clientIssue})`,
          from_name: 'Apex Electrical Durban',
          name: clientName,
          phone: clientPhone,
          issue: clientIssue,
          message: `Callback request from ${clientName} | Phone/WhatsApp: ${clientPhone} | Issue: ${clientIssue}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus(`Got it, ${clientName}! Our on-duty technician will call ${clientPhone} shortly.`, 'success');
        callbackForm.reset();
      } else {
        setStatus('Could not send request. Please call 0672901090 or use WhatsApp Dispatch.', 'error');
      }
    } catch (err) {
      setStatus('Connection error. Please call 0672901090 or tap WhatsApp Dispatch.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
});