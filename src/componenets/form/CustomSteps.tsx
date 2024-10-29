import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface CustomSelectProps {
	errors: FieldErrors;
	stepDescription: string;
	setStepDescription: (value: string) => void;
	addStep: (e: React.MouseEvent<HTMLButtonElement>) => void;
	rmStep: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
	fields: { title: string }[];
}

const CustomSteps: React.FC<CustomSelectProps> = ({
	errors,
	stepDescription,
	setStepDescription,
	addStep,
	rmStep,
	fields,
}) => {
	return (
		<div className="form-control">
			<label className="label">
				<span className="label-text font-bold">Steps to Reproduce</span>
			</label>
			<label
				className={`input input-bordered flex items-center gap-2 input-primary ${
					errors.steps ? "input-error" : ""
				}`}
			>
				<input
					value={stepDescription}
					data-testid="steps-input"
					onChange={(e) => setStepDescription(e.target.value)}
					type="text"
					className="grow"
					placeholder="Step"
				/>
				<button
					onClick={addStep}
					data-testid="add-button-input"
					className="btn btn-sm btn-primary"
				>
					add
				</button>
			</label>

			<div className="form-control">
				{errors.steps && typeof errors.steps.message === "string" && (
					<p className="text-error">{errors.steps.message}</p>
				)}
				<ul className="steps steps-vertical">
					{fields.map((step, index) => (
						<li key={index} className="step step-primary">
							<span className="label cursor-pointer">
								<span className="label-text mr-5">{step.title}</span>
								<button
									data-testid="rm-button"
									onClick={(e) => rmStep(e, index)}
									className="btn btn-xs btn-error"
								>
									X
								</button>
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default CustomSteps;
