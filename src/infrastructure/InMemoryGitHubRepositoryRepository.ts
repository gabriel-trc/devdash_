import { githubApiResponses } from "../github_api_responses";

export class InMemoryGitHubRepositoryRepository {
	search(): typeof githubApiResponses {
		//truco para tipar el retorno segun la estructura que se expone en githubApiResponses
		return githubApiResponses;
	}
}
