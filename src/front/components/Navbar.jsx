import { Link } from "react-router-dom";

export const Navbar = () => {

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
							<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
								Dropdown button
							</button>
							<ul className="dropdown-menu">
								<li><a className="dropdown-item" href="#">Action</a></li>
								<li><a className="dropdown-item" href="#">Another action</a></li>
								<li><a className="dropdown-item" href="#">Something else here</a></li>
							</ul>
						</div>
					</form>
				</div>
			</div>
		</nav>
	);
};