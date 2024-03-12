import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createClient} from "@supabase/supabase-js";
import {SessionContextProvider} from "@supabase/auth-helpers-react";


const supabase = createClient(
    "https://dgcsdzfxcmtiibcrraqw.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnY3NkemZ4Y210aWliY3JyYXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwODE0OTEsImV4cCI6MjAyNTY1NzQ5MX0.KPMbdcXXqCC4Ugo6nEF2MxmnuahikdSuqfQD79K33T0",
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <SessionContextProvider supabaseClient={supabase}>
            <App/>
        </SessionContextProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
