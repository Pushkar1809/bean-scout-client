import bsIcon from '../assets/bs-icon.svg';

const Loader = () => {
  return <main className='w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
    <img src={bsIcon} alt="Icon" className='w-[4rem] aspect-auto animate-pulse'/>
    Brewing...
  </main>
}

export default Loader;