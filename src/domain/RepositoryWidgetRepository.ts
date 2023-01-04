import { RepositoryAlreadyExistsError } from "./RepositoryAlreadyExistsError";
import { RepositoryWidget } from "./RepositoryWidget";

export interface RepositoryWidgetRepository {
	save(widget: RepositoryWidget): Promise<RepositoryAlreadyExistsError | void>;
	search(): Promise<RepositoryWidget[]>;
}
