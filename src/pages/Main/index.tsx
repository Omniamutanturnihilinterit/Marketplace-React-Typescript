import React, { useEffect, useState } from 'react' 
import { IProduct } from '../../interfaces/Product';
import { ProductService } from '../../services/product.service';
import { CardProduct } from '../../components/CardProduct';
import { CategoryService } from '../../services/category.service';
import { Navbar } from '../../components/Navbar';


export default function App() {

  const [ products, setProducts ] = useState<IProduct[]>([]);
  const [ categories, setCategories ] = useState<[]>([]);
  const [ category, setCategory] = useState<string>("");

  const productService = new ProductService();
  const categoryService = new CategoryService();

  useEffect(()=>{
    loadDataProduct()
    loadDataCategories()
  },[]);

  const loadDataProduct = async () => {
    const data:IProduct[] = await productService.getAll();
    setProducts(data)
  }

  const loadDataCategories = async () => {
    const data:[] = await categoryService.getAll();
    setCategories(data)
  }

  const filterProduct = () => {

    if(category){

      console.log("Filter data")

      const res = products.filter(function(item:IProduct){
          const itemData = item.category.toUpperCase()+" "+item.title.toUpperCase()
          const textData = category.toUpperCase()
          return itemData.indexOf(textData) > -1
      });

      return res; 
    }

    return products;

  }

  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="container px-6 py-10 mx-auto"> 


        <Navbar categories={categories} onClickItem={(item:string)=> setCategory(item)}/>

        <hr className="my-8 border-gray-200 dark:border-gray-700" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
             
             {
              filterProduct().map((item)=> {
                return(
                  <CardProduct item={item}/>
                )
              })
             }  
             
        </div>
    </div>
</section>
  )
}
