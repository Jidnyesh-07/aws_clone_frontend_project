document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.getElementById("registrationForm");

    if (!form) return;
    localStorage.setItem(
        "cloudconnect-registrations",
        JSON.stringify(registrations)
    );


    /* ================= FORM SUBMISSION ================= */

    form.addEventListener("submit", function(event) {

        event.preventDefault();


        /* Get form values */

        const fullName =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const college =
            document.getElementById("college").value.trim();

        const course =
            document.getElementById("course").value;

        const year =
            document.getElementById("year").value;

        const skills =
            document.getElementById("skills").value.trim();

        const github =
            document.getElementById("github").value.trim();

        const linkedin =
            document.getElementById("linkedin").value.trim();


        /* ================= VALIDATION ================= */

        if (!fullName) {

            showMessage(
                "Please enter your full name.",
                "error"
            );

            return;
        }


        if (!validateEmail(email)) {

            showMessage(
                "Please enter a valid email address.",
                "error"
            );

            return;
        }


        if (!validatePhone(phone)) {

            showMessage(
                "Please enter a valid phone number.",
                "error"
            );

            return;
        }


        if (!college) {

            showMessage(
                "Please enter your college name.",
                "error"
            );

            return;
        }


        if (!course) {

            showMessage(
                "Please select your course.",
                "error"
            );

            return;
        }


        if (!year) {

            showMessage(
                "Please select your year.",
                "error"
            );

            return;
        }


        /* ================= CREATE REGISTRATION ================= */

        const registration = {

            id: generateRegistrationId(),

            name: fullName,

            email: email,

            phone: phone,

            college: college,

            course: course,

            year: year,

            skills: skills,

            github: github,

            linkedin: linkedin,

            registeredAt: new Date().toISOString()

        };


        /* ================= GET OLD DATA ================= */

        const registrations =
            JSON.parse(
                localStorage.getItem(
                    "cloudconnect-registrations"
                )
            ) || [];


        /* ================= CHECK DUPLICATE EMAIL ================= */

        const duplicate =
            registrations.some(
                user =>
                user.email.toLowerCase() ===
                email.toLowerCase()
            );


        if (duplicate) {

            showMessage(
                "This email is already registered.",
                "error"
            );

            return;
        }


        /* ================= SAVE DATA ================= */

        registrations.push(registration);

        localStorage.setItem(
            "cloudconnect-registrations",
            JSON.stringify(registrations)
        );


        /* ================= SUCCESS ================= */

        showSuccess(registration);


        /* Reset form */

        form.reset();

    });


    /* ================= EMAIL VALIDATION ================= */

    function validateEmail(email) {

        const pattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return pattern.test(email);

    }


    /* ================= PHONE VALIDATION ================= */

    function validatePhone(phone) {

        const cleaned =
            phone.replace(/\D/g, "");

        return cleaned.length >= 10;

    }


    /* ================= ID GENERATOR ================= */

    function generateRegistrationId() {

        const timestamp =
            Date.now().toString().slice(-6);

        const random =
            Math.floor(
                100 + Math.random() * 900
            );

        return `
CC - $ { timestamp } - $ { random }
`;

    }


    /* ================= MESSAGE ================= */

    function showMessage(message, type) {

        let messageBox =
            document.getElementById("formMessage");

        if (!messageBox) {

            messageBox =
                document.createElement("div");

            messageBox.id =
                "formMessage";

            form.prepend(messageBox);

        }


        messageBox.className =
            `
form - message $ { type }
`;

        messageBox.textContent =
            messageBox.textContent = message;

        messageBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    /* ================= SUCCESS MESSAGE ================= */

    function showSuccess(registration) {

        let successBox =
            document.getElementById(
                "successMessage"
            );

        if (!successBox) {

            successBox =
                document.createElement("div");

            successBox.id =
                "successMessage";

            form.parentElement.prepend(
                successBox
            );

        }


        successBox.className =
            "success-message";


        successBox.innerHTML = `

<
div class = "success-icon" >
    <
    i class = "fa-solid fa-check" > < /i> <
    /div>

<
div >

    <
    h3 >
    Registration Successful!
    <
    /h3>

<
p >
    Welcome to CloudConnect, <
    strong > $ { escapeHTML(registration.name) } < /strong>. <
    /p>

<
span >
    Registration ID:
    <
    strong > $ { registration.id } < /strong> <
    /span>

<
/div>

`;


        successBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    /* ================= HTML SECURITY ================= */

    function escapeHTML(value) {

        const div =
            document.createElement("div");

        div.textContent = value;

        return div.innerHTML;

    }

});