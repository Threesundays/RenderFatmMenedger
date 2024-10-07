import React, { useState, useEffect } from 'react';
import { db, ref, onValue, set } from './firebase';
import pcOpenImage from './pc_open.png'; // Изображение для статуса "Свободна"
import pcCloseImage from './pc_close.png'; // Изображение для статуса "Занята"

const FarmList = () => {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    const farmsRef = ref(db, 'farms'); // Ссылка на узел "farms" в Realtime Database

    // Подписка на данные в реальном времени
    onValue(farmsRef, (snapshot) => {
      const data = snapshot.val(); // Получение данных из базы
      if (data) {
        const farmsList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setFarms(farmsList); // Обновляем состояние ферм
      }
    });
  }, []);

  // Функция для переключения статуса фермы
  const toggleFarmStatus = (farm) => {
    const farmRef = ref(db, `farms/${farm.id}`); // Ссылка на конкретную ферму в Realtime Database
    set(farmRef, {
      ...farm,
      active: !farm.active // Переключение статуса
    });
  };

  return (
    <div style={{ margin: '0 auto', width: 'calc(100% - 1300px)' }}> {/* Центрируем контейнер */}
     <h1 style={{ textAlign: 'center', fontSize: '2em', fontWeight: 'bold' }}>FARM STATUS</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {farms.map(farm => (
          <li key={farm.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <img 
              src={farm.active ? pcCloseImage : pcOpenImage} // Условие для выбора изображения
              alt="computer icon" 
              style={{ marginRight: '10px', width: '150px' }}  // Увеличиваем размер изображения до 100px
            />
            <span style={{ flexGrow: 1, textAlign: 'left' }}>{farm.name}</span>
            <label style={{ marginLeft: 'auto' }}>
              <input
                type="checkbox"
                checked={farm.active}
                onChange={() => toggleFarmStatus(farm)}
              />
              {farm.active ? 'Занята' : 'Свободна'}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FarmList;
