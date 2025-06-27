import Table from "./Table";

const ProductsData = [
  {id: 1 ,title: 'meow', value: 'memeem'}
]


const Products = () => {
  return (
    <main className="bg-black">
      <section>
        <Table data={ProductsData}/>
      </section>
    </main>
  )
}

export default Products;