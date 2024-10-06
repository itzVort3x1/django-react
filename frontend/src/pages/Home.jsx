import React from "react";
import { useState, useEffect } from "react";
import api from "../api";

const Home = () => {
	const [notes, setNotes] = useState([]);
	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");

	useEffect(() => {
		getNotes();
	}, []);

	const getNotes = () => {
		api
			.get("/api/notes/")
			.then((res) => res.data)
			.then((data) => {
				setNotes(data);
				console.log(data);
			})
			.catch((err) => alert(err));
	};

	const DeleteNote = (id) => {
		api
			.delete(`/api/notes/delete/${id}`)
			.then((res) => {
				if (res.status === 204) alert("Notes deleted!");
				else alert("Failed to delete node");
			})
			.catch((err) => {
				alert(err);
			});
		getNotes();
	};

	const createNote = (e) => {
		e.preventDefault();
		console.log(e);
		api
			.post("/api/notes/", { content, title })
			.then((res) => {
				if (res.status === 201) alert("Note created!");
			})
			.catch((err) => {
				alert(err);
			});

		getNotes();
	};

	return (
		<div>
			<div>
				<h2>Notes</h2>
			</div>
			<h2>Create a Note</h2>
			<form onSubmit={createNote}>
				<label htmlFor="title">Title: </label>
				<br />
				<input
					type="text"
					id="title"
					name="title"
					required
					onChange={(e) => {
						setTitle(e.target.value);
					}}
					value={title}
				/>
				<br />
				<label htmlFor="content">Content: </label>
				<br />
				<textarea
					id="content"
					name="content"
					required
					onChange={(e) => {
						setContent(e.target.value);
					}}
					value={content}
				/>
				<br />
				<input type="submit" value="Submit"></input>
			</form>
		</div>
	);
};

export default Home;
