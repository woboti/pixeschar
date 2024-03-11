'use client'
import { useEffect, useState  } from "react";
import Image from "next/image"

export default function ImagePage({ params }: { params: { id: string } }) {

  const [pics, setPics] = useState<any[]>([]);

  function fetchImage(){
    console.log(`fetching image id: ${params.id}`)

    let url = new URL(process.env.NEXT_PUBLIC_PIXASBAY_API_URL as string)
    url.searchParams.append('key', process.env.NEXT_PUBLIC_PIXASBAY_API_KEY as string)
    url.searchParams.append('id', params.id)

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

  useEffect(function(){
    fetchImage()
  }, [params.id])

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
    {pics.length > 0
      ? 
        <>
          <div>
            <figure>
              <img
                  className=""
                  src={pics[0].largeImageURL}
                  alt={pics[0].tags}
                  width={pics[0].imageWidth}
                  height={pics[0].imageHeight}
              />
              <figcaption className="text-center">Photo taken by <em>{pics[0].user}</em><a href={pics[0].pageURL}> (Link to photo)</a></figcaption>
            </figure>
          </div>
          <div className="flex justify-between w-full mt-2">
            <div>
              <p>{pics[0].tags}</p>
              <p>{pics[0].comments.toLocaleString()} Comments</p>
            </div>
            <div>
              <p>{pics[0].likes.toLocaleString()} Likes</p>
              <p>{pics[0].views.toLocaleString()} Views</p>
              <p>{pics[0].downloads.toLocaleString()} Downloads</p>
            </div>
          </div>
        </>
      : ''}
    </main>
  );
}
