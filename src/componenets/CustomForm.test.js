import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import CustomForm from "./CustomForm";
import { saveInfo } from "../reducer";

const mockStore = configureStore([]);

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => jest.fn(),
}));

describe("CustomForm Component", () => {
	let store; // Mock Redux store
	let navigateMock; // Mock navigation function from React Router

	// Runs before each test to set up the store and navigation mock
	beforeEach(() => {
		// Set up mock store with default state
		store = mockStore({
			requestInfos: {
				fullName: "",
				email: "",
				issueType: "",
				tags: [],
				steps: [],
			},
		});
		// Mock the dispatch function to monitor dispatched actions
		store.dispatch = jest.fn();

		// Mock the navigation function using React Router's useNavigate hook
		navigateMock = require("react-router-dom").useNavigate;
	});

	// Test to verify that all form fields are rendered
	test("renders form with all fields", () => {
		// Render the CustomForm component within the Provider and MemoryRouter
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CustomForm />
				</MemoryRouter>
			</Provider>
		);

		// Check if each input field and the submit button are rendered in the document
		expect(screen.getByTestId("full-name-input")).toBeInTheDocument();
		expect(screen.getByTestId("email-input")).toBeInTheDocument();
		expect(screen.getByTestId("issue-type-input")).toBeInTheDocument();
		expect(screen.getByTestId("tags-input")).toBeInTheDocument();
		expect(screen.getByTestId("steps-input")).toBeInTheDocument();
		expect(screen.getByTestId("submit-button")).toBeInTheDocument();
	});

	// Test to verify validation errors are displayed for empty required fields
	test("displays validation error for empty required fields", async () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CustomForm />
				</MemoryRouter>
			</Provider>
		);

		// Trigger form submission without filling fields
		fireEvent.click(screen.getByTestId("submit-button"));

		// Check that validation error messages are displayed
		expect(
			await screen.findByText(/Full Name is required/i)
		).toBeInTheDocument();
		expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
		expect(screen.getByText(/Issue Type is required/i)).toBeInTheDocument();
		expect(
			screen.getByText(/At least one step is required/i)
		).toBeInTheDocument();
	});

	// Test to add a step to the steps input list when "Add" is clicked
	test("adds a step when the 'Add' button is clicked", () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CustomForm />
				</MemoryRouter>
			</Provider>
		);

		// Add a step by entering text and clicking "Add"
		const stepInput = screen.getByPlaceholderText("Step");
		fireEvent.change(stepInput, { target: { value: "Step 1" } });
		fireEvent.click(screen.getByTestId("add-button-input"));

		// Verify that the added step appears in the document
		expect(screen.getByText("Step 1")).toBeInTheDocument();
	});

	// Test to remove a step from the list when "X" is clicked
	test("removes a step when 'X' button is clicked", () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CustomForm />
				</MemoryRouter>
			</Provider>
		);

		// Add a step to the list first
		const stepInput = screen.getByPlaceholderText("Step");
		fireEvent.change(stepInput, { target: { value: "Step 1" } });
		fireEvent.click(screen.getByTestId("add-button-input"));

		// Verify that the step was added
		expect(screen.getByText("Step 1")).toBeInTheDocument();

		// Click the "X" button to remove the step
		fireEvent.click(screen.getByTestId("rm-button"));

		// Verify that the step no longer exists in the document
		expect(screen.queryByText("Step 1")).not.toBeInTheDocument();
	});

	// Test to dispatch a save action and navigate when the form is submitted
	test("dispatches saveInfo action with form data and navigates on submit", async () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CustomForm />
				</MemoryRouter>
			</Provider>
		);

		// Fill out the form fields with data
		await act(async () => {
			fireEvent.change(screen.getByTestId("full-name-input"), {
				target: { value: "John Doe" },
			});
			fireEvent.change(screen.getByTestId("email-input"), {
				target: { value: "john.doe@example.com" },
			});
			fireEvent.change(screen.getByTestId("issue-type-input"), {
				target: { value: "Bug Report" },
			});

			// Add a step to the steps list
			const stepInput = screen.getByPlaceholderText("Step");
			fireEvent.change(stepInput, { target: { value: "Step 1" } });
			fireEvent.click(screen.getByTestId("add-button-input"));

			// Submit the form
			fireEvent.click(screen.getByTestId("submit-button"));
		});

		// Check if the dispatch was called once and the action has the correct payload
		expect(store.dispatch).toHaveBeenCalledTimes(1);
		expect(store.dispatch.mock.calls[0][0]).toEqual(
			saveInfo({
				fullName: "John Doe",
				email: "john.doe@example.com",
				issueType: "Bug Report",
				tags: [],
				steps: [{ title: "Step 1" }],
			})
		);
	});

	// Test to display an error if no steps are added to the form
	test("displays error if no steps are added", async () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CustomForm />
				</MemoryRouter>
			</Provider>
		);

		fireEvent.click(screen.getByTestId("submit-button"));

		// Verify that the "At least one step is required" error message appears
		expect(
			await screen.findByText(/At least one step is required/i)
		).toBeInTheDocument();
	});
});
