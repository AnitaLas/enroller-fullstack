import {useState} from "react";

export default function LoginForm({onLogin, buttonLabel}) {
    const [email, setEmail] = useState('');

    async function handleAddNewParticipant(email) {
        const response = await fetch('/api/participants', {
            method: 'POST',
            body: JSON.stringify({login: email}),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
          onLogin(email);
        }
    }

    return <div>
        <label>Zaloguj się e-mailem</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        {/*<button type="button" onClick={() => onLogin(email)}>{buttonLabel || 'Wchodzę'}</button>*/}
        <button type="button" onClick={() => handleAddNewParticipant(email)}>{buttonLabel || 'Wchodzę'}</button>
    </div>;
}
