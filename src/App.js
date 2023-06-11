import './App.css';
import styles from './app.module.css';
import { useState } from 'react';

export const App = () => {
	const buttonsNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

	const [inputValue, setInputValue] = useState('0');
	const [showOrangeText, setShowOrangeText] = useState(false);

	const handleNumberButtonClick = (button) => {
		if (inputValue === '0') {
			setInputValue(String(button));
		} else {
			setInputValue((prevValue) => prevValue + button);
		}
		setShowOrangeText(false);
	};

	const handleClearButtonClick = () => {
		setInputValue('0');
		setShowOrangeText(false);
	};

	const handleResultButtonClick = () => {
		const [a, sign, b] = inputValue.split(/(\+|\-)/);
		let result;
		switch (sign) {
		  case '+':
			result = parseFloat(a) + parseFloat(b);
			setInputValue(result);
			break;
		  case '-':
			result = parseFloat(a) - parseFloat(b);
			setInputValue(result);
			break;
		  default:
			return;
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
					<button key={button} onClick={() => handleNumberButtonClick(button)} className='btn'>
						{button}
					</button>
				))}

				<button className="minus bgOrange btn" onClick={() => handleNumberButtonClick('-')}>
					-
				</button>

				<button className="plus bgOrange btn" onClick={() => handleNumberButtonClick('+')}>
					{' '}
					+{' '}
				</button>
				<button className="equal bgOrange btn" onClick={handleResultButtonClick}>
					{' '}
					={' '}
				</button>
				<button className="ac bgOrange btn" onClick={handleClearButtonClick}>
					{' '}
					С{' '}
				</button>
			</div>
		</div>
	);
};
