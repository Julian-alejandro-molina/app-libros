import '@/estilos/Cardbook.css'
import { useContext } from 'react';
import { dataContext } from '@/context/DataContext';






export default function Cardbook({ author, cover, genre, title, synopsis, 
                                 id, otherBooks, pages, year, read,userbook,ReceiveMessage }) {
    const {infoData, setInfoData, verData, } = useContext(dataContext);
    
    
    const test = () => {
        setInfoData({title,  synopsis, cover, author,id, read})
        let v=true
        ReceiveMessage(v);
        console.log('info:id',pages);
    }



   
    // const [datas, setDatas] = useState(data);
    
    return (
        <>
            <div className="contenedor-Card">
                
                {/* <div className='container-img'><img className='image' src={cover} alt="" onClick={() => {
                    data.author = author
                    data.synopsis = synopsis
                    data.cover = cover
                    data.title = title
                    
                    // setDatas(data)
                    console.log(datas);
                    

                }} /></div> */}

                <div className='container-img'><img className='image' src={cover} alt="" onClick={test} /></div>
                
                <div className='container-references'>
                    
                    <section className='container-title-end-gender'>

                         <h1 className='title'>{title}</h1>
                        <p className='gender'>{genre}</p> 
                    </section>
                    <p className='year'>{year}</p>
                    

                </div>

            </div>
        </>
    );
}
