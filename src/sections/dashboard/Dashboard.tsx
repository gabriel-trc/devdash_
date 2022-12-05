import { config } from "../../devdash_config";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { useGitHubRepository } from "../useGitHubRepository";
import { ReactComponent as Brand } from "./brand.svg";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryWidget } from "./GitHubRepositoryWidget";

const gitHubRepositoryUrls = config.widgets.map((widget) => widget.repository_url);

export function Dashboard({ repository }: { repository: GitHubRepositoryRepository }) {
	const { repositoryData } = useGitHubRepository(repository, gitHubRepositoryUrls);

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>DevDash_</h1>
				</section>
			</header>
			<section className={styles.container}>
				{repositoryData.map((widget) => (
					<GitHubRepositoryWidget
						key={`${widget.id.organization}/${widget.id.name}`}
						widget={widget}
					/>
				))}
			</section>
		</>
	);
}
