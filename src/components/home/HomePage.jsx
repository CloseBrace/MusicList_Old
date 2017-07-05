import React from 'react';
import { Button } from 'reactstrap';

import Sidebar from '../shared/Sidebar';

const showAlert = () => {
  alert('You clicked the button. Well done, Draco!');
};

export default function HomePage() {
  return (
    <div className="row">
      <div className="col-sm-12 col-md-8">
        <p>
          This is the home page.
        </p>
        <p>
          Here for your enjoyment is a button:
        </p>
        <Button onClick={showAlert}>Click Me</Button>
      </div>
      <Sidebar />
    </div>
  );
}
