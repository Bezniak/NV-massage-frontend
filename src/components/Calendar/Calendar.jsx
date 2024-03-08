import React from 'react';

function GoogleCalendar() {
    return (
        <iframe
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FMinsk&bgcolor=%23ffffff&showTitle=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0&src=YmFyYW5vdmljaGltYXNzYWdlQGdtYWlsLmNvbQ&src=cnUuYnkjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%230B8043"
            style={{ border: 'solid 1px #777' }}
            width="800"
            height="600"
            frameBorder="0"
            scrolling="no"
        ></iframe>
    );
}

export default GoogleCalendar;