// function submit() {
//     fetch("/submit-contact-us-form")
//         .then(res => {
//             if (!res.ok) {
//                 throw new Error("not ok");
//             }
//         }).then(message => {
//             const popup = document.getElementById('popup');
//             popup.style.display = "block";
//             setTimeout(() => {
//                 popup.style.display = "none"
//             }, 3000);
//         })
//         .catch(error => {
//             console.log(`${error.message}`);
//         });
// }

//  document.getElementById("form").addEventListener("submit", function (e) {
//         e.preventDefault();
//     });

// function submit() {
//     const form = document.getElementById("form");
//     const formData = new FormData(form);

//     fetch("/submit-contact-us-form", {
//         method: "POST",          // tells the server it's a form submission
//         body: formData           // sends the form data (name, email, message)
//     })
//     .then(res => {
//         if (!res.ok) {
//             throw new Error("Form submission failed");
//         }
//         return res.json();       // parse JSON response from server
//     })
//     .then(data => {
//         const popup = document.getElementById("popup");
//         popup.style.display = "block";
//         setTimeout(() => {
//             popup.style.display = "none";
//         }, 3000);
//     })
//     .catch(error => {
//         console.log(error.message);
//     });
// }
