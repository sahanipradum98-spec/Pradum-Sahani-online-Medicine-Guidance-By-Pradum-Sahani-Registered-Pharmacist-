// script.js - simple behaviors
document.getElementById('year').textContent = new Date().getFullYear();

// If user wants to replace the Google Form link or UPI, they can modify href attributes directly.
// Small helpful behavior: on phones, UPI links sometimes need to use intent for Android fallback.
document.getElementById('upiBtn').addEventListener('click', function(e){
  // allow default behavior; this is just a placeholder to show JS is active
});

// Helper: if you want to dynamically set the Google Form link via prompt (optional)
/* Uncomment to enable a prompt for testing:
const form = document.getElementById('formLink');
if(!form.href.includes('forms.gle')){
  // keep as is
} else {
  // form.href = prompt('Paste your Google Form link', form.href) || form.href;
}
*/