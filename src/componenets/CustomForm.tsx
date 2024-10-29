import { z } from "zod";
import React, { useState, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { schema, FormData } from "./Type";
import { saveInfo } from "../reducer";

import CustomSelect from "./form/CustomSelect";
import CustomTags from "./form/CustomTags";
import CustomSteps from "./form/CustomSteps";
import CustomEmail from "./form/CustomEmail";
import CustomFullName from "./form/CustomFullName";
import Info from "./form/Info";

const CustomForm = () => {
	const [stepDescription, setStepDescription] = useState<string>("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormData>({
		resolver: async (data) => {
			try {
				schema.parse(data);
				return { values: data, errors: {} };
			} catch (e) {
				let fieldErrors = (e as any).formErrors.fieldErrors;
				fieldErrors = Object.keys(fieldErrors).reduce(
					(acc: Record<string, { message: string }>, key) => {
						acc[key] = { message: fieldErrors[key][0] };
						return acc;
					},
					{}
				);
				return { values: {}, errors: fieldErrors };
			}
		},
		defaultValues: {
			fullName: "",
			email: "",
			issueType: "",
			tags: [],
			steps: [],
		},
	});

	const onSubmit = useCallback(async (data: any) => {
		const newInfo = {
			fullName: data.fullName,
			email: data.email,
			issueType: data.issueType,
			tags: data.tags,
			steps: data.steps,
		};

		dispatch(saveInfo(newInfo));
		navigate("/confirm");
	}, []);

	const addStep = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			append({ title: stepDescription });
			setStepDescription("");
		},
		[stepDescription]
	);

	const rmStep = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>, index: number) => {
			e.preventDefault();
			remove(index);
		},
		[]
	);

	const { fields, append, remove } = useFieldArray({
		control,
		name: "steps",
	});

	return (
		<div className="hero bg-base-200 min-h-screen">
			<div className="hero-content flex-col lg:flex-row-reverse">
				{/* Info Section */}
				<Info />

				<div className="card bg-base-100 w-full max-w-4xl shrink-0 shadow-2xl">
					<form onSubmit={handleSubmit(onSubmit)} className="card-body">
						<div className="flex w-full flex-col lg:flex-row">
							<div className="card rounded-box grid flex-grow">
								{/* Full Name Section */}
								<CustomFullName register={register} errors={errors} />

								{/* Email Section */}
								<CustomEmail register={register} errors={errors} />

								{/* Issue Type Section */}
								<CustomSelect register={register} errors={errors} />

								{/* Tags Section */}
								<CustomTags register={register} errors={errors} />
							</div>
							<div className="divider divider-horizontal divider-primary"></div>
							<div className="card rounded-box grid flex-grow">
								{/* Steps Section */}
								<CustomSteps
									addStep={addStep}
									errors={errors}
									fields={fields}
									rmStep={rmStep}
									setStepDescription={setStepDescription}
									stepDescription={stepDescription}
								/>
							</div>
						</div>
						<div className="form-control mt-6">
							<button data-testid="submit-button" className="btn btn-primary">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CustomForm;
