import React, { useEffect } from 'react';

export default function ButtonOne(props) {
  useEffect(() => {
    const button = document.querySelector('.first_button');
    
    if (button) {
      button.addEventListener('click', () => {
        console.log('clicked');
      });
    }

    // Cleanup: Remove event listener when component unmounts
    return () => {
      if (button) {
        button.removeEventListener('click', () => {
          console.log('clicked');
        });
      }
    };
  }, []); // Runs only once when component mounts

  return (
    <div className="first_button">Hello I am a div {props.title}</div>
  );
}


