export default function MeetingsList({meetings, onDelete, onEditMeeting, onAddParticipant, onDeleteParticipant}) {
    return (
        <table>
            <thead>
            <tr>
                <th>Nazwa spotkania</th>
                <th>Opis</th>
                <th>Edytuj spotkanie</th>
                <th>Usuń spotkanie</th>
                <th>Zapisz na spotkanie</th>
                <th>Wypisz z spotkania</th>
            </tr>
            </thead>
            <tbody>
            {
                meetings.map((meeting, index) => <tr key={index}>
                    <td>{meeting.title}</td>
                    <td>{meeting.description}</td>
                    <td>
                        <button type="button" onClick={() => onEditMeeting(meeting)}>Edytuj spotkanie</button>
                    </td>
                    <td>
                        <button type="button" onClick={() => onDelete(meeting)}>Usuń</button>
                    </td>
                    <td>
                        <button type="button" onClick={() => onAddParticipant(meeting)}>Zapisz</button>
                    </td>
                    <td>
                        <button type="button" onClick={() => onDeleteParticipant(meeting)}>Wypisz</button>
                    </td>
                </tr>)
            }
            </tbody>
        </table>
    );
}
