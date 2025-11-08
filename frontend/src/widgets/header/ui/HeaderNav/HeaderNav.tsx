import { Link } from "react-router";

interface IHeaderNavProps {
	list: string[];
}

export const HeaderNav = ({ list }: IHeaderNavProps) => {
	return (
		<ul>
			{list.map((item, index) => (
				<li key={index}>
					<Link to={`/${item}`}>{item}</Link>
				</li>
			))}
		</ul>
	);
};
