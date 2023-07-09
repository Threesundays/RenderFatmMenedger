import { useState, useEffect} from 'react';
import styles from './app.module.css';

export const App = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((json) => {
				setTodos(json);
			});
	}, []);

	return (
		<div className={styles.app}>
			{todos.map(({ userId, id, title, completed }) => (
				<div key={id}>
					{userId} - {title} - {completed.toString()}
				</div>
			))}
		</div>
	);
};
