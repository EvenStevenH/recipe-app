export default function ErrorMessage({ message }) {
	return (
		<div className="error">
			<h3>Error Message</h3>
			<p>{message}</p>
		</div>
	);
}
