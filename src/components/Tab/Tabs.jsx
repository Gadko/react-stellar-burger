import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'



function Tabs() {
  const [current, setCurrent] = React.useState('one')
  return (
    <div style={{ display: 'flex' }}>
      <Tab value="one" active={current === 'one'} onClick={() => setCurrent('one')}>
      Булки 
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={() => setCurrent('two')}>
      Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={() => setCurrent('three')}>
      Начинки
      </Tab>
    </div>
  )
  }
  
  export default Tabs;