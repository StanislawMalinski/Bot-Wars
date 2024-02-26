

function ProfileInfoTableAchivments(props) {
    const {playerId} = props;

    return (
        <table>
            <tr>
                <th>Achivments</th>
            </tr>
            <tr>
                <td>{playerId}</td>
            </tr>
        </table>
    );
}

export default ProfileInfoTableAchivments;