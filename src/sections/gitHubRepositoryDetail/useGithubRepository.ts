import { useEffect, useState } from "react";

import { GitHubRepository, RepositoryId } from "../../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { UIEvents } from "../UIEvents";

export function useGitHubRepository(
	repository: GitHubRepositoryRepository,
	repositoryId: RepositoryId
): {
	repositoryData: GitHubRepository | undefined;
} {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository>();

	useEffect(() => {
		repository.byId(repositoryId).then((repositoryData) => {
			setRepositoryData(repositoryData);
			document.dispatchEvent(new CustomEvent(UIEvents.pageRenderedComplete));
		});
	}, [repository, repositoryId]);

	return { repositoryData };
}
