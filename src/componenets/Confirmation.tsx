import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormData } from "./Type";
import { Link } from "react-router-dom";

const Confirmation = () => {
	const navigate = useNavigate();
	const {
		fullName,
		email,
		issueType,
		tags = [],
		steps,
	} = useSelector((state: { requestInfos: FormData }) => state.requestInfos);

	useEffect(() => {
		if (!fullName) {
			navigate("/");
		}
	}, []);

	return (
		<div className="hero bg-base-200 min-h-screen">
			<div className="lg:flex-row-reverse">
				<div className="card bg-base-100 max-w-lg shrink-0 shadow-2xl">
					<form className="card-body">
						<div className="form-control mt-6">
							<div className="text-center lg:text-left">
								<h1 className="text-5xl font-bold">Dear, {fullName}!</h1>
								<p className="py-6">
									Thank you for submitting your request. We will get back to you
									at <span className="text-primary">{email}</span>, in regards
									of you request:
								</p>
								<div className="flex w-full flex-col lg:flex-row">
									<div className="card rounded-box grid flex-grow">
										<ul className="steps steps-vertical">
											{steps.map((step, index) => (
												<li key={index} className="step step-primary">
													<span className="label cursor-pointer">
														<span className="label-text mr-5">
															{step.title}
														</span>
													</span>
												</li>
											))}
										</ul>
									</div>
									<div className="divider divider-horizontal divider-primary"></div>
									<div className="card rounded-box grid flex-grow">
										<div className="form-control">
											<label className="label">
												<span className="label-text font-bold">Issue Type</span>
											</label>
											<span className="text-primary">{issueType}</span>
										</div>
										<div className="form-control">
											<label className="label">
												<span className="label-text font-bold">Tags</span>
											</label>
											<span className="text-primary">
												<ul>
													{tags.map((tag, index) => (
														<li key={index}>{tag}</li>
													))}
												</ul>
											</span>
										</div>
									</div>
								</div>
							</div>
							<Link className="btn btn-primary mt-5" to="/">
								Back
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Confirmation;
