import React from 'react';

const Expand = (props) => {
  const { handleExpand, submit, expand, title } = props;
  return (
    <div>
      {submit && (
        <div className="film-title">
          {title}
          <button
            type="button"
            className="submit-screening-button"
            onClick={() => handleExpand()}
          >
            {expand ? '-' : '+'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Expand;
