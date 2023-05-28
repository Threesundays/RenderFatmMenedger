import './App.css';
import { createElement } from 'react';
import styles from './app.module.css';
import { useState } from 'react';

const buttonsNumbers = [
	{ id: 1, label: 'one' },
	{ id: 2, label: 'two' },
	{ id: 3, label: 'three' },
	{ id: 4, label: 'four' },
	{ id: 5, label: 'five' },
	{ id: 6, label: 'six' },
	{ id: 7, label: 'seven' },
	{ id: 8, label: 'eight' },
	{ id: 9, label: 'nine' },
	{ id: 0, label: 'zero' },
];

export const App = () => {
	const [inputValue, setInputValue] = useState('');

	const numberClick = (buttonId) => {
		setInputValue((prevValue) => prevValue + buttonId);
	};

	const clearClick = () => {
		setInputValue(' ');
	};

	const resultClick = () => {
		setInputValue(eval(inputValue));
	};

	return (
		<div className={styles.app}>
			<div className={styles.screen}>
				<p>{inputValue}</p>
			</div>
			<div className={styles.buttons}>
				{buttonsNumbers.map((button) => (
					<button
						key={button.id}
						onClick={() => numberClick(button.id)}
						className={`${styles.label} ${styles.btn}`}
					>
						{button.id}
					</button>
				))}

				<button className={`${styles.bgOrange} ${styles.btn} ${styles.minus}`} onClick={() => numberClick('-')}>
					-
				</button>

				<button className={`${styles.bgOrange} ${styles.btn} ${styles.plus}`} onClick={() => numberClick('+')}>
					{' '}
					+{' '}
				</button>
				<button className={`${styles.bgOrange} ${styles.btn} ${styles.equal}`} onClick={resultClick}>
					{' '}
					={' '}
				</button>
				<button className={`${styles.bgOrange} ${styles.btn} ${styles.ac}`} onClick={clearClick}>
					{' '}
					С{' '}
				</button>
			</div>
		</div>
	);
};
