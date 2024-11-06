import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputCustom from './components/Input';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDollarSign, faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faDollarSign);


function App() {
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [both, setBoth] = useState([])

  const getUser = async () => {
    let result = await fetch(`http://localhost:3000/user/1`,{
          method: "POST",
          body: JSON.stringify(),
          headers: {
              "Content-Type":"application/json"
          }
      });
      let data = await result.json();
      setUsers(data.data.map((element, index) => {return {...element, icon: "fa-user",label: element.firstName + " " + element.lastName, type: "user", id: index}}));
  }

  const getProducts = async () => {
    let result = await fetch(`http://localhost:3000/product/1`,{
          method: "POST",
          body: JSON.stringify(),
          headers: {
              "Content-Type":"application/json"
          }
      });
      let data = await result.json();
      console.log(data)
      setProducts(data.data.map((element, index) => {return {...element, icon: "fa-dollar-sign",label: element.name + ", " + element.price + " euros", type: "product", id: index, price: element.price}}));
  }

  const getBoth = async () => {
    let resultUser = await fetch(`http://localhost:3000/user/1`,{
          method: "POST",
          body: JSON.stringify(),
          headers: {
              "Content-Type":"application/json"
          }
      });
      let dataUser = await resultUser.json();
      dataUser = dataUser.data.map((element, index) => {return {...element, icon: "fa-user",label: element.firstName + " " + element.lastName, type: "user", id: "user"+index}});
      let resultProducts = await fetch(`http://localhost:3000/product/1`,{
          method: "POST",
          body: JSON.stringify(),
          headers: {
              "Content-Type":"application/json"
          }
      });
      let dataProducts = await resultProducts.json();
      dataProducts = dataProducts.data.map((element, index) => {return {...element, icon: "fa-dollar-sign",label: element.name + ", " + element.price + " euros", type: "product", id: "product"+index}})
      const bothDatas = [...dataUser, ...dataProducts].sort((a, b) => {
        if (a.label < b.label) {
          return -1;
        }
        if (a.label > b.label) {
          return 1; 
        }
        return 0; 
      });
      setBoth(bothDatas)
  }

  useEffect(() => {
    getUser()
    getProducts()
    getBoth()
  }, [])

  return (
    <div className='container'>
      <div>
        <p>1. Autocomplete user simple avec data en props</p>
        <InputCustom data={[{id: 1, label: "Antoine", type: "user", icon: "fa-user"},{id: 2, label: "Arthur", type: "user", icon: "fa-user"}, {id: 3, label: "Thomas", type: "user", icon: "fa-user"}]}/>
      </div>
      <div>
        <p>2. Autocomplete User simple avec data en fonction</p>
        <InputCustom data={users}/>
      </div>
      <div>
        <p>3. Autocomplete User multiple avec data en fonction</p>
        <InputCustom data={users} multiple={true}/>
      </div>
      <div>
        <p>4. Autocomplete Product simple avec data en fonction</p>
        <InputCustom data={products}/>
      </div>
      <div>
        <p>5. Autocomplete Product multiple avec data en fonction</p>
        <InputCustom data={products} multiple={true}/>
      </div>
      <div>
        <p>6. Autocomplete Mix multiple avec data en fonction</p>
        <InputCustom data={both} multiple={true}/>
      </div>
      <div>
        <p>7. Autocomplete Product multiple avec template et data en fonction</p>
        <InputCustom data={products} multiple={true} template={'./ItemTemplate.jsx'}/>
      </div>
      <div>
        <p>8. Autocomplete Product simple avec suggestion au lieu d'une liste</p>
        <InputCustom data={products} placeholder={true}/>
      </div>
    </div>
  )
}

export default App
