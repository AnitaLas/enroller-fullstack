import {useEffect, useLayoutEffect, useState} from "react";
import NewMeetingForm from "./NewMeetingForm";
import UpdateMeetingForm from "./UpdateMeetingForm";
import MeetingsList from "./MeetingsList";

export default function MeetingsPage({username}) {
    const [meetings, setMeetings] = useState([]);
    const [addingNewMeeting, setAddingNewMeeting] = useState(false);

    const [meeting, setMeeting] = useState();
    const [editMeeting, setEditMeeting] = useState(false);

    useEffect(() => {
        const fetchMeetings = async () => {
            const response = await fetch(`/api/meetings`);
            if (response.ok) {
                const meetings = await response.json();
                setMeetings(meetings);
            }
        };
        fetchMeetings();
    }, []);

    async function handleNewMeeting(meeting) {
        const response = await fetch('/api/meetings', {
            method: 'POST',
            body: JSON.stringify(meeting),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            const newMeeting = await response.json();
            const nextMeetings = [...meetings, newMeeting];
            setMeetings(nextMeetings);
            setAddingNewMeeting(false);
        }
    }

    async function handleGetMeeting(meeting) {
        const response = await fetch(`/api/meetings/${meeting.id}`, {
            method: 'GET',
        });

        if (response.ok) {
            setAddingNewMeeting(false);
            setMeeting(meeting);
            setEditMeeting(true);
        }
    }

    async function handleUpdateMeeting(meeting) {
        const response = await fetch(`/api/meetings/${meeting.id}`, {
            method: 'PUT',
            body: JSON.stringify(meeting),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            // może da się odświeżyć tylko jeden element? - poszukać info
            const meetingsFromDb = await fetch('/api/meetings');
            const meetingsFromDbAsOojJS = await meetingsFromDb.json();
            setMeetings(meetingsFromDbAsOojJS);

            setEditMeeting(false);
        }
    }

    async function handleDeleteMeeting(meeting) {
        const response = await fetch(`/api/meetings/${meeting.id}`, {
            method: 'DELETE',

        });
        if (response.ok) {
            const nextMeetings = meetings.filter(m => m !== meeting);
            setMeetings(nextMeetings);
        }
    }

    async function handleAddParticipant(meeting) {
        const response = await fetch(`/api/meetings/${meeting.id}/participants`, {

            method: 'POST',
            body: JSON.stringify({login: username}),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            console.log("oki")
            setAddingNewMeeting(false);
        }
    }

    async function handleDeleteParticipant(meeting) {
        const response = await fetch(`/api/meetings/${meeting.id}/participants/${username}`, {
            method: 'DELETE',
        });
        if (response.ok) {

        }
    }

    async function handleCancelUpdateMeeting(meeting) {
        setEditMeeting(false)
    }

    return (
        <div>
            <h2>Zajęcia ({meetings.length})</h2>
            {
                addingNewMeeting
                    ? <NewMeetingForm meeting={meeting} onSubmit={(meeting) => handleNewMeeting(meeting)}/>
                    : <button onClick={() => setAddingNewMeeting(true)}>Dodaj nowe spotkanie</button>
            }
            {
                // editMeeting
                //     ? <UpdateMeetingForm
                //         key={meeting?.id}
                //         meeting={meeting}
                //         onSubmit={(meeting) => handleUpdateMeeting(meeting)}
                //         onCancel={(meeting) => handleCancelUpdateMeeting(meeting)}/>
                //     : <button>do zmiany</button>

                editMeeting && (
                    <UpdateMeetingForm
                        key={meeting?.id}
                        meeting={meeting}
                        onSubmit={(meeting) => handleUpdateMeeting(meeting)}
                        onCancel={handleCancelUpdateMeeting}
                    />
                )
            }
            {meetings.length > 0 &&
                <MeetingsList meetings={meetings} username={username}
                              onEditMeeting={handleGetMeeting}
                              onDelete={handleDeleteMeeting}
                              onAddParticipant={handleAddParticipant}
                              onDeleteParticipant={handleDeleteParticipant}/>}
        </div>
    )
}
