import {useState} from "react";

export default function UpdateMeetingForm({meeting, onSubmit}) {

    // console.log("2 UpdateMeetingForm ");
    // console.log("1 update metting id: " + meeting.id);
    // const [title, setTitle] = useState('EEEE tytuł');
    // const [description, setDescription] = useState("test");
    const [title, setTitle] = useState(meeting.title);
    const [description, setDescription] = useState(meeting.description);

    function submit(event) {
        event.preventDefault();
        // onSubmit({title, description});
        onSubmit({id: meeting.id, title, description});
    }

    return (
        <form onSubmit={submit}>
            <h3>Dodaj nowe spotkanie</h3>
            <label>Nazwa</label>
            <input type="text" value={title}
                   onChange={(e) => setTitle(e.target.value)}/>
            <label>Opis</label>
            <textarea value={description}
                      onChange={(e) => setDescription(e.target.value)}></textarea>
            <button >Zapisz zmiany updateMeetingForm</button>
        </form>
    );
}