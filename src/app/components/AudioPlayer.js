import React from 'react';

    function AudioPlayer() {
      return (
        <div>
          <audio controls>
            <source src="https://res.cloudinary.com/dnpzcx7ho/video/upload/v1753486533/24C06401_trkiyt.wav" type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    }

    export default AudioPlayer;
