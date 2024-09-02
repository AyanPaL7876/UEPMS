export default function ModeratorSection(){ 
  return(
  <div className="flex gap-5">
      <button
      type="button"
      className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
      >
      create Question Paper
      </button>

      <button
      type="button"
      className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
      >
      select Question Paper
      </button>
  </div>
  )
}