from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import hashlib

app = Flask(__name__)

app.config[ 'SECRET_KEY' ] = 'jsbcfsbfjefebw237u3gdbdc'
socketio = SocketIO( app )

@app.route( '/' )
def hello():
  return render_template( './ChatApp.html' )

@socketio.on( 'my event' )
def handle_my_custom_event( json ):
    socketio.emit( 'my response', json)

if __name__ == '__main__':
  socketio.run(app, host='0.0.0.0',port="80",debug=True)
