
import reactLogo from "../assets/react-logo.jpg";
import styles from './Img.module.css'; 


const Image= () => {
  return (
    <div className={styles.image}>
    <img src={reactLogo} alt="React logo" />
    </div>
  )
}

export default Image