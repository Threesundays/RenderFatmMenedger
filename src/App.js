import './App.css';
import { createElement } from 'react';
import styles from './app.module.css';
import { useState } from 'react';

export const App = () => {
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

	const [inputValue, setInputValue] = useState('0');
	const [showOrangeText, setShowOrangeText] = useState(false);

	const numberClick = (buttonId) => {
		if (inputValue === '0') {
			setInputValue(String(buttonId));
		} else {
			setInputValue((prevValue) => prevValue + buttonId);
		}
		setShowOrangeText(false);
	};

	const clearClick = () => {
		setInputValue('0');
		setShowOrangeText(false);
	};

	const resultClick = () => {
		const regex = /(\d+)([+-])(\d+)/;
		const match = inputValue.match(regex);
		if (match) {
			const a = parseFloat(match[1]);
			const sign = match[2];
			const b = parseFloat(match[3]);
			let result;
			switch (sign) {
				case '+':
					result = a + b;
					setInputValue(result);
					break;
				case '-':
					result = a - b;
					setInputValue(result);
					break;
				default:
					return;
			}
		}
		setShowOrangeText(true);
	};

	return (
		<div className="app">
			<div className="screen">
				<p className={showOrangeText ? styles.orange : styles.white}>{inputValue}</p>
			</div>
			<div className="buttons">
				{buttonsNumbers.map((button) => (
					<button key={button.id} onClick={() => numberClick(button.id)} className={`btn ${button.label}`}>
						{button.id}
					</button>
				))}

				<button className="minus bgOrange btn" onClick={() => numberClick('-')}>
					-
				</button>

				<button className="plus bgOrange btn" onClick={() => numberClick('+')}>
					{' '}
					+{' '}
				</button>
				<button className="equal bgOrange btn" onClick={resultClick}>
					{' '}
					={' '}
				</button>
				<button className="ac bgOrange btn" onClick={clearClick}>
					{' '}
					С{' '}
				</button>
			</div>
		</div>
	);
};
