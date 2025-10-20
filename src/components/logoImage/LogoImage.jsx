import styles from './LogoImage.module.css'
const LogoImage = () => {
  return (
    <div className={`${styles.image}`}>
        <img src="./LogoRegister.png" alt="logo" className='object-cover h-[100%] w-[100%]' />
      </div>
  )}
export default LogoImage
