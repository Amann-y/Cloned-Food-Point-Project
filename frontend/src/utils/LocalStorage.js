import { useSelector, useDispatch } from 'react-redux'

export const storeFoodItems = ()=>{
    const data = useSelector(state => state.cart.cart)
    // console.log(data)
    // let initialArray = JSON.parse(localStorage.getItem("myCart"))
    // initialArray.push(items)
    // localStorage.setItem("myCart", JSON.stringify(initialArray))
    return null
}




