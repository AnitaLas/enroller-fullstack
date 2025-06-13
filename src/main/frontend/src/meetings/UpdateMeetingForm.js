import {useState} from "react";

export default function UpdateMeetingForm({meeting, onSubmit, onCancel}) {
    const [title, setTitle] = useState(meeting.title);
    const [description, setDescription] = useState(meeting.description);

    function submit(event) {
        event.preventDefault();
        onSubmit({id: meeting.id, title, description});
    }

    return (
        <form onSubmit={submit}>
            <h3>Edytuj nowe spotkanie</h3>
            <label>Nazwa</label>
            <input type="text" value={title}
                   onChange={(e) => setTitle(e.target.value)}/>
            <label>Opis</label>
            <textarea value={description}
                      onChange={(e) => setDescription(e.target.value)}></textarea>
            <button type="submit">Zapisz zmiany</button>
            <button onClick={onCancel}>X</button>
        </form>
    );
}