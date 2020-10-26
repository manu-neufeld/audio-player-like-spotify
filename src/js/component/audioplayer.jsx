import React, { useState } from "react";
import AudioPlayer from "react-h5-audio-player";

import ReactAudioPlayer from "react-audio-player";

export function AudioComponent() {
	const AudioURls = [
		{
			myAudio: new Audio(
				"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
			)
		},
		{
			myAudio: new Audio(
				"https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3"
			)
		}
	];
	const [song, setSong] = useState(AudioURls[0].myAudio);

	return (
		<div>
			<audio>
				<source src={song} />
			</audio>
			<button onClick={() => song.play()}>Play</button>
			<button onClick={() => song.pause()}>Pause</button>
			<button onClick={() => (song.currentTime = 0)}>Rewind</button>
			<button
				onClick={() => {
					setSong(AudioURls[0 + 1].myAudio);
					song.load();
				}}>
				Next
			</button>
		</div>
	);
}
