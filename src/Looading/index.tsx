import React from 'react';
import PropTypes from 'prop-types';
import './index.css'
Loading.propTypes = {
    
};

function Loading() {
    return (
    <div className='group-loading'>
         <div className="loaders"></div>
     <div className="loader">
        <span></span>
      </div>
        </div>
        

        // <div className='group-loading'>
        // <div class="loader"></div>
        // </div>
      
    );
}

export default Loading;