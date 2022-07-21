const services = document.querySelectorAll('section.services .service');
const contactForm = document.querySelector('.contact-us form');

// contactForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const { senderName, senderEmail, message } = e.target.children;
//     const body = {
//         senderName: senderName.value,
//         senderEmail: senderEmail.value,
//         message: message.value
//     };
//     try {
//         let res = await fetch(`${e.target.action}contact-us`, {
//             method: 'post',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(body)
//         });
//         const status = res.status;
//         res = await res.text();
//         alert(res);
//         if (status === 200) {
//             e.target.reset();
//         }
//     } catch (err) {
//         console.log(err);
//     }
// });

const handleServicesIntersect = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.children[0].style.animation = 'fadeRight 0s ease-in-out forwards';
            entry.target.children[1].style.animation = 'fadeLeft 0s ease-in-out forwards';
        }
    });
}

const servicesOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
}

const servicesObserver = new IntersectionObserver(handleServicesIntersect, servicesOptions);

services.forEach(service => {
    servicesObserver.observe(service);
});

// [
//     {
//         "senderName": "Armen Arlert",
//         "senderEmail": "armen.arlert933@gmail.com",
//         "message": "Hello world!"
//     },
//     {
//         "senderName": "Eren Yeager",
//         "senderEmail": "eren.yeager850@gmail.com",
//         "message": "Tatakai!"
//     },
//     {
//         "senderName": "Mikasa Ackerman",
//         "senderEmail": "mikasa.ackerman@gmail.com",
//         "message": "Ereh!"
//     },
//     {
//         "senderName": "John Doe",
//         "senderEmail": "john.doe@gmail.com",
//         "message": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam repellat id impedit, beatae rem officiis fugiat et minima, quod eveniet dolorum atque ea praesentium blanditiis iusto enim commodi consequatur at rerum. Ipsam necessitatibus magni dicta consequuntur atque, voluptas explicabo aperiam eum, aut vitae eligendi dolorem! Aliquam at minima expedita odio exercitationem facere consequatur natus, consectetur enim, ad quo quia soluta repellendus illum reprehenderit aperiam ea magnam vel fugiat corrupti velit, repudiandae officia voluptatum? Sed sunt magni maiores harum quibusdam sit alias! Facilis, quisquam enim veritatis ipsam unde esse nobis voluptatem cumque dicta minus iure rerum, officiis suscipit quod eum libero."
//     },
//     {
//         "senderName": "Jessica Peter",
//         "senderEmail": "jessica.peter@gmail.com",
//         "message": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam repellat id impedit, beatae rem officiis fugiat et minima, quod eveniet dolorum atque ea praesentium blanditiis iusto enim commodi consequatur at rerum."
//     },
//     {
//         "senderName": "Mohamed Ali",
//         "senderEmail": "mohamed.ali232@gmail.com",
//         "message": "Lorem ipsum dolor, sit amet consectetur adipisicing elit."
//     }
// ].forEach(async message => {
//     await fetch('http://localhost:8080/contact-us', {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify(message)
//     });
// });