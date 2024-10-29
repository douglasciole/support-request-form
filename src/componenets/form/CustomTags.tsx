import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const tagOptions = ["UI", "Backend", "Performance"];

interface CustomSelectProps {
	register: UseFormRegister<any>;
	errors: FieldErrors;
}

const CustomTags: React.FC<CustomSelectProps> = ({ register, errors }) => {
	return (
		<div className="form-control">
			<label className="label">
				<span data-testid="tags-input" className="label-text font-bold">
					Tags
				</span>
			</label>
			{tagOptions.map((tag) => (
				<label key={tag} className="label cursor-pointer">
					<span className="label-text">{tag}</span>
					<input
						type="checkbox"
						value={tag}
						{...register("tags")}
						className="checkbox checkbox-primary"
					/>
				</label>
			))}
		</div>
	);
};

export default CustomTags;
