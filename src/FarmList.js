import React, { useState, useEffect } from 'react';
import { ref, set, onValue } from 'firebase/database';
import { db } from './firebase';
import LoginForm from './LoginForm';
import pcOpenImage from './pc_open.png';
import pcCloseImage from './pc_close.png';

const FarmList = () => {
	const [user, setUser] = useState(null);
	const [farms, setFarms] = useState([]);
	const [timers, setTimers] = useState({});

	useEffect(() => {
		const savedUser = localStorage.getItem('user');
		if (savedUser) {
			const parsedUser = JSON.parse(savedUser);
			setUser(parsedUser);
		}
	}, []);

	useEffect(() => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user));
		} else {
			localStorage.removeItem('user');
		}
	}, [user]);

	useEffect(() => {
		const farmsRef = ref(db, 'farms');
		onValue(farmsRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				const farmsList = Object.keys(data).map((key) => ({
					id: key,
					...data[key],
				}));
				setFarms(farmsList);

				const initialTimers = {};
				farmsList.forEach((farm) => {
					if (farm.active) {
						initialTimers[farm.id] = { active: true, startTime: Date.now() - farm.elapsed * 1000 };
					}
				});
				setTimers(initialTimers);
			}
		});
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimers((prevTimers) => {
				const updatedTimers = { ...prevTimers };

				farms.forEach((farm) => {
					if (farm.active && updatedTimers[farm.id]?.active) {
						const elapsed = Math.floor((Date.now() - updatedTimers[farm.id].startTime) / 60000);
						updatedTimers[farm.id].elapsed = elapsed * 60;

						const farmRef = ref(db, `farms/${farm.id}`);
						set(farmRef, {
							...farm,
							elapsed: elapsed * 60,
						});
					}
				});

				return updatedTimers;
			});
		}, 60000);

		return () => clearInterval(interval);
	}, [farms]);

	const toggleFarmStatus = (farm) => {
		const farmRef = ref(db, `farms/${farm.id}`);
		const isActivating = !farm.active;

		const occupiedBy = isActivating ? user?.username ?? null : null;
		const fullname = isActivating ? user?.fullname ?? null : null;
		const elapsed = isActivating ? 0 : null;
		const startTime = isActivating ? Date.now() : null;

		set(farmRef, {
			...farm,
			active: isActivating,
			occupiedBy,
			fullname,
			elapsed,
		});

		setTimers((prevTimers) => ({
			...prevTimers,
			[farm.id]: isActivating ? { active: true, startTime } : { active: false, startTime: null },
		}));
	};

	const formatTime = (seconds) => {
		const hrs = Math.floor(seconds / 3600);
		const mins = Math.floor((seconds % 3600) / 60);
		return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
	};

	const handleLogout = () => {
		setUser(null);
		localStorage.removeItem('user');
	};

	return (
		<div style={styles.container}>
			{!user ? (
				<LoginForm setUser={setUser} />
			) : (
				<>
					<div style={styles.userInfo}>
						<span style={styles.username}>{user.fullname}</span>
						<button onClick={handleLogout} style={styles.logoutButton}>
							Выйти
						</button>
					</div>
					<h1 style={styles.heading}>Farm Status</h1>
					<ul style={styles.list}>
						{farms.map((farm) => (
							<li key={farm.id} style={styles.listItem}>
								<img
									src={farm.active ? pcCloseImage : pcOpenImage}
									alt="computer icon"
									style={styles.image}
								/>
								<span style={styles.farmInfo}>
									{farm.name}
									{farm.fullname && ` (Занята: ${farm.fullname})`}
									{farm.active &&
										timers[farm.id] &&
										` - Время занятости: ${formatTime(
											Math.floor((Date.now() - timers[farm.id]?.startTime) / 1000),
										)}`}
								</span>
								<label>
									<input
										type="checkbox"
										checked={farm.active}
										disabled={farm.active && farm.fullname && farm.fullname !== user.fullname}
										onChange={() => toggleFarmStatus(farm)}
										style={styles.checkbox}
									/>
									{farm.active ? 'Занята' : 'Свободна'}
								</label>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
};

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px',
		backgroundColor: '#f5f5f5',
		minHeight: '100vh',
	},
	userInfo: {
		position: 'absolute',
		top: '10px',
		right: '10px',
		display: 'flex',
		alignItems: 'center',
	},
	username: {
		marginRight: '15px',
		fontWeight: 'bold',
		color: '#333',
	},
	logoutButton: {
		padding: '5px 10px',
		border: 'none',
		backgroundColor: '#d9534f',
		color: '#fff',
		borderRadius: '4px',
		cursor: 'pointer',
	},
	heading: {
		marginBottom: '20px',
		fontSize: '2em',
		fontWeight: 'bold',
		color: '#333',
	},
	list: {
		width: '100%',
		maxWidth: '600px',
		listStyle: 'none',
		padding: '0',
		margin: '0',
	},
	listItem: {
		display: 'flex',
		alignItems: 'center',
		padding: '10px',
		marginBottom: '10px',
		backgroundColor: '#fff',
		borderRadius: '8px',
		boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
	},
	image: {
		marginRight: '10px',
		width: '60px',
	},
	farmInfo: {
		flexGrow: '1',
		textAlign: 'left',
		color: '#333',
	},
	checkbox: {
		marginLeft: 'auto',
	},
};

export default FarmList;
