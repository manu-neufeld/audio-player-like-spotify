import React, { useState, useEffect } from "react";

export function AudioComponent() {
	const [song, setSong] = useState("files/mario/songs/castle.mp3");
	const songURL = "https://assets.breatheco.de/apis/sound/";
	const [audioLibrary, setAudioLibrary] = useState([]);
	let songsNames = [];

	function myListgnerator() {
		for (let index = 0; index < audioLibrary.length; index++) {
			songsNames.push(
				<li
					className="item"
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

	const previousSong = () => {
		for (let index = 0; index < audioLibrary.length; index++) {
			if (audioLibrary[index].url == song) {
				setSong(audioLibrary[index - 1].url);
			}
		}
	};

	const nextSong = () => {
		for (let index = 0; index < audioLibrary.length; index++) {
			if (audioLibrary[index].url == song) {
				setSong(audioLibrary[index + 1].url);
			}
		}
	};

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/sound/all")
			.then(response => {
				return response.json();
			})
			.then(responseAsJson => {
				setAudioLibrary(responseAsJson["data/songs.json"]);
			});
	});
	let myAudio = document.querySelector("#myAudioTag");

	if (audioLibrary.length == 0) {
		return "loading";
	} else {
		return (
			<div className="audio-list">
				<ul>{myListgnerator()}</ul>
				<audio id="myAudioTag">
					<source src={songURL + song} />
				</audio>
				<div className="controlBtn">
					<button className="playBtn" onClick={() => myAudio.play()}>
						Play
					</button>
					<button
						className="pauseBtn"
						onClick={() => myAudio.pause()}>
						Pause
					</button>
					<button
						onClick={() => {
							previousSong();
							myAudio.load();
							myAudio.play();
						}}>
						<i className="fas fa-backward" />
					</button>
					<button
						onClick={() => {
							nextSong();
							myAudio.load();
							myAudio.play();
						}}>
						<i className="fas fa-forward" />
					</button>
				</div>
			</div>
		);
	}
}
