``
document.addEventListener("DOMContentLoaded", () => {

    const eventsContainer =
        document.getElementById("eventsContainer");

    if (!eventsContainer) return;


    /* ================= EVENT DATA ================= */

    const events = [

        {
            id: 1,

            title: "AWS Cloud Fundamentals",

            category: "Workshop",

            date: "August 18, 2026",

            time: "10:00 AM",

            location: "Online",

            icon: "fa-brands fa-aws",

            description: "Learn the fundamentals of cloud computing, AWS services and cloud architecture."
        },


        {
            id: 2,

            title: "Cloud Innovation Challenge",

            category: "Hackathon",

            date: "August 24, 2026",

            time: "9:00 AM",

            location: "Campus",

            icon: "fa-solid fa-code",

            description: "Work with your team and build an innovative solution using modern cloud technologies."
        },


        {
            id: 3,

            title: "Careers in Cloud Computing",

            category: "Tech Talk",

            date: "August 31, 2026",

            time: "2:00 PM",

            location: "Online",

            icon: "fa-solid fa-user-tie",

            description: "Discover career opportunities, skills and technologies required for cloud careers."
        },


        {
            id: 4,

            title: "AWS Serverless Workshop",

            category: "Workshop",

            date: "September 5, 2026",

            time: "11:00 AM",

            location: "Online",

            icon: "fa-solid fa-server",

            description: "Build serverless applications and understand AWS Lambda and related services."
        },


        {
            id: 5,

            title: "Frontend Cloud Integration",

            category: "Workshop",

            date: "September 12, 2026",

            time: "3:00 PM",

            location: "Campus",

            icon: "fa-solid fa-laptop-code",

            description: "Learn how frontend applications can communicate with cloud-based services."
        },


        {
            id: 6,

            title: "Student Developer Meetup",

            category: "Community",

            date: "September 20, 2026",

            time: "4:00 PM",

            location: "Campus",

            icon: "fa-solid fa-users",

            description: "Meet fellow student developers, share ideas and collaborate on projects."
        }

    ];


    /* ================= RENDER EVENTS ================= */

    function renderEvents(eventList) {

        eventsContainer.innerHTML = "";


        if (eventList.length === 0) {

            eventsContainer.innerHTML = `

<
div class = "no-events" >

    <
    i class = "fa-solid fa-cloud" > < /i>

<
h3 >
    No events found <
    /h3>

<
p >
    Try another search or category. <
    /p>

<
/div>

`;

            return;

        }


        eventList.forEach(event => {

            const card =
                document.createElement("article");

            card.className =
                "event-card event-page-card";


            card.innerHTML = `

<
div class = "event-page-icon" >

    <
    i class = "${event.icon}" > < /i>

<
/div>

<
span class = "event-type" >
    $ { event.category } <
    /span>

<
h3 >
    $ { event.title } <
    /h3>

<
p >
    $ { event.description } <
    /p>

<
div class = "event-details" >

    <
    div >
    <
    i class = "fa-regular fa-calendar" > < /i>
$ { event.date } <
/div>

<
div >
    <
    i class = "fa-regular fa-clock" > < /i>
$ { event.time } <
/div>

<
div >
    <
    i class = "fa-solid fa-location-dot" > < /i>
$ { event.location } <
/div>

<
/div>

<
button
class = "event-register-btn"
data - event - id = "${event.id}" >
    Register
for Event
    <
    i class = "fa-solid fa-arrow-right" > < /i> <
    /button>

`;


            eventsContainer.appendChild(card);

        });


        attachRegistrationButtons();

    }


    /* ================= SEARCH ================= */

    const searchInput =
        document.getElementById("eventSearch");

    const categoryFilter =
        document.getElementById("categoryFilter");


    function filterEvents() {

        const searchTerm =
            searchInput ?
            searchInput.value
            .toLowerCase()
            .trim() :
            "";


        const category =
            categoryFilter ?
            categoryFilter.value :
            "All";


        const filtered =
            events.filter(event => {

                const matchesSearch =

                    event.title
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                event.description
                    .toLowerCase()
                    .includes(searchTerm);


                const matchesCategory =

                    category === "All" ||

                    event.category === category;


                return (
                    matchesSearch &&
                    matchesCategory
                );

            });


        renderEvents(filtered);

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterEvents
        );

    }


    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            filterEvents
        );

    }


    /* ================= EVENT REGISTRATION ================= */

    function attachRegistrationButtons() {

        const buttons =
            document.querySelectorAll(
                ".event-register-btn"
            );


        buttons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const eventId =
                        Number(
                            button.dataset.eventId
                        );


                    const selectedEvent =
                        events.find(
                            event =>
                            event.id === eventId
                        );


                    if (!selectedEvent) return;


                    registerForEvent(
                        selectedEvent
                    );

                }
            );

        });

    }


    /* ================= SAVE EVENT ================= */

    function registerForEvent(event) {

        const registrations =
            JSON.parse(
                localStorage.getItem(
                    "cloudconnect-event-registrations"
                )
            ) || [];


        const registration = {

            eventId: event.id,

            eventName: event.title,

            registeredAt: new Date().toISOString()

        };


        registrations.push(registration);


        localStorage.setItem(
            "cloudconnect-event-registrations",
            JSON.stringify(registrations)
        );


        alert(
            `
You have registered
for "${event.title}".
`
        );

    }


    /* ================= INITIAL LOAD ================= */

    renderEvents(events);

});