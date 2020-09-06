import * as React from 'react';

import '../styles/notifications.styles.scss';

interface Props {
  isActive: boolean;
  message: string;
}

function Notifications(props: Props) {
  const { } = props;

  return (
    <div className={`notification p-2 ${props.isActive ? 'notification--active' : 'notification--inactive'}`}>
      <span className='notification__message'>
        {props.message}
      </span>
    </div>
  );
}

export default Notifications;
