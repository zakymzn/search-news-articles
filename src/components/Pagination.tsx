import { type PaginationProps } from "../data/interfaces";

function Pagination({
  itemsPerPage,
  totalItems,
  setCurrentPage,
  currentPage,
}: PaginationProps) {
  const pageNumbers = []

  for (let index = 0; index < Math.ceil(totalItems / itemsPerPage); index++) {
    pageNumbers.push(index)

    if (index == 100) {
      break
    }
  }

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div>
      <ul className="flex flex-wrap space-x-4 items-center">
        <button onClick={() => {
          setCurrentPage(0)
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }} className={`${currentPage > 0 ? 'inline-block' : 'hidden'} hover:cursor-pointer`}>
          First
        </button>
        <button onClick={() => {
          setCurrentPage(currentPage - 1)
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }} className={`${currentPage > 0 ? 'inline-block' : 'hidden'} hover:cursor-pointer`}>
          {'< Prev'}
        </button>
        {
          pageNumbers.map((number) => (
            <li key={number} className={`${currentPage === number ? 'font-bold' : ''} ${number < (currentPage - 3) || number > (currentPage + 3) ? 'hidden' : ''} list-none`}>
              <button onClick={() => {
                paginate(number)
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                })
              }} className="hover:cursor-pointer">{number + 1}</button>
            </li>
          ))
        }
        <button onClick={() => {
          setCurrentPage(currentPage + 1)
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }} className={`${currentPage < pageNumbers.length - 1 ? 'inline-block' : 'hidden'} hover:cursor-pointer`}>
          {'Next >'}
        </button>
        <button onClick={() => {
          setCurrentPage(pageNumbers.length - 1)
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }} className={`${currentPage < pageNumbers.length - 1 ? 'inline-block' : 'hidden'} hover:cursor-pointer`}>
          Last
        </button>
      </ul>
    </div>
  )
}

export default Pagination