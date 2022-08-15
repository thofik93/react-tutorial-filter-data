import React from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns'

const User = (props) => {
    const { user } = props;
    const fullname = `${user.name.first} ${user.name.last}`;
    return (
		<tr>
            <td>{user.login.username}</td>
            <td>{fullname}</td>
            <td>{user.email}</td>
            <td>{user.gender}</td>
            <td>{format(parseISO(user.registered.date), 'MM/dd/yy kk:ss')}</td>
        </tr>
    )
}

User.propTypes = {
	user: PropTypes.object,
};

export default User