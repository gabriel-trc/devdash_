import { config } from "./devdash_config";
import { GitHubApiGitHubRepositoryRepository } from "./infrastructure/GitHubApiGitHubRepositoryRepository";
import { Dashboard } from "./sections/dashboard/Dashboard";

export function App() {
	const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);

	return (
		<div className="App">
			<Dashboard repository={repository} />
		</div>
	);
}
