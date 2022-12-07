import { config } from "../../devdash_config";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { useGitHubRepository } from "../useGitHubRepository";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryWidget } from "./GitHubRepositoryWidget";

const gitHubRepositoryUrls = config.widgets.map((widget) => widget.repository_url);

export function Dashboard({ repository }: { repository: GitHubRepositoryRepository }) {
	const { repositoryData } = useGitHubRepository(repository, gitHubRepositoryUrls);

	return (
		<>
			<section className={styles.container}>
				{repositoryData.map((repository) => (
					<GitHubRepositoryWidget
						key={`${repository.id.organization}/${repository.id.name}`}
						repository={repository}
					/>
				))}
			</section>
		</>
	);
}
