function submit() {
    fetch("/submit-contact-us-form")
        .then(res => {
            if (!res.ok) {
                throw new Error("not ok");
            }
        }).then(message => {
            const popup = document.getElementById('popup');
            popup.style.display = "block";
            setTimeout(() => {
                popup.style.display = "none"
            }, 3000);
        })
        .catch(error => {
            console.log(`${error.message}`);
        });

    /*
     fetch(`http://localhost:3030/api/users/${userId}`)
        .then(res => {
          if (!res.ok) throw new Error("User not found");
          return res.json();
        })
        .then(user => {
          resultDiv.innerHTML = `<p><strong>${user.first_name}</strong><br>Email: ${user.email}</p>`;
        })
        .catch(err => {
   .       resultDiv.innerHTML = `<span style="color:red;">${err.message}</span>`;
        });
    }
     */
}