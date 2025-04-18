import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './SignatureForm.module.css';

function SignatureForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    watch
  } = useForm({
    defaultValues: {
      name: '',
      title: '',
      phone: '',
      email: '',
      linkedin: '',
      showLinkedin: 'yes',
      showPhoto: true,
      showFacebook: true,
      showTwitter: true,
      showCompanyLinkedin: true
    }
  });

  // do obserwacji czy LinkedIn ma być pokazany
  const showLinkedin = watch('showLinkedin');

  return (
    <form className={styles['signature-form']} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles['signature-form__title']}>Email Signature Form</h2>

      <div className={styles['signature-form__group']}>
        <label className={styles['signature-form__label']}>Full name:</label>
        <input className={styles['signature-form__input']} {...register('name')} />
      </div>

      <div className={styles['signature-form__group']}>
        <label className={styles['signature-form__label']}>Job title:</label>
        <input className={styles['signature-form__input']} {...register('title')} />
      </div>

      <div className={styles['signature-form__group']}>
        <label className={styles['signature-form__label']}>Phone number:</label>
        <input className={styles['signature-form__input']} {...register('phone')} />
      </div>

      <div className={styles['signature-form__group']}>
        <label className={styles['signature-form__label']}>Email address:</label>
        <input className={styles['signature-form__input']} type="email" {...register('email')} />
      </div>

      <div className={styles['signature-form__group']}>
        <label className={styles['signature-form__label']}>LinkedIn profile:</label>
        <div className={styles['signature-form__radio-group']}>
          <label className={styles['signature-form__radio-label']}>
            <input type="radio" value="yes" {...register('showLinkedin')} />
            Show
          </label>
          <label className={styles['signature-form__radio-label']}>
            <input type="radio" value="no" {...register('showLinkedin')} />
            Hide
          </label>
        </div>

        {showLinkedin === 'yes' && (
          <input
            className={styles['signature-form__input']}
            placeholder="linkedin.com/in/..."
            {...register('linkedin')}
          />
        )}
      </div>

      <div className={styles['signature-form__group']}>
        <label className={styles['signature-form__checkbox']}>
          <input type="checkbox" {...register('showPhoto')} />
          Show profile photo
        </label>
        <label className={styles['signature-form__checkbox']}>
          <input type="checkbox" {...register('showFacebook')} />
          Facebook icon
        </label>
        <label className={styles['signature-form__checkbox']}>
          <input type="checkbox" {...register('showTwitter')} />
          Twitter icon
        </label>
        <label className={styles['signature-form__checkbox']}>
          <input type="checkbox" {...register('showCompanyLinkedin')} />
          Company LinkedIn icon
        </label>
      </div>

      <button className={styles['signature-form__button']} type="submit">
        Generate Signature
      </button>
    </form>
  );
}

export default SignatureForm;
