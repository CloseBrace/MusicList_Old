import React from 'react';

export default function ProfilePage(props) {
  const { match } = props;
  return (
    <section className="page-content">
      <div className="row">
        <div className="col-sm-12 col-lg-8">
          This is the profile page. The profile id is: {match.params.id}
        </div>
        <aside className="col-sm-12 col-lg-4">
          This is the profile page sidebar.
        </aside>
      </div>
    </section>
  );
}
