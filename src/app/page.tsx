'use client'

import { useState  } from "react";
import { useRouter } from 'next/navigation'

export default function Home() {

  const [pics, setPics] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const router = useRouter()

  function performSearch(){
    console.log(`searching for '${searchText}'`)

    if(encodeURIComponent(searchText).length > 100) {
      console.error('Search query exceeds 100 characters')
      return
    }

    let url = new URL(process.env.NEXT_PUBLIC_PIXASBAY_API_URL as string)
    url.searchParams.append('key', process.env.NEXT_PUBLIC_PIXASBAY_API_KEY as string)
    url.searchParams.append('q', searchText)

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setPics(data.hits)
      })
      .catch(r => {
        console.error('Error occured:' + r)
      })
  }

  function updateSearchText(e: React.ChangeEvent<HTMLInputElement>){
    setSearchText(e.target.value)
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>){
    performSearch()
    return false
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <form className="w-full max-w-md mb-6" onSubmit={onSubmit}>
        <div className="flex items-center border-b border-teal-500 py-2">
          <input value={searchText} onChange={updateSearchText} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="What are you looking for?" aria-label="Full name"/>
          <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button" onClick={performSearch}>
            Search
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pics.map(function(pic, i){
            return <div>
              <img
                  className="hover:border-2 hover:border-teal-500"
                  src={pic.webformatURL}
                  alt={pic.tags}
                  width={pic.webformatWidth}
                  height={pic.webformatHeight}
                  onClick={() => router.push('/image/' + pic.id)}
              />
            </div>
          })}
      </div>
    </main>
  );
}
