import { Link } from "react-router";
import styles from "./HeaderNav.module.scss";

interface IHeaderNavProps {
	list: string[];
}

export const HeaderNav = ({ list }: IHeaderNavProps) => {
	return (
		<ul className={styles.list}>
			{list.map((item, index) => (
				<li key={index}>
					<Link to={`/${item}`} className={styles.listLink}>{item}</Link>
				</li>
			))}
		</ul>
	);
};
