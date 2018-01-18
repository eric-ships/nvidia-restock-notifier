import React, { Component } from 'react';
import styled from 'styled-components';

const AppWrapper = styled.div`
  border: 5px solid blue;
`;

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <header>
          <h1>Nvidia Restock Notifier</h1>
        </header>
      </AppWrapper>
    );
  }
}

export default App;
