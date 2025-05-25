export default function MeetingsList({meetings, onDelete, onAddParticipant}) {
    return (
        <table>
            <thead>
            <tr>
                <th>Nazwa spotkania</th>
                <th>Opis</th>
                <th>Usuń spotkanie</th>
                <th>Dodaj uczestnika</th>
                <th>Usuń uczestnika</th>
            </tr>
            </thead>
            <tbody>
            {
                meetings.map((meeting, index) => <tr key={index}>
                    <td>{meeting.title}</td>
                    <td>{meeting.description}</td>
                    <td><button type="button" onClick={() => onDelete(meeting)}>USUŃ</button></td>
                    <td><button type="button" onClick={() => onAddParticipant(meeting)}>DODAJ</button></td>
                    <td><button type="button" onClick={() => onDelete(meeting)}>USUŃ</button></td>
                </tr>)
            }
            </tbody>
        </table>
    );
}
