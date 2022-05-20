import React from 'react';
import './successfullyAddedUser.css';

export default function AddedUser() {
    return (
      <div>
        <h1 id="text">Successfully Added User!</h1>
        <form action="/addUser">
          <button className="submitButton">Go Back</button>
        </form>
      </div>
    )
  }

  