import React from 'react';
import { Card, CardBlock, CardText } from 'reactstrap';

export default function Sidebar() {
  return (
    <aside className="col-sm-12 col-md-4">
      <Card>
        <CardBlock>
          <CardText>
            Sidebar Item
          </CardText>
        </CardBlock>
      </Card>
    </aside>
  );
}
