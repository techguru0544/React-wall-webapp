import React from 'react';
import { Dots } from 'react-activity';

function LoadingOrError({loading, loadingMsg, err, errMsg, style}) {
  if(loading){
    return(
      <div className="loading-container">
        <div className="loading-title" style={style}>
          {loadingMsg}
        </div>
        <Dots />
      </div>
    );
  } else if (err) {
    return(
      <div className="loading-container">
        <div className="loading-error">
          Error: {errMsg}
        </div>
      </div>
    );
   } else {
    return null
  }
}

export default LoadingOrError;

