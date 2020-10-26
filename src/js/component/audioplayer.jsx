import React, { useState, useEffect } from "react";

export function AudioComponent() {
	// const [audioLibrary, setAudioLibrary] = useState([]);
	const [song, setSong] = useState("files/mario/songs/castle.mp3");
	const songURL = "https://assets.breatheco.de/apis/sound/";
	const [fullLink, setFullLink] = useState("");
	const [audioLibrary, setAudioLibrary] = useState([]);
	let songsNames = [];
	console.log(audioLibrary);
	const [cancion, setcancion] = useState(songURL + song);

	function myListgnerator() {
		for (let index = 0; index < audioLibrary.length; index++) {
			songsNames.push(
				<li
					key={index}
					onClick={() => {
						setSong(audioLibrary[index].url);
						myAudio.load();
						myAudio.play();
					}}>
					{audioLibrary[index].name}
				</li>
			);
		}
		return songsNames;
	}

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/sound/all")
			.then(response => {
				console.log("patata");
				return response.json(); //devuelve un objeto
			})
			.then(responseAsJson => {
				console.log(responseAsJson);
				setAudioLibrary(responseAsJson["data/songs.json"]); //entre corchetes la key del object como valor un array con las canciones!!
			});
	}, []);
	let myAudio = document.querySelector("#myAudioTag");

	if (audioLibrary.length == 0) {
		return "loading";
	} else {
		return (
			<div>
				<ul>{myListgnerator()}</ul>
				<audio id="myAudioTag">
					<source src={songURL + song} />
					{(console.log(songURL + song), "ESTO ES SONGURL + SONG")}
				</audio>
				<button onClick={() => myAudio.play()}>Play</button>
				{console.log(cancion, "ESTO ES EL PLAY")}
				<button onClick={() => myAudio.pause()}>Pause</button>
				<button onClick={() => (cancion.currentTime = 0)}>
					Rewind
				</button>
				<button
					onClick={() => {
						setSong(audioLibrary[0 + 1].url);
						console.log(
							audioLibrary[0 + 1].url,
							"ESTO ES NEXT SONG"
						);
						myAudio.load();
						myAudio.play();
					}}>
					Next
				</button>
			</div>
		);
	}
}
