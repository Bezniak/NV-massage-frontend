// import React, {useState} from 'react';
// import s from './Calendar.module.css';
// import {useSession, useSessionContext, useSupabaseClient} from "@supabase/auth-helpers-react";
// import useFetchAllData from "../../hooks/useFetchAllData";
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import ru from 'date-fns/locale/ru'; // Import the ru locale object
//
// function Calendar() {
//     const [startDate, setStartDate] = useState(new Date());
//     const [startTime, setStartTime] = useState(new Date());
//     const [eventName, setEventName] = useState('');
//     const [eventDescription, setEventDescription] = useState('');
//     const {isLoading} = useSessionContext();
//
//     const {data, loading, error} = useFetchAllData('/products?populate=*');
//
//     const session = useSession();
//     const supabase = useSupabaseClient();
//
//
//     if (isLoading) {
//         return <></>
//     }
//
//     async function googleSignIn() {
//         const {error} = await supabase.auth.signInWithOAuth({
//             provider: 'google',
//             options: {
//                 scopes: 'https://www.googleapis.com/auth/calendar',
//             }
//         });
//         if (error) {
//             alert("Error logging in to Google provider with Supabase");
//             console.log(error);
//         }
//     }
//
//     async function signOut() {
//         await supabase.auth.signOut();
//     }
//
//     async function createCalendarEvent() {
//         console.log("Creating calendar event");
//         const startDateTime = new Date(startDate);
//         startDateTime.setHours(startTime.getHours(), startTime.getMinutes()); // Set the hours and minutes from startTime
//
//         const endDateTime = new Date(startDateTime);
//         endDateTime.setHours(endDateTime.getHours() + 1); // Increase by one hour
//
//         const event = {
//             'summary': eventName,
//             'description': eventDescription,
//             'start': {
//                 'dateTime': startDateTime.toISOString(),
//                 'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
//             },
//             'end': {
//                 'dateTime': endDateTime.toISOString(),
//                 'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
//             }
//         };
//
//         await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
//             method: "POST",
//             headers: {
//                 'Authorization': 'Bearer ' + session.provider_token
//             },
//             body: JSON.stringify(event)
//         })
//             .then((data) => data.json())
//             .then((data) => {
//                 console.log(data);
//                 alert("Event created, check your Google Calendar!");
//             });
//
//         await fetch("https://www.googleapis.com/calendar/v3/calendars/baranovichimassage@gmail.com/events", {
//             method: "POST",
//             headers: {
//                 'Authorization': 'Bearer ' + session.provider_token
//             },
//             body: JSON.stringify(event)
//         })
//             .then((data) => data.json())
//             .then((data) => {
//                 console.log(data);
//                 alert("Event created, check your Google Calendar!");
//             });
//     }
//
//
//     const handleOptionChange = (event) => {
//         setEventName(event.target.value);
//     };
//
//
//     return (
//         <>
//             <div className={s.container}>
//                 <div className={s.calendarWrapper}>
//                     <h1 className={s.title}>Calendar</h1>
//                 </div>
//                 <div className={s.content}>
//                     {session ? (
//                         <>
//                             <h2 className={s.subtitle}>Hey there {session.user.email}</h2>
//                             <div className={s.formGroup}>
//                                 <p className={s.label}>Start of your event</p>
//
//                                 <DatePicker
//                                     dateFormat="dd/MM/yyyy"
//                                     selected={startDate}
//                                     locale={ru} // Set the locale to ru
//                                     onChange={(date) => setStartDate(date)}
//                                 />
//
//                                 <DatePicker
//                                     selected={startDate}
//                                     onChange={(date) => setStartDate(date)}
//                                     showTimeSelect
//                                     showTimeSelectOnly
//                                     timeIntervals={30}
//                                     timeCaption="Время"
//                                     dateFormat="HH:mm"
//                                     timeFormat="HH:mm"
//                                     minTime={new Date().setHours(8, 0, 0)}
//                                     maxTime={new Date().setHours(22, 0, 0)}
//                                 />
//                             </div>
//                             <div className={s.formGroup}>
//                                 <p className={s.label}>Select massage type</p>
//                                 <select value={eventName} onChange={handleOptionChange} className={s.select}>
//                                     <option value="">Select...</option>
//                                     {data.map((option) => (
//                                         <option key={option.id} value={option.attributes.title}>
//                                             {option.attributes.title}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className={s.formGroup}>
//                                 <p className={s.label}>Message:</p>
//                                 <input
//                                     type="text"
//                                     onChange={(e) => setEventDescription(e.target.value)}
//                                     className={s.input}
//                                 />
//                             </div>
//                             <div className={s.actions}>
//                                 <button onClick={() => createCalendarEvent()} className={s.button}>
//                                     Create Event in Calendar
//                                 </button>
//                                 <button onClick={() => signOut()} className={s.button}>
//                                     Sign Out
//                                 </button>
//                             </div>
//                         </>
//                     ) : (
//                         <button onClick={() => googleSignIn()} className={s.button}>
//                             Sign In with Google
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }
//
// export default Calendar;
