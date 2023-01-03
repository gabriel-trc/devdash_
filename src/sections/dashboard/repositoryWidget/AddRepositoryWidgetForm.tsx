import React, { useState } from "react";

import { ReactComponent as Add } from "../../../assets/svgs/add.svg";
import { RepositoryWidgetRepository } from "../../../domain/RepositoryWidgetRepository";
import styles from "./AddRepositoryWidgetForm.module.scss";
import { useAddRepositoryWidget } from "./useAddRepositoryWidget";

type FormEvent<T> = React.FormEvent<HTMLFormElement> & {
	target: { elements: { [key in keyof T]: { value: T[key] } } };
};

type FormFields = { id: string; repositoryUrl: string };

function isValidHttpUrl(repositoryUrl: string): boolean {
	try {
		const url = new URL(repositoryUrl);
		return (
			url.host.toLowerCase().startsWith("github.com") &&
			(url.protocol === "http:" || url.protocol === "https:")
		);
	} catch (error) {
		return false;
	}
}

export function AddRepositoryWidgetForm({
	repository,
}: {
	repository: RepositoryWidgetRepository;
}) {
	const [formValues, setFormValues] = useState<FormFields>({ id: "", repositoryUrl: "" });
	const [isFormDisabled, setIsFormDisabled] = useState(true);
	const [isFormActive, setIsFormActive] = useState(false);
	const [hasAlreadyExistsError, setHasAlreadyExistsError] = useState(false);
	const { save } = useAddRepositoryWidget(repository);

	const submitForm = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		//const { id, repositoryUrl } = ev.target.elements;
		const error = await save(formValues);
		setHasAlreadyExistsError(Boolean(error));
		setIsFormActive(false);
	};

	function handleOnChangeFormField(ev: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = ev.target;
		setFormValues((prevValue) => ({ ...prevValue, [name]: value }));
		setIsFormDisabled(!isValidHttpUrl(formValues.repositoryUrl));
	}

	return (
		<article className={styles.add_widget}>
			<div className={styles.container}>
				{!isFormActive && !hasAlreadyExistsError ? (
					<button onClick={() => setIsFormActive(true)} className={styles.add_button}>
						<Add />
						<p>Añadir repositorio</p>
					</button>
				) : (
					<form className={styles.form} onSubmit={submitForm}>
						<div>
							<label htmlFor="id">Id</label>
							<input
								type="text"
								name="id"
								id="id"
								value={formValues.id}
								onChange={handleOnChangeFormField}
							/>
						</div>
						<div>
							<label htmlFor="repositoryUrl">Url del repositorio</label>
							<input
								type="text"
								name="repositoryUrl"
								id="repositoryUrl"
								value={formValues.repositoryUrl}
								onChange={handleOnChangeFormField}
							/>
						</div>
						{hasAlreadyExistsError && (
							<p className={styles.error} role="alert" aria-describedby="duplicated-error">
								<span id="duplicated-error">Repositorio duplicado</span>
							</p>
						)}
						<div>
							<input type="submit" value="Añadir" disabled={isFormDisabled} />
						</div>
					</form>
				)}
			</div>
		</article>
	);
}
