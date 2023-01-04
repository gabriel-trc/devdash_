import { useEffect, useState } from "react";

import { GitHubRepository } from "../../../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "../../../domain/GitHubRepositoryRepository";
import { UIEvents } from "../../UIEvents";

export function useGitHubRepositories(
	repository: GitHubRepositoryRepository,
	repositoryUrls: string[]
): {
	gitHubRepositories: GitHubRepository[];
	isLoading: boolean;
} {
	const [gitHubRepositories, setGitHubRepositories] = useState<GitHubRepository[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		repository.search(repositoryUrls).then((repositoryData) => {
			setGitHubRepositories(repositoryData);
			setIsLoading(false);
			document.dispatchEvent(new CustomEvent(UIEvents.pageRenderedComplete));
		});
	}, [repository, repositoryUrls]);

	return { gitHubRepositories, isLoading };
}
