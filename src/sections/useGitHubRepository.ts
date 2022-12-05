import { useEffect, useState } from "react";
import { GitHubRepository } from "../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "../domain/GitHubRepositoryRepository";

export function useGitHubRepository(
	repository: GitHubRepositoryRepository,
	repositoryUrls: string[]
): { repositoryData: GitHubRepository[] } {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository[]>([]);

	useEffect(() => {
		repository.search(repositoryUrls).then((responses) => setRepositoryData(responses));
	}, [repository, repositoryUrls]);

	return { repositoryData };
}
