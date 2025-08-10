document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize course modal
    var courseModal = document.getElementById('courseModal');
    if (courseModal) {
        courseModal.addEventListener('show.bs.modal', function (event) {
            var button = event.relatedTarget;
            var course = button.getAttribute('data-course');
            var modalTitle = courseModal.querySelector('.modal-title');
            var selectedCourseInput = courseModal.querySelector('#selectedCourse');
            
            if (course === 'basico') {
                modalTitle.textContent = 'Pré-inscrição no Curso Básico';
            } else if (course === 'avancado') {
                modalTitle.textContent = 'Pré-inscrição no Curso Avançado';
            }
            
            selectedCourseInput.value = course;
        });
    }

    // Initialize toast
    var toastEl = document.getElementById('successToast');
    var toast = new bootstrap.Toast(toastEl);

    // Booking form submission
    var bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            var formData = {
                serviceType: document.getElementById('serviceType').value,
                bookingDate: document.getElementById('bookingDate').value,
                bookingTime: document.getElementById('bookingTime').value,
                clientName: document.getElementById('clientName').value,
                clientPhone: document.getElementById('clientPhone').value,
                clientEmail: document.getElementById('clientEmail').value,
                clientAddress: document.getElementById('clientAddress').value,
                clientNotes: document.getElementById('clientNotes').value
            };
            
            // Send data to backend
            fetch('https://massoterapia-wousa-backend.onrender.com/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                // Show success message
                document.getElementById('toastMessage').textContent = 'Seu agendamento foi enviado com sucesso! Entraremos em contato em breve para confirmar.';
                toast.show();
                
                // Reset form
                bookingForm.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Ocorreu um erro ao enviar seu agendamento. Por favor, tente novamente ou entre em contato diretamente pelo WhatsApp.');
            });
        });
    }

    // Course form submission
    var submitCourseBtn = document.getElementById('submitCourseForm');
    if (submitCourseBtn) {
        submitCourseBtn.addEventListener('click', function() {
            var courseForm = document.getElementById('courseForm');
            
            // Get form data
            var formData = {
                courseType: document.getElementById('selectedCourse').value,
                studentName: document.getElementById('studentName').value,
                studentEmail: document.getElementById('studentEmail').value,
                studentPhone: document.getElementById('studentPhone').value,
                studentExperience: document.getElementById('studentExperience').value,
                studentGoals: document.getElementById('studentGoals').value
            };
            
            // Validate form
            if (!formData.studentName || !formData.studentEmail || !formData.studentPhone || !formData.studentExperience || !formData.studentGoals) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Send data to backend
            fetch('https://massoterapia-wousa-backend.onrender.com/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                // Show success message
                document.getElementById('toastMessage').textContent = 'Sua pré-inscrição foi enviada com sucesso! Enviaremos as informações de pagamento em breve.';
                toast.show();
                
                // Reset form and close modal
                courseForm.reset();
                var modal = bootstrap.Modal.getInstance(courseModal);
                modal.hide();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Ocorreu um erro ao enviar sua pré-inscrição. Por favor, tente novamente ou entre em contato diretamente pelo WhatsApp.');
            });
        });
    }

    // Contact form submission
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            var formData = {
                name: document.getElementById('contactName').value,
                email: document.getElementById('contactEmail').value,
                subject: document.getElementById('contactSubject').value,
                message: document.getElementById('contactMessage').value
            };
            
            // Send data to backend
            fetch('https://massoterapia-wousa-backend.onrender.com/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                // Show success message
                document.getElementById('toastMessage').textContent = 'Sua mensagem foi enviada com sucesso! Responderemos em breve.';
                toast.show();
                
                // Reset form
                contactForm.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou entre em contato diretamente pelo WhatsApp.');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // Add shadow to navbar on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-shadow');
        } else {
            navbar.classList.remove('navbar-shadow');
        }
    });
});

