document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Page reload se bachaata hai

    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const city = form.city.value;

    const data = { name, email, phone, city };

    try {
      const res = await fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await res.text();
      alert(result); // Success ya error message dikhaao
      form.reset(); // Form clear after submit
    } catch (err) {
      console.error('❌ Error:', err);
      alert('Something went wrong!');
    }
  });
});
