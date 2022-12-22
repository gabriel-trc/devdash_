import { Outlet } from "react-router-dom";

import { ReactComponent as Brand } from "./brand.svg";
import { ErrorBoundary } from "./ErrorBoundary";
import styles from "./Layout.module.scss";

// El ErrorBoundary se utiliza para wrappear la parte de la aplicación que queremos protejer. Pueden haber varios ErrorBoundary
export function Layout() {
	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>DevDash_</h1>
				</section>
			</header>
			<ErrorBoundary>
				<Outlet />
			</ErrorBoundary>
		</>
	);
}
