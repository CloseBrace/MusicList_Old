import React from 'react';

import Sidebar from '../shared/Sidebar';

export default function HomePage() {
  return (
    <div className="row">
      <div className="col-sm-12 col-lg-8">
        This is the home page.
      </div>
      <Sidebar />
    </div>
  );
}
