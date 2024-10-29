import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface CustomSelectProps {
	register: UseFormRegister<any>;
	errors: FieldErrors;
}

const CustomFullName: React.FC<CustomSelectProps> = ({ register, errors }) => {
	return (
		<div className="form-control">
			<label className="label">
				<span className="label-text font-bold">Full Name</span>
			</label>
			<input
				type="text"
				data-testid="full-name-input"
				placeholder="Full Name"
				className={`input input-bordered input-primary ${
					errors.fullName ? "input-error" : ""
				}`}
				{...register("fullName")}
			/>
			{errors.fullName && (
				<p className="text-error">
					{typeof errors.fullName.message === "string"
						? errors.fullName.message
						: ""}
				</p>
			)}
		</div>
	);
};

export default CustomFullName;
