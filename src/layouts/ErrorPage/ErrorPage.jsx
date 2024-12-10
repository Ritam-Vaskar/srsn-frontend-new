import { useNavigate } from "react-router-dom";
import notfound from '../../assets/404Error.png';
import styles from './ErrorPage.module.scss'

function NotFound() {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <img
                className={styles.img}
                src={notfound}
            />
            <div className={styles.text}>
                The webpage you are looking for is currently under maintainence. Please try again later. If the problem continues, mail us at <a href="mailto:sriramakrishnasikshaniketan@gmail.com">sriramakrishnasikshaniketan@gmail.com</a>
            </div>
            <button onClick={() => navigate(-1)} className={styles.button}>Go Back</button>
        </div>
    )
}
export default NotFound;