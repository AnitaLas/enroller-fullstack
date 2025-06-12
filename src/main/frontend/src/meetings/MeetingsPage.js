import {useEffect, useLayoutEffect, useState} from "react";
import NewMeetingForm from "./NewMeetingForm";
import UpdateMeetingForm from "./UpdateMeetingForm";
import MeetingsList from "./MeetingsList";

export default function MeetingsPage({username}) {
    const [meetings, setMeetings] = useState([]);
    const [addingNewMeeting, setAddingNewMeeting] = useState(false);
    const [meeting, setMeeting] = useState();

    const [editMeeting, setEditMeeting] = useState(false);
    const [updateMeeting, setUpdateMeeting] = useState();

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

    async function handleGetMeeting(updateMeeting) {

        const response = await fetch(`/api/meetings/${updateMeeting.id}`, {
            method: 'GET',
        });

        if (response.ok) {
            setUpdateMeeting(updateMeeting)
            // console.log("GET updateMeeting " + updateMeeting.id)
            setEditMeeting(true)
        }
    }


    async function handleUpdateMeeting(updateMeeting) {

        // console.log("123 meeting " + meeting.id)
        console.log("PUT meeting " + updateMeeting.id)
        const response = await fetch(`/api/meetings/${updateMeeting.id}`, {
        // const response = await fetch(`/api/meetings/2`, {
            method: 'PUT',
            body: JSON.stringify(updateMeeting),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {

            setEditMeeting(false);
            setUpdateMeeting(null);

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

    // let meetingId = meeting.id;
    console.log("meetingId: " + meeting.id);
    // console.log("username: " + username) ;

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

    // let meetingId = meeting.id;
    console.log("meetingId: " + meeting.id);
    // console.log("username: " + username) ;

    const response = await fetch(`/api/meetings/${meeting.id}/participants/${username}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        // const nextMeetings = meetings.filter(m => m !== meeting);
        // setMeetings(nextMeetings);
    }
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
            // ? <UpdateMeetingForm meeting={meeting}
            //                      setUpdateMeeting ={setEditMeeting}
            //                      onUpdateMeeting={(meeting) => handleGetMeeting(meeting)}/>
            // : <button >Zapisz zmiany</button>
            editMeeting
            ? <UpdateMeetingForm meeting={updateMeeting}
                                 setUpdateMeeting ={setEditMeeting}
                                 onSubmit={(updateMeeting) => handleUpdateMeeting(updateMeeting)}/>
                : <button>??????????</button>




        }
        {meetings.length > 0 &&
            <MeetingsList meetings={meetings} username={username}
                // onUpdateMeeting={ha}
                          onEditMeeting={handleGetMeeting}
                          onDelete={handleDeleteMeeting}
                          onAddParticipant={handleAddParticipant}
                          onDeleteParticipant={handleDeleteParticipant}/>}
    </div>
)
}
