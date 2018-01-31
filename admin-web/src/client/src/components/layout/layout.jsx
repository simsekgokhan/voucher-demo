
import io from 'socket.io-client';
import React from 'react';
import './layout.styles';

const socket = io('http://192.168.1.250:3001');

class Layout extends React.Component {
  componentWillMount() {
    socket.on('eventClient', (data) => {
      alert(`Transaction was created. Value = ${data}`);
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <main className="main">
            Я ОДИНОКАЯ СТРАНИЧКА :(
          </main>
        </div>
      </div>
    );
  }
}
export default Layout;
