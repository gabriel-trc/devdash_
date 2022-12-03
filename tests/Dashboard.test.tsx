import { render, screen } from "@testing-library/react";
import { githubApiResponses } from "../src/github_api_responses";

import { GitHubApiGitHubRepositoryRepository } from "../src/infrastructure/GitHubApiGitHubRepositoryRepository";
import { Dashboard } from "../src/sections/dashboard/Dashboard";

jest.mock("../src/infrastructure/GitHubApiGitHubRepositoryRepository");
const mockRepository =
	GitHubApiGitHubRepositoryRepository as jest.Mock<GitHubApiGitHubRepositoryRepository>;

describe("Dashboard section", () => {
	it("show all widgets", async () => {
		mockRepository.mockImplementationOnce(() => {
			return {
				search: () => Promise.resolve(githubApiResponses),
			} as unknown as GitHubApiGitHubRepositoryRepository;
			// Este casteo a unknown es porque no se implementaron todas las funcionalidades del GitHubApiGitHubRepositoryRepository, ej. searchBy, urlToId.
		});

		render(<Dashboard />);
		const firstWidgetTitle = `${githubApiResponses[0].repositoryData.organization.login}/${githubApiResponses[0].repositoryData.name}`;

		const firstWidgetHeader = await screen.findAllByRole("heading", {
			name: new RegExp(firstWidgetTitle, "i"),
		});
		expect(firstWidgetHeader).toBeInTheDocument();
	});

	// it("show not results message when there are no widgets", async () => {
	// 	mockRepository.search.mockResolvedValue([]);

	// 	render(<Dashboard repository={mockRepository} />);

	// 	const noResults = await screen.findByText(new RegExp("No hay widgets configurados", "i"));

	// 	expect(noResults).toBeInTheDocument();
	// });

	// it("show last modified date in human readable format", async () => {
	// 	const gitHubRepository = GitHubRepositoryMother.create({ updatedAt: new Date() });

	// 	mockRepository.search.mockResolvedValue([gitHubRepository]);

	// 	render(<Dashboard repository={mockRepository} />);

	// 	const modificationDate = await screen.findByText(new RegExp("today", "i"));

	// 	expect(modificationDate).toBeInTheDocument();
	// });
});
