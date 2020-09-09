import * as React from 'react';

import '../styles/loading.styles.scss';




function Loading() {
  return (
    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
  );
}

export default Loading;
