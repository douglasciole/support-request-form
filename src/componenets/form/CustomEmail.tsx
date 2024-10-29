import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface CustomSelectProps {
	register: UseFormRegister<any>;
	errors: FieldErrors;
}

const CustomEmail: React.FC<CustomSelectProps> = ({ register, errors }) => {
	return (
		<div className="form-control">
			<label className="label">
				<span className="label-text font-bold">Email Address</span>
			</label>
			<input
				type="email"
				data-testid="email-input"
				placeholder="Email Address"
				className={`input input-bordered input-primary ${
					errors.email ? "input-error" : ""
				}`}
				{...register("email")}
			/>
			{errors.email && typeof errors.email.message === "string" && (
				<p className="text-error">{errors.email.message}</p>
			)}
		</div>
	);
};

export default CustomEmail;
