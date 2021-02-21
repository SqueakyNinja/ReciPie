import React from 'react'
import Image from "./thumbsUp.png"
import styles from "./index.module.scss";

const FormSuccess = () => {
    return (
        <div className={styles.signupRight}>
          <div className={styles.formSuccess}>
        <h1>We have received your request!</h1>
        <img className={styles.formImg2} src={Image} alt='success-image' />
        </div>
      </div>
    )
}

export default FormSuccess
