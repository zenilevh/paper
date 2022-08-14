import React from 'react';

const Modal = ({ id, description, className }) => (
  <div className={`mr-auto ml-auto w-3/12 ${className}`} id={id}>
    <div className="bg-teal-lightest border-teal text-teal-darkest px-4 py-3 my-2 flex justify-center rounded" role="alert">
      <div className="flex justify-center items-center">
        {/* <svg className="h-5 w-5 text-teal mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg> */}
        <div>
          <p className="text-lg">{description}</p>
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
