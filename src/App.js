import React,{ useState,useEffect } from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {
  const [images,setImages]=useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [term,setTerm] = useState('');
  
  useEffect(()=>{
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
    .then(res=>res.json())
    .then(data=>{
      setImages(data.hits);
      setIsLoading(false);
    })
    .catch(err=>console.log(err))
  },[term]);

  return (
    <div className="container mx-auto py-10">
      <ImageSearch searchText={(text)=>setTerm(text)}/>
      
      {!isLoading && images.length===0 && <h2 className="text-5xl text-center mx-auto mt-32"> Sorry, no images found </h2>}
      
      {isLoading? <h2 className="text-5xl text-center mx-auto mt-32"> Breathe in... Breathe out...</h2> : <div className="grid grid-cols-4 gap-4">
        {images.map(image=>(
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    }
    </div>
  );
}

export default App;
