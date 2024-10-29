import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface CustomSelectProps {
	register: UseFormRegister<any>;
	errors: FieldErrors;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ register, errors }) => {
	return (
		<div className="form-control">
			<label className="label">
				<span className="label-text font-bold">Issue Type</span>
			</label>
			<select
				data-testid="issue-type-input"
				className={`select select-bordered w-full select-primary ${
					errors.issueType ? "select-error" : ""
				}`}
				{...register("issueType")}
			>
				<option value="" disabled>
					Issue Type?
				</option>
				<option>Bug Report</option>
				<option>Feature Request</option>
				<option>General Inquiry</option>
			</select>
			{errors.issueType && <p className="text-error">Issue Type is required</p>}
		</div>
	);
};

export default CustomSelect;
