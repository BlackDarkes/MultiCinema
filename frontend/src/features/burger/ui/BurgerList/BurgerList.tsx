import { Link } from "react-router";

interface IBurgerListProps {
	list: string[];
}

export const BurgerList = ({ list }: IBurgerListProps) => {
	return (
		<div>
			<ul>
				{list.map((item, index) => (
					<li key={index}>
						<Link to={`/${item}`}>{item}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
