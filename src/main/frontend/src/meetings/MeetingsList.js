export default function MeetingsList({meetings, onDelete, onAddParticipant, onDeleteParticipant}) {
    return (
        <table>
            <thead>
            <tr>
                <th>Nazwa spotkania</th>
                <th>Opis</th>
                <th>Usuń spotkanie</th>
                <th>Zapisz mnie na spotkanie</th>
                <th>Wypisz mnie z spotkania</th>
            </tr>
            </thead>
            <tbody>
            {
                meetings.map((meeting, index) => <tr key={index}>
                    <td>{meeting.title}</td>
                    <td>{meeting.description}</td>
                    <td><button type="button" onClick={() => onDelete(meeting)}>Usuń</button></td>
                    <td><button type="button" onClick={() => onAddParticipant(meeting)}>Zapisz</button></td>
                    <td><button type="button" onClick={() => onDeleteParticipant(meeting)}>Wypisz</button></td>
                </tr>)
            }
            </tbody>
        </table>
    );
}
