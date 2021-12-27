import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import InfiniteScroll from "react-infinite-scroll-component";

export default function App() {
	const [cardData, setCardData] = React.useState([]);

	const [id, setId] = React.useState(1);
	let list
	let load;
	const loadData = () => {
		fetch(`https://api.pokemontcg.io/v2/cards?page=${id}&pageSize=10`)
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.then((dat) => {
	list = [...cardData, ...dat.data];
				setCardData(list);
				load = dat.totalCount;
				setId(dat.page +1)
				console.log("data", dat);
			})
			.catch((error) => {
				console.log("error while trying to retrieve data", error);
			});
	};

	React.useEffect(() => {
		loadData();
	}, []);
	return (
		<div className="App">
			<Card >
				<InfiniteScroll
					dataLength={cardData.length}
					hasMore={true || false}
					pageStart={0}
					useWindow={false}
					next={id<10 ? ()=>loadData(id): ''}
					endMessage={
						<p style={{ textAlign: "center" }}>
							<b>Yay! You have seen it all</b>
						</p>
					}
					loader={<h4>No More data to load</h4>}
				>
					<Grid container spacing={2}>
						{" "}
						{cardData && cardData.map((card) => (
							<Grid item xs={2} sm={4} md={4}>
								<Card sx={{ maxWidth: 300 }}>
									<CardMedia
										component="img"
										alt="green iguana"
										height="300"
										image={card.images.small}
									/>
									<CardContent>
										<Grid container>
											<Grid item xs={6}>
												<Typography
													gutterBottom
													variant="h5"
													component="div"
													style={{ textAlign: "left" }}
												>
													Name
												</Typography>
											</Grid>
											<Grid item xs={6}>
												<Typography
													style={{ textAlign: "right" }}
													variant="body2"
													color="text.secondary"
												>
													{card.name}
												</Typography>
											</Grid>
										</Grid>
										<Grid container>
											<Grid item xs={6}>
												<Typography
													style={{ textAlign: "left" }}
													gutterBottom
													variant="h5"
													component="div"
												>
													Attacks
												</Typography>
											</Grid>
											<Grid item xs={6}>
												<Typography
													variant="body2"
													style={{ textAlign: "right" }}
													color="text.secondary"
												>
													{card && card.attacks.map((data) => data.name)}
												</Typography>
											</Grid>
										</Grid>
										<Grid container>
											<Grid item xs={6}>
												<Typography
													style={{ textAlign: "left" }}
													gutterBottom
													variant="h5"
													component="div"
												>
													Hp
												</Typography>
											</Grid>
											<Grid item xs={6}>
												<Typography
													style={{ textAlign: "right" }}
													variant="body2"
													color="text.secondary"
												>
													{card.hp}
												</Typography>
											</Grid>
										</Grid>
										<Grid container>
											<Grid item xs={6}>
												<Typography
													style={{ textAlign: "left" }}
													gutterBottom
													variant="h5"
													component="div"
												>
													Abilities
												</Typography>
											</Grid>
											<Grid item xs={6}>
												<Typography
													style={{ textAlign: "right" }}
													variant="body2"
													color="text.secondary"
												>
													{card && card.attacks.map((data) => data.name)}
												</Typography>
											</Grid>
										</Grid>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</InfiniteScroll>
			</Card>
		</div>
	);
}
