import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer';

const customers = [
  {
    'id':1,
    'image': 'https://placeimg.com/64/64/1',
    'name':'홍길이',
    'birthday':'961222',
    'gender':'남자',
    'job':'대학생',
  },
  {
    'id':2,
    'image': 'https://placeimg.com/64/64/2',
    'name':'숫돌이',
    'birthday':'200101',
    'gender':'남자',
    'job':'고딩',
  },
  {
    'id':3,
    'image': 'https://placeimg.com/64/64/3',
    'name':'나대주',
    'birthday':'900423',
    'gender':'여자',
    'job':'직장인',
  },
]
class App extends Component
{
  render() {
    return (
      <div>
        {
          customers.map(c =>{
            return (
              <Customer 
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              />
            )
          })
        }
      </div>
    )
  };
}

export default App;
