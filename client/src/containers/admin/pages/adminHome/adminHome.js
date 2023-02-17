import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SearchBar from '../../../../components/search/searchBar'
import MySidebar from '../../components/sidebar/sidebar'
import Widget from '../../components/widget/widget'
import './adminHome.css'

const AdminHome = () => {

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false)
  const [query,setQuery]=useState("")

  const fetchProductsData = () => {
    setLoading(true)
    axios.get(`${process.env.REACT_APP_API_URL}/products?q=${query}`)
      .then((response) => {
        // console.log(response)
        setProductList(response.data.productList);
      });
    setLoading(false)
  }

  useEffect(() => {
    fetchProductsData()
  }, [query])


  return (
    <>
      <div className='home' style={{ display: "flex" }}>
        <div style={{ width: "25%" }}>
          <MySidebar />
        </div>
        <div style={{ width: "75%", marginTop: "30px", display: "flex", gap: "32px", flexWrap: "wrap" }}>
        <SearchBar onChange={(e) => setQuery(e.target.value)} />

          {productList.map((item, id) => {
            return (<Widget id={id} item={item} fetchProductsData={fetchProductsData} />)
          })}
        </div>
      </div>
    </>
  )
}

export default AdminHome