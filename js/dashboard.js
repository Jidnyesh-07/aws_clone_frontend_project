document.addEventListener("DOMContentLoaded", () => {

    const tableBody =
        document.getElementById("registrationTableBody");

    if (!tableBody) return;


    /* ================= GET REGISTRATIONS ================= */

    function getRegistrations() {

        return JSON.parse(
            localStorage.getItem(
                "cloudconnect-registrations"
            )
        ) || [];

    }


    /* ================= RENDER DASHBOARD ================= */

    function renderDashboard(data = getRegistrations()) {

        renderStatistics(data);

        renderTable(data);

    }


    /* ================= STATISTICS ================= */

    function renderStatistics(data) {

        const total =
            document.getElementById("totalStudents");

        const events =
            document.getElementById("totalEvents");

        const colleges =
            document.getElementById("totalColleges");

        const recent =
            document.getElementById("recentRegistrations");


        if (total) {

            total.textContent =
                data.length;

        }


        if (events) {

            const eventRegistrations =
                JSON.parse(
                    localStorage.getItem(
                        "cloudconnect-event-registrations"
                    )
                ) || [];

            events.textContent =
                eventRegistrations.length;

        }


        if (colleges) {

            const uniqueColleges =
                new Set(
                    data.map(
                        user => user.college
                    )
                );

            colleges.textContent =
                uniqueColleges.size;

        }


        if (recent) {

            const today =
                new Date();

            const recentCount =
                data.filter(user => {

                    const registrationDate =
                        new Date(
                            user.registeredAt
                        );

                    const difference =
                        today -
                        registrationDate;

                    return (
                        difference <
                        7 * 24 * 60 * 60 * 1000
                    );

                }).length;


            recent.textContent =
                recentCount;

        }

    }


    /* ================= TABLE ================= */

    function renderTable(data) {

        tableBody.innerHTML = "";


        if (data.length === 0) {

            tableBody.innerHTML = `

<
tr >

    <
    td
colspan = "7"
class = "empty-table" >
    No registrations found. <
    /td>

<
/tr>

`;

            return;

        }


        data.forEach((user, index) => {

            const row =
                document.createElement("tr");


            const registrationDate =
                user.registeredAt ?
                new Date(
                    user.registeredAt
                ).toLocaleDateString() :
                "-";


            row.innerHTML = `

<
td >
    $ { index + 1 } <
    /td>

<
td >
    <
    strong >
    $ { escapeHTML(user.name) } <
    /strong>

<
small >
    $ { escapeHTML(user.id) } <
    /small> <
    /td>

<
td >
    $ { escapeHTML(user.email) } <
    /td>

<
td >
    $ { escapeHTML(user.college) } <
    /td>

<
td >
    $ { escapeHTML(user.course) } <
    /td>

<
td >
    $ { escapeHTML(user.year) } <
    /td>

<
td >
    $ { registrationDate } <
    /td>

`;


            tableBody.appendChild(row);

        });

    }


    /* ================= SEARCH ================= */

    const searchInput =
        document.getElementById(
            "dashboardSearch"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                const searchTerm =
                    searchInput.value
                    .toLowerCase()
                    .trim();


                const registrations =
                    getRegistrations();


                const filtered =
                    registrations.filter(user => {

                        return (

                            user.name
                            .toLowerCase()
                            .includes(searchTerm)

                            ||

                            user.email
                            .toLowerCase()
                            .includes(searchTerm)

                            ||

                            user.college
                            .toLowerCase()
                            .includes(searchTerm)

                            ||

                            user.course
                            .toLowerCase()
                            .includes(searchTerm)

                        );

                    });


                renderTable(filtered);

            }
        );

    }


    /* ================= CSV EXPORT ================= */

    const exportButton =
        document.getElementById(
            "exportCSV"
        );


    if (exportButton) {

        exportButton.addEventListener(
            "click",
            exportCSV
        );

    }


    function exportCSV() {

        const registrations =
            getRegistrations();


        if (registrations.length === 0) {

            alert(
                "There are no registrations to export."
            );

            return;

        }


        const headers = [

            "Registration ID",
            "Name",
            "Email",
            "Phone",
            "College",
            "Course",
            "Year",
            "Skills",
            "GitHub",
            "LinkedIn",
            "Registered At"

        ];


        const rows =
            registrations.map(user => [

                user.id,
                user.name,
                user.email,
                user.phone,
                user.college,
                user.course,
                user.year,
                user.skills,
                user.github,
                user.linkedin,
                user.registeredAt

            ]);


        const csvContent = [

                headers,

                ...rows

            ]
            .map(row =>
                row
                .map(value =>
                    `
"${String(value ?? "")
.replace(/"/g, '""')
}
"`
                )
                .join(",")
            )
            .join("\n");


        const blob =
            new Blob(
                [csvContent], {
                    type: "text/csv;charset=utf-8;"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            `cloudconnect-registrations-${new Date()
                .toISOString()
                .slice(0, 10)}.csv`;


        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

    }


    /* ================= CLEAR DATA ================= */

    const clearButton =
        document.getElementById(
            "clearRegistrations"
        );


    if (clearButton) {

        clearButton.addEventListener(
            "click",
            () => {

                const confirmed =
                    confirm(
                        "Are you sure you want to delete all registrations?"
                    );


                if (!confirmed) return;


                localStorage.removeItem(
                    "cloudconnect-registrations"
                );


                renderDashboard();

                alert(
                    "Registration data cleared."
                );

            }
        );

    }


    /* ================= HTML ESCAPE ================= */

    function escapeHTML(value) {

        const div =
            document.createElement("div");

        div.textContent =
            value ? ? "";

        return div.innerHTML;

    }
    renderDashboard();
});