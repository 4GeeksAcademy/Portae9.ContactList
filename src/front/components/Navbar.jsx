import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	return (
		<nav className="navbar navbar-expand-sm bg-body-tertiary">
			<div className="container-fluid">
				<Link className="navbar-brand" to="#">Star Wars</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link" to="/characters">Characters</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/starships">Starships</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/planets">Planets</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/contact-list">ContactList</Link>
						</li>
					</ul>
					<form className="d-flex" role="search">
						<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
						<div className="dropdown">
							<button
								className="btn btn-secondary dropdown-toggle"
								type="button"
								data-bs-toggle="dropdown"
							>
								Favoritos ({store.favorites.length})
							</button>

							<ul className="dropdown-menu">
								{store.favorites.length === 0 && (
									<li className="dropdown-item">
										No hay favoritos
									</li>
								)}

								{store.favorites.map((item, index) => (
									<li key={index} className="dropdown-item">
										{item.name} ({item.type})
										<button
											type="button"
											className="btn btn-sm btn-danger ms-2"
											onClick={() => actions.removeFavorite(index)}
										>
											<i className="fa-solid fa-trash-can"></i>
										</button>
									</li>
								))}
							</ul>
						</div>
					</form>
				</div>
			</div>
		</nav>
	);
};