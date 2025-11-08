import type { ReactNode } from "react";
import styles from "./Container.module.scss";

interface IContainerProps {
	children: ReactNode;
}

export const Container = ({ children }: IContainerProps) => {
	return <div className={styles.container} >{children}</div>;
};
