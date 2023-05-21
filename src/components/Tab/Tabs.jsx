import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'



function Tabs() {
  const [current, setCurrent] = React.useState('Bun')
  return (
    <div style={{ display: 'flex' }}>
      <Tab value="Bun" active={current === 'Bun'} onClick={() => setCurrent('Bun')}>
      Булки 
      </Tab>
      <Tab value="Sous" active={current === 'Sous'} onClick={() => setCurrent('Sous')}>
      Соусы
      </Tab>
      <Tab value="Main" active={current === 'Main'} onClick={() => setCurrent('Main')}>
      Начинки
      </Tab>
    </div>
  )
  }
  
  export default Tabs;