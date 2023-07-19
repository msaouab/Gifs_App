import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "UC6QeKH1sTZwo7OgHc1oAJJu4JFV59TJ";

interface Gif {
	images: {
		original: {
			url: string;
		};
	};
	title: string;
}

interface GifApiInterface {
	data: Gif[];
}

const FromStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-bottom: 5rem;
	gap: 2rem;
	& > h1 {
		color: #fff;
		border: 1px solid #fff;
		padding: 1rem 2rem;
		text-transform: uppercase;
		margin-top: 2rem;
		text-align: center;
	}
	& > form {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: .2rem;
		& > input,
		button {
			padding: 1rem;
			font-size: 1rem;
			border: 1px solid #fff;
			background: rgba(217, 217, 217, 0);
			color: #d0d6f9;
		}
		& > input {
			width: 30em;
			outline: none;
		}
		& > button {
			cursor: pointer;
			text-transform: uppercase;
		}
	}
	@media (max-width: 768px) {
		& > form {
			gap: 1rem;
			& > input {
				width: 80%;
			}
			& > button {
				width: 80%;
			}
		}
	}
`;

const GifStyle = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	gap: 2rem;
	& > .imgContainer {
		border: 2px solid #fff;
		& > img {
			width: 300px;
			aspect-ratio: 1;
			max-width: 100%;
			box-sizing: border-box;
		}
		& > button {
			background: transparent;
			border: none;
			color: #fff;
			cursor: pointer;
			position: absolute;
			left: 150px;
			top: 90%;
		}
	}
	@media (max-width: 300px) {
		& > .imgContainer {
			width: 80%;
		}
	}
`;

const Form = () => {
	const [input, setInput] = useState("");
	const [data, setData] = useState("");
	const [gif, setGif] = useState<Gif[] | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setInput(e.target.value);
	};

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setData(input);
		setInput("");
	};

	useEffect(() => {
		const getData = (data: string) => {
			axios
				.get<GifApiInterface>(
					`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${data}&limit=25&offset=0&rating=g&lang=e`
				)
				.then((res) => {
					setGif(res.data.data);
				})
				.catch((err) => {
					console.log("Error fetching GIFs: ", err);
				});
		};
		if (data) getData(data);
	}, [data]);

	return (
		<FromStyle>
			<h1>Choose your GIFs</h1>
			<form>
				<input
					type="text"
					name="test"
					id="test"
					onChange={handleChange}
					placeholder="Find your GIF"
					value={input}
					autoComplete="off"
				/>
				<button type="submit" onClick={handleClick}>
					search
				</button>
			</form>
			<GifStyle>
				{gif?.map((item: Gif, index: number) => (
					<a
						className="imgContainer"
						key={index}
						href={item.images.original.url}
						download={`gif_${index}`}
						target="_blanc"
					>
						<img src={item.images.original.url} alt={item.title} />
					</a>
				))}
			</GifStyle>
		</FromStyle>
	);
};

export default Form;
